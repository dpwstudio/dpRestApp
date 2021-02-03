import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private http: HttpClient) { }

	getCustomer(id): any {
		return this.http.get(`
			${environment.apiUrl}/customers?ws_key=${environment.keyWSNemShop}&output_format=JSON&display=full&filter[id]=[${id}]
		`);
	}

	getCustomerAddress(id): any {
		return this.http.get(`
			${environment.apiUrl}/addresses?ws_key=${environment.keyWSNemShop}&output_format=JSON&display=full&filter[id_customer]=[${id}]
		`);
	}
}
