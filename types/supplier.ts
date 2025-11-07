import { Location } from "./common";

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
}