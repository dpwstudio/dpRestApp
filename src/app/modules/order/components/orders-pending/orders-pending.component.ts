import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/modules/shared/models/order';
import { CustomerService } from 'src/app/modules/shared/services/customer/customer.service';
import { OrderService } from 'src/app/modules/shared/services/order/order.service';

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

	constructor(
		private orderService: OrderService,
		private customerService: CustomerService,
		private modalService: BsModalService
	) { }

	ngOnInit(): void {
		this.getLastOrders();
		this.refreshData();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		// this.dataSubscription.unsubscribe();
	}

	refreshData(): void {
		this.subscription = this.interval.subscribe(() => {
			this.orderService.getLastOrders().subscribe((data: { orders: Order[] }) => {
				const ordersList = data.orders.filter(order => order.invoice_number === '0');
				if (this.tmpTotalOrders < ordersList.length) {
					this.tmpTotalOrders = ordersList.length;
					this.orders = ordersList.reverse();
					this.showAlert = true;
				} else if (this.tmpTotalOrders > ordersList.length) {
					this.tmpTotalOrders = ordersList.length;
					this.orders = ordersList.reverse();
					this.showInfo = true;
				} else {
					this.showAlert = false;
					this.showInfo = false;
				}
			});
		});
	}

	getLastOrders(): void {
		this.orderService.getLastOrders().subscribe((data: { orders: Order[] }) => {
			const ordersList = data.orders.filter(order => order.invoice_number === '0');
			this.orders = ordersList.reverse();
			console.log('this.orders', this.orders);
			this.tmpTotalOrders = ordersList.length;
		});
	}

	getCustomer(template, id): void {
		console.log('id', id);
		this.dataSubscription = forkJoin({
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
		if (type === 'Magasin') {
			return 'A emporter';
		} else {
			return 'En livraison';
		}
	}
}
