import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// A helper to get the conversion rate (1 for LKR, or lookup from exchangeRates)
export const getConversionRate = (
	selectedCurrency: string,
	exchangeRates: Record<string, number>
) => {
	return selectedCurrency === "LKR" ? 1 : exchangeRates[selectedCurrency] || 1;
};
