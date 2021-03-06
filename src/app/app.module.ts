import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeModule } from './modules/home/home.module';
import { LayoutModule } from './modules/layout/layout.module';
import { FormsModule } from '@angular/forms';
import { OrderModule } from './modules/order/order.module';
import { SharedModule } from './modules/shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HeadersInterceptor } from './modules/shared/interceptors/headers/headers.interceptor';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		AppRoutingModule,
		LayoutModule,
		HomeModule,
		OrderModule,
		SharedModule,
		AppRoutingModule,
		CarouselModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		// { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
