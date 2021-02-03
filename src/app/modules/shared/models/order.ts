export interface Order {
	id: string;
	product_reference: string;
	product_name: string;
	product_quantity: string;
	date_add: string;
	invoice_number: string;
	delivery_number: string;
	current_state: string;
	id_customer: string;
	payment: string;
}
