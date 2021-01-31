import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderService } from 'src/app/modules/shared/services/order/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  orders: any;
  date: string;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // this.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.getOrders();
    this.getCurrentDate();
  }

  getCurrentDate(): any {
    setInterval(() => {
      this.date = moment().format('DD/MM/YYYY hh:mm:ss');
    }, 1000); // set it every one seconds
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
