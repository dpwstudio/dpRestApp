import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const requestWithHeadersCors = request.clone({
			headers: request.headers
				.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
				.set('Access-Control-Allow-Methods', 'GET,POST,HEAD,DELETE,PUT,OPTIONS')
				.set('Access-Control-Allow-Origin', '*')
				.set('Content-Type', 'application/json'),
				responseType: 'json'
		});
		return next.handle(requestWithHeadersCors);
	}
}
