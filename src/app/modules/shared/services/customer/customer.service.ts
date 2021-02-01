import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private http: HttpClient) { }

	getCustomer(): any {
		return this.http.get(`
			${environment.apiUrl}/customers?ws_key=${environment.keyWSNemShop}&output_format=JSON&display=full
		`);
	}
}
