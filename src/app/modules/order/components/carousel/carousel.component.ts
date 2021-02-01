import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderService } from 'src/app/modules/shared/services/order/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  orders: any;
  date: string;
  private interval = interval(5000);
  subscription: Subscription;
  tmpTotalOrders: number;
  showAlert = false;
  totalOrder = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data: { orders: string[] }) => {
      this.orders = data.orders.reverse();
      this.tmpTotalOrders = data.orders.length;
    });
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshData(): any {
    this.subscription = this.interval.subscribe(() => {
      this.orderService.getOrders().subscribe((data: { orders: string[] }) => {
        if (this.tmpTotalOrders < data.orders.length) {
          this.tmpTotalOrders = data.orders.length;
          this.orders = data.orders.reverse();
          this.showAlert = true;
        }
      });
    });
  }

}
