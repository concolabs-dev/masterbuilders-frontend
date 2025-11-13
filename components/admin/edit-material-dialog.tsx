import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Category, Material } from "@/types";
import { getMaterialsByCategory, updateMaterial } from "@/app/api";

interface EditMaterialDialogProps {
	dialogOpen: boolean;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	selectedMaterial: Material | null;
	categories: Category[];
	setMaterials: Dispatch<SetStateAction<Material[]>>;
	createCat: string;
	selectedCategory: string | null;
	selectedSubcategory: string | null;
	selectedSubSubcategory: string | null;
}

interface EditFormState {
	name: string;
	unit: string;
	type: string;
	category: string;
	subcategory: string;
	subSubcategory: string;
	prices: [string, number | null][];
}

const initialFormState: EditFormState = {
	name: "",
	unit: "",
	type: "",
	category: "",
	subcategory: "",
	subSubcategory: "",
	prices: [],
};

export default function EditMaterialDialog(props: EditMaterialDialogProps) {
	const {
		dialogOpen,
		setDialogOpen,
		selectedMaterial,
		categories,
		setMaterials,
		createCat,
		selectedCategory,
		selectedSubcategory,
		selectedSubSubcategory,
	} = props;

	// Single state object for all form fields
	const [formData, setFormData] = useState<EditFormState>(initialFormState);

	// Initialize form when selectedMaterial changes
	useEffect(() => {
		if (selectedMaterial) {
			setFormData({
				name: selectedMaterial.Name,
				unit: selectedMaterial.Unit,
				type: selectedMaterial.Type || "",
				category: selectedMaterial.Category.Category || "",
				subcategory: selectedMaterial.Category.Subcategory || "",
				subSubcategory: selectedMaterial.Category["Sub subcategory"] || "",
				prices: selectedMaterial.Prices,
			});
		} else {
			setFormData(initialFormState);
		}
	}, [selectedMaterial]);

	// Helper function to update form data
	const updateFormData = (updates: Partial<EditFormState>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	const currentType = categories.find((t) => t.name === formData.type);
	const currentCat = currentType?.categories?.find(
		(c) => c.name === formData.category
	);
	const currentSub = currentCat?.subcategories?.find(
		(s) => s.name === formData.subcategory
	);
	const currentSubSub = currentSub?.["Sub subcategories"]?.find(
		(s) => s.name === formData.subSubcategory
	);

	const handleTypeChange = (value: string) => {
		updateFormData({
			type: value,
			category: "",
			subcategory: "",
			subSubcategory: "",
		});
	};

	const handleCategoryChange = (value: string) => {
		updateFormData({
			category: value,
			subcategory: "",
			subSubcategory: "",
		});
	};

	const handleSubcategoryChange = (value: string) => {
		updateFormData({
			subcategory: value,
			subSubcategory: "",
		});
	};

	const handlePriceChange = (index: number, value: string) => {
		const newPrices = [...formData.prices];
		const numValue = value ? parseFloat(value) : null;

		// Prevent negative values
		newPrices[index][1] = numValue !== null ? Math.max(0, numValue) : null;
		updateFormData({ prices: newPrices });
	};

	const handleEditSave = async () => {
		if (!selectedMaterial) return;

		try {
			await updateMaterial(selectedMaterial.Number, {
				Name: formData.name,
				Unit: formData.unit,
				Type: formData.type,
				Category: {
					Category: formData.category,
					Subcategory: formData.subcategory,
					["Sub subcategory"]: formData.subSubcategory,
				},
				Prices: formData.prices,
			});

			// Refresh materials list
			const categoryToFetch = createCat || selectedCategory;
			if (categoryToFetch) {
				const data = await getMaterialsByCategory(
					categoryToFetch,
					selectedSubcategory || undefined,
					selectedSubSubcategory || undefined
				);
				setMaterials(data);
			}

			setDialogOpen(false);
		} catch (error) {
			console.error("Error updating material:", error);
		}
	};

	const handleCancel = () => {
		setDialogOpen(false);
	};

	console.log("form data ;;;;;;;", formData);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Material</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 mt-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Material Name
						</label>
						<Input
							placeholder="Material Name"
							value={formData.name}
							onChange={(e) => updateFormData({ name: e.target.value })}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Unit</label>
						<Input
							placeholder="Unit"
							value={formData.unit}
							onChange={(e) => updateFormData({ unit: e.target.value })}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Type</label>
						<select
							className="w-full border p-2 rounded-md"
							value={formData.type}
							onChange={(e) => handleTypeChange(e.target.value)}
						>
							<option value="">-- Select Type --</option>
							{categories.map((t) => (
								<option key={t.name} value={t.name}>
									{t.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Category</label>
						<select
							className="w-full border p-2 rounded-md"
							value={formData.category}
							onChange={(e) => handleCategoryChange(e.target.value)}
							disabled={!formData.type}
						>
							<option value="">-- Select Category --</option>
							{currentType?.categories?.map((cat) => (
								<option key={cat.name} value={cat.name}>
									{cat.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Subcategory
						</label>
						<select
							className="w-full border p-2 rounded-md"
							value={formData.subcategory}
							onChange={(e) => handleSubcategoryChange(e.target.value)}
							disabled={!formData.category}
						>
							<option value="">-- Select Subcategory --</option>
							{currentCat?.subcategories?.map((sub) => (
								<option key={sub.name} value={sub.name}>
									{sub.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Sub-Subcategory
						</label>
						<select
							className="w-full border p-2 rounded-md"
							value={formData.subSubcategory}
							onChange={(e) =>
								updateFormData({ subSubcategory: e.target.value })
							}
							disabled={!formData.subcategory}
						>
							<option value="">-- Select Sub-Subcategory --</option>
							{currentSub?.["Sub subcategories"]?.map((subSub) => (
								<option key={subSub.name} value={subSub.name}>
									{subSub.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Prices</label>
						<div className="max-h-64 overflow-y-auto space-y-2">
							{formData.prices.map((price, index) => (
								<div key={index} className="flex gap-2">
									<Input
										type="text"
										value={price[0]}
										readOnly
										className="w-1/2 bg-muted"
									/>
									<Input
										type="number"
										min="0"
										step="0.01"
										value={price[1] ?? ""}
										onChange={(e) => handlePriceChange(index, e.target.value)}
										className="w-1/2"
										placeholder="Enter price"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleCancel}>
						Cancel
					</Button>
					<Button onClick={handleEditSave}>Save Changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
