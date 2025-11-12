export interface Category {
	id: string;
	name: string;
	categories: {
		name: string;
		subcategories: {
			name: string;
			["Sub subcategories"]: { name: string }[];
		}[];
	}[];
}
