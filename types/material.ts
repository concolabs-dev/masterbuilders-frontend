export interface Material {
	id: string;
	Number: string;
	Name: string;
	Type: string;
	Category: {
		Category: string;
		Subcategory: string | null;
		"Sub subcategory": string | null;
	};
	Qty: number;
	Unit: string;
	Prices: [string, number | null][];
	Source: string | null;
	Items?: MaterialItem[];
}
export interface MaterialItem {
	id: string;
	name: string;
	// Add additional properties as needed.
}
