import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
	isCollapsed = true;

	constructor() { }

	ngOnInit(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('register-page');
	}

	ngOnDestroy(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('register-page');
	}
}
