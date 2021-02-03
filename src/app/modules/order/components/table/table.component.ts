import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Order } from 'src/app/modules/shared/models/order';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
	@Input() orders: Order[] = [];
	@Input() isDelivered = false;
	returnedArray: Order[];
	currentPage = 1;
	contentArray = [];
	showDirectionLinks = true;
	maxSize = 6;

	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.orders.currentValue) {
			this.returnedArray = changes.orders.currentValue.slice(0, 20);
		}
	}

	pageChanged(event: PageChangedEvent): void {
		const startItem = (event.page - 1) * event.itemsPerPage;
		const endItem = event.page * event.itemsPerPage;
		this.returnedArray = this.orders.slice(startItem, endItem);
	}

}
