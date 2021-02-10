import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor() { }

	ngOnInit(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('index-page');
	}

	ngOnDestroy(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('index-page');
	}
}
