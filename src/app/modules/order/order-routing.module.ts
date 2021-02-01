import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersManagementComponent } from './pages/orders-management/orders-management.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
	{
		path: 'order',
		component: OrderComponent
	},
	{
		path: 'orders-management',
		component: OrdersManagementComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrderRoutingModule { }
