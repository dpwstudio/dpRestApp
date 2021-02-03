import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { OrdersPendingComponent } from './components/orders-pending/orders-pending.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TableComponent } from './components/table/table.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
	declarations: [OrderComponent, OrdersPendingComponent, OrdersManagementComponent, TableComponent],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		OrderRoutingModule,
		SharedModule,
		AlertModule.forRoot(),
		ModalModule.forRoot(),
		TabsModule.forRoot(),
		PaginationModule.forRoot(),
		NgxPaginationModule
	]
})
export class OrderModule { }
