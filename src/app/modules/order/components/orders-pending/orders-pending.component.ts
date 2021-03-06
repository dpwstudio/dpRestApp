import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, interval, Subscription } from 'rxjs';
import { orderState, orderType } from 'src/app/modules/config/constant';
import { Order } from 'src/app/modules/shared/models/order';
import { CustomerService } from 'src/app/modules/shared/services/customer/customer.service';
import { OrderService } from 'src/app/modules/shared/services/order/order.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
	selector: 'app-orders-pending',
	templateUrl: './orders-pending.component.html',
	styleUrls: ['./orders-pending.component.scss']
})
export class OrdersPendingComponent implements OnInit, OnDestroy {
	orders: Order[];
	private interval = interval(5000);
	subscription: Subscription;
	dataSubscription: Subscription;
	tmpTotalOrders: number;
	showAlert = false;
	showInfo = false;
	totalOrder = 0;
	customer: any;
	customerAddress: any;
	modalRef: BsModalRef;
	innerWidth: number;
	itemsPerSlide = 4;
	singleSlideOffset = true;
	siteUrl: string;
	audio: any;
	play = false;

	constructor(
		private orderService: OrderService,
		private customerService: CustomerService,
		private modalService: BsModalService
	) { }

	ngOnInit(): void {
		this.siteUrl = environment.siteUrl;
		this.getLastOrders();
		this.refreshData();
		this.onResize();
		// this.notifyMe('Les notifications sont activées.');
	}

	notifyMe(message): void {
		// Vérifions si le navigateur prend en charge les notifications
		if (!('Notification' in window)) {
			alert('Ce navigateur ne prend pas en charge la notification de bureau');
		}

		// Vérifions si les autorisations de notification ont déjà été accordées
		else if (Notification.permission === 'granted') {
			// Si tout va bien, créons une notification
			const notification = new Notification(message);
		}

		// Sinon, nous devons demander la permission à l'utilisateur
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then((permission) => {
				// Si l'utilisateur accepte, créons une notification
				if (permission === 'granted') {
					const notification = new Notification(message);
				}
			});
		}

		// Enfin, si l'utilisateur a refusé les notifications, et que vous
		// voulez être respectueux, il n'est plus nécessaire de les déranger.
	}

	ngOnDestroy(): void {
		this.dataSubscription.unsubscribe();
	}

	@HostListener('window:resize')
	onResize(): void {
		this.innerWidth = window.innerWidth;
	}

	togglePlayAudio(): void {
		this.play = !this.play;
		this.audio = new Audio();
		this.audio.src = 'assets/audio/message.mp3';
		if (this.play) {
			this.audio.play();
		} else {
			this.audio.pause();
		}
	}

	parseDate(date): any {
		return moment(date);
	}

	hasTabletScreen(): boolean {
		return this.innerWidth <= 800 && this.innerWidth >= 500;
	}

	hasMobileScreen(): boolean {
		return this.innerWidth <= 500;
	}

	refreshData(): void {
		this.interval.subscribe(() => {
			this.orderService.getLastOrders().subscribe((data: { orders: Order[] }) => {
				let ordersList;
				if (data && Object.keys(data).length > 0 && data.constructor === Object) {
					ordersList = data.orders.filter(order => order.current_state === orderState.EN_COURS
						|| order.current_state === orderState.EN_ATTENTE_DE_VIREMENT
						|| order.current_state === orderState.PAIEMENT_ACCEPTE
						|| order.current_state === orderState.PAIEMENT_AU_RESTAURANT);
				} else {
					ordersList = data;
				}
				// Compare les taille des array pour l'affichage des notifications et la réactualisation des données
				const array1 = JSON.stringify(ordersList).length;
				const array2 = JSON.stringify(this.orders)?.length;
				if (this.tmpTotalOrders < ordersList.length) {
					this.tmpTotalOrders = ordersList.length;
					this.orders = ordersList.reverse();
					// this.notifyMe('Une nouvelle commande vient d\'arriver.');
					this.showAlert = true;
					this.togglePlayAudio();
				} else if (this.tmpTotalOrders > ordersList.length) {
					this.tmpTotalOrders = ordersList.length;
					this.orders = ordersList.reverse();
					this.showInfo = true;
					// this.notifyMe('Les commandes viennent d\'être réactualisées.');
					this.togglePlayAudio();
				} else if (array1 > array2) {
					this.orders = ordersList.reverse();
					this.showInfo = true;
					// this.notifyMe('Les commandes viennent d\'être réactualisées.');
					this.togglePlayAudio();
				} else {
					this.showAlert = false;
					this.showInfo = false;
				}
			});
		});
	}

	isNewOrder(order): boolean {
		return order.current_state === orderState.PAIEMENT_ACCEPTE
			|| order.current_state === orderState.PAIEMENT_AU_RESTAURANT;
	}

	getLastOrders(): void {
		this.dataSubscription = this.orderService.getLastOrders().subscribe((data: { orders: Order[] }) => {
			let ordersList;
			if (data && Object.keys(data).length > 0 && data.constructor === Object) {
				ordersList = data.orders.filter(order => order.current_state === orderState.EN_COURS
					|| order.current_state === orderState.EN_ATTENTE_DE_VIREMENT
					|| order.current_state === orderState.PAIEMENT_ACCEPTE
					|| order.current_state === orderState.PAIEMENT_AU_RESTAURANT
				);
				this.orders = ordersList.reverse();
			} else {
				ordersList = data;
			}
			this.tmpTotalOrders = ordersList.length;
		});
	}

	getCustomer(template, id): void {
		forkJoin({
			client: this.customerService.getCustomer(id),
			clientAddress: this.customerService.getCustomerAddress(id)
		})
			.subscribe((res: { client: { customers: any[] }, clientAddress: { addresses: any[] } }) => {
				this.customer = res.client.customers;
				this.customerAddress = res.clientAddress.addresses.reverse();
				this.modalRef = this.modalService.show(template);
			});
	}

	isOrdersLoading(): boolean {
		return this.dataSubscription && !this.dataSubscription.closed;
	}

	orderType(type): string {
		if (type === orderType.MAGASIN) {
			return orderType.A_EMPORTER;
		} else {
			return orderType.EN_LIVRAISON;
		}
	}

	isInProgress(order): boolean {
		return order.current_state === orderState.EN_COURS;
	}
}
