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
  showAlert = false;
  totalOrder = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
    this.interval = setInterval(() => {
      const result = this.getOrders();
      console.log('result', result);
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
        this.totalOrder = this.orders.length;
        console.log('total', this.totalOrder, '<', this.orders.length);
        if (this.totalOrder < this.orders.length) {
          this.showAlert = true;
        }
      });
  }

}
