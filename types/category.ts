export interface Category {
	id: string;
	name: string;
	categories: {
		name: string;
		subcategories: {
			name: string;
			sub_subcategories: { name: string }[];
		}[];
	}[];
}
