import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/order';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(private http: HttpClient) { }

	getLastOrders(): any {
		return this.http.get(`
			${environment.apiUrl}/orders?ws_key=${environment.keyWSNemShop}&output_format=JSON&display=full&limit=6210,100
		`);
	}

	getOrders(): any {
		return this.http.get(`
			${environment.apiUrl}/orders?ws_key=${environment.keyWSNemShop}&output_format=JSON&display=full
		`);
	}
}
