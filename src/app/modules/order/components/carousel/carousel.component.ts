import { Component, OnDestroy, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
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
  interval: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
    this.interval = setInterval(() => {
      this.getOrders();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getOrders(): void {
    this.orderService.getOrders()
      .pipe(
        catchError(error => throwError(error))
      )
      .subscribe((orders: { orders: string[] }) => {
        console.log('orders', orders.orders);
        this.orders = orders.orders.reverse();
      });
  }

}
