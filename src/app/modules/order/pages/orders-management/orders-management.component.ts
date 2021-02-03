import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/modules/shared/models/order';
import { OrderService } from 'src/app/modules/shared/services/order/order.service';

@Component({
	selector: 'app-orders-management',
	templateUrl: './orders-management.component.html',
	styleUrls: ['./orders-management.component.scss']
})
export class OrdersManagementComponent implements OnInit {
	ordersPending: Order[];
	ordersToTakeAway: Order[];
	ordersDelivered: Order[];
	ordersRefunded: Order[];
	subscription: Subscription;

	constructor(private orderService: OrderService) { }

	ngOnInit(): void {
		this.getOrders();
	}

	getOrders(): void {
		this.subscription = this.orderService.getOrders().subscribe((data: { orders: Order[] }) => {
			this.ordersPending = data.orders.filter(order => order.invoice_number === '0').reverse();
			this.ordersToTakeAway = data.orders.filter(order => order.payment === 'Magasin').reverse();
			this.ordersDelivered = data.orders.filter(order => order.payment !== 'Magasin').reverse();
			this.ordersRefunded = data.orders.filter(order => order.current_state === '7').reverse();
		});
	}

	isOrdersLoading(): boolean {
		return this.subscription && !this.subscription.closed;
	}
}
