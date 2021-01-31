import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`
      ${environment.apiUrl}/orders?ws_key=${environment.keyWSNemShop}&output_format=JSON&display=full&limit=6210,100
    `);
  }
}
