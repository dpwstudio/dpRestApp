import { Component, ElementRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { orderState, orderType } from 'src/app/modules/config/constant';
import { Order } from 'src/app/modules/shared/models/order';
import { CustomerService } from 'src/app/modules/shared/services/customer/customer.service';
import { OrderService } from 'src/app/modules/shared/services/order/order.service';
import { environment } from 'src/environments/environment';

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
	showAnimate = '';

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
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	@HostListener('window:resize')
	onResize(): void {
		this.innerWidth = window.innerWidth;
	}

	hasTabletScreen(): boolean {
		return this.innerWidth <= 800 && this.innerWidth >= 500;
	}

	hasMobileScreen(): boolean {
		return this.innerWidth <= 400;
	}

	refreshData(): void {
		this.subscription = this.interval.subscribe(() => {
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
				if (this.tmpTotalOrders < ordersList.length) {
					this.tmpTotalOrders = ordersList.length;
					this.orders = ordersList.reverse();
					this.showAlert = true;
				} else if (this.tmpTotalOrders > ordersList.length) {
					this.tmpTotalOrders = ordersList.length;
					this.orders = ordersList.reverse();
					this.showInfo = true;
					this.showAnimate = 'animate__animated animate__slideInRight';
				} else {
					this.orders = ordersList.reverse();
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
		this.orderService.getLastOrders().subscribe((data: { orders: Order[] }) => {
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
		this.subscription = forkJoin({
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
