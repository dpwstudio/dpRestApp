import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [OrderComponent, CarouselComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    OrderRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
  ]
})
export class OrderModule { }
