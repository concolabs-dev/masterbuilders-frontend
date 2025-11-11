import { Location } from "./common";
import { PaymentRecord } from "./payment";

export interface Supplier {
	id: string;
	email: string;
	pid: string;
	business_name: string;
	business_description: string;
	telephone: string;
	email_given: string;
	address: string;
	location: Location;
	profile_pic_url: string;
	cover_pic_url: string;
	status:string
}

export interface SupplierWithRecord {
	supplier: Supplier;
	record: PaymentRecord;
}