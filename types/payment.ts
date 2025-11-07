export interface Payment {
	Month: string; // ISO date string (e.g. "2025-03-01T00:00:00.000Z")
	Amount: number;
	paymentDate: string; // ISO date string
}

// PaymentRecord model
export interface PaymentRecord {
	id: string;
	pid: string;
	approved: boolean;
	payments?: Payment[];
	deleted: boolean;
	package_name?: string;
}