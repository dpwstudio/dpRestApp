import { Component, OnDestroy, OnInit } from '@angular/core';
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
	tmpTotalOrders: number;
	showAlert = false;
	showInfo = false;
	totalOrder = 0;

	constructor(
		private orderService: OrderService,
		private customerService: CustomerService
	) { }

	ngOnInit(): void {
		this.getLastOrders();
		this.getOrders();
		this.refreshData();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
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
			this.tmpTotalOrders = ordersList.length;
		});
	}

	getOrders(): void {
		forkJoin({ v1: this.orderService.getLastOrders(), v2: this.customerService.getCustomer() })
			.pipe(
				map((data) => {
					console.log('data map', data);
				})
			)
			.subscribe(data => {
				console.log('data', data);
			});
	}

}
