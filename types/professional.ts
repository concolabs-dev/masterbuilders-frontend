import { Location } from "./common";
import { PaymentRecord } from "./payment";

export interface Professional {
	id: string;
	company_name: string;
	company_type: string;
	company_description: string;
	year_founded: number;
	number_of_employees: number;
	email: string;
	telephone_number: string;
	website: string;
	address: string;
	location: Location;
	specializations: string[];
	services_offered: string[];
	certifications_accreditations: string[];
	company_logo_url: string;
	cover_image_url: string;
	pid: string;
	status:string;
}

export interface ProfessionalSearchResult {
    query: string;
    count: number;
    results: Professional[];
}

export interface ProfessionalTypesResponse {
    professional_types: string[];
    count: number;
}

export interface ProfessionalFilters {
    company_type?: string;
    location?: string;
    year_from?: string;
    year_to?: string;
    employees_min?: string;
    employees_max?: string;
    specialization?: string;
    service?: string;
}

export interface ProfessionalWithRecord {
	professional: Professional;
	record: PaymentRecord;
}