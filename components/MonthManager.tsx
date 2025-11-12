import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMaterials, updateMaterial } from "@/app/api";
import { Material } from "@/types";

function MonthManager({
	materials,
	setMaterials,
}: {
	materials: Material[];
	setMaterials: (materials: Material[]) => void;
}) {
	const [selectedMonth, setSelectedMonth] = useState<string>("");

	// Generate months for the dropdown
	const generateMonths = () => {
		const months = [];
		const currentYear = new Date().getFullYear();
		for (let i = 0; i < 12; i++) {
			const date = new Date(currentYear, i, 1);
			const monthString = date.toISOString().split("T")[0].slice(0, 7); // Format: YYYY-MM
			months.push(monthString);
		}
		return months;
	};

	const addNewMonthToAllMaterials = async () => {
		if (!selectedMonth) {
			alert("Please select a month before proceeding.");
			return;
		}

		const newMonthString = `${selectedMonth}-01 00:00:00`;

		try {
			const allMaterials = await getMaterials();
			const updatedMaterials = allMaterials.map((material) => {
				const monthExists = material.Prices.some(
					([date]) => date === newMonthString
				);
				if (monthExists) {
					throw new Error(
						`Month ${newMonthString} already exists for material ${material.Name}`
					);
				}
				return {
					...material,
					Prices: [
						...material.Prices,
						[newMonthString, null] as [string, number | null],
					],
				};
			});
			await Promise.all(
				updatedMaterials.map((material) =>
					updateMaterial(material.Number, { Prices: material.Prices })
				)
			);
			setMaterials(updatedMaterials);
			alert(`Month ${selectedMonth} added successfully to all materials.`);
		} catch (error) {
			console.error("Error adding new month to materials:", error);
		}
	};

	const deleteMonthFromAllMaterials = async () => {
		if (!selectedMonth) {
			alert("Please select a month before proceeding.");
			return;
		}

		const monthToDelete = `${selectedMonth}-01 00:00:00`;

		try {
			const allMaterials = await getMaterials();
			const updatedMaterials = allMaterials.map((material) => {
				const updatedPrices = material.Prices.filter(
					([date]) => date !== monthToDelete
				);
				return {
					...material,
					Prices: updatedPrices,
				};
			});
			await Promise.all(
				updatedMaterials.map((material) =>
					updateMaterial(material.Number, { Prices: material.Prices })
				)
			);
			setMaterials(updatedMaterials);
			alert(`Month ${selectedMonth} deleted successfully from all materials.`);
		} catch (error) {
			console.error("Error deleting month from materials:", error);
		}
	};

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="month-select"
					className="block text-sm font-medium text-gray-700"
				>
					Select Month
				</label>
				<select
					id="month-select"
					value={selectedMonth}
					onChange={(e) => setSelectedMonth(e.target.value)}
					className="mt-1 w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>
					<option value="">-- Select a Month --</option>
					{generateMonths().map((month) => (
						<option key={month} value={month}>
							{month}
						</option>
					))}
				</select>
			</div>
			<div className="flex gap-4">
				<Button variant="outline" onClick={addNewMonthToAllMaterials}>
					Add Selected Month to All Materials
				</Button>
				<Button
					variant="outline"
					className="text-destructive"
					onClick={deleteMonthFromAllMaterials}
				>
					Delete Selected Month from All Materials
				</Button>
			</div>
		</div>
	);
}

export default MonthManager;
