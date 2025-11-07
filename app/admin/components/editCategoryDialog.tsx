import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Category } from "@/types";

interface EditCategoryDialogProps {
	selectedCategory: Category | null;
	setSelectedCategory: (status: Category | null) => void;

	handleUpdateCategory: (id: string, updatedCategory: Category) => void;
}

export default function EditCategoryDialog(props: EditCategoryDialogProps) {
	const { selectedCategory, setSelectedCategory, handleUpdateCategory } = props;

	if (!selectedCategory) {
		return null;
	}

	const handleNameChange = (newName: string) => {
		setSelectedCategory({
			...selectedCategory,
			name: newName,
		});
	};

	const handleCategoryChange = (catIndex: number, newName: string) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) =>
			i === catIndex ? { ...cat, name: newName } : cat
		);
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleAddCategory = () => {
		setSelectedCategory({
			...selectedCategory,
			categories: [
				...selectedCategory.categories,
				{ name: "New Category", subcategories: [] },
			],
		});
	};

	const handleDeleteCategory = (catIndex: number) => {
		const updatedCategories = selectedCategory.categories.filter(
			(_, i) => i !== catIndex
		);
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleSubCategoryChange = (
		catIndex: number,
		subCatIndex: number,
		newName: string
	) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) => {
			if (i !== catIndex) return cat;
			const updatedSubcats = (cat.subcategories || []).map((subcat, j) =>
				j === subCatIndex ? { ...subcat, name: newName } : subcat
			);
			return { ...cat, subcategories: updatedSubcats };
		});
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleAddSubCategory = (catIndex: number) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) => {
			if (i !== catIndex) return cat;
			const newSubcat = { name: "", sub_subcategories: [] };
			const updatedSubcats = [...(cat.subcategories || []), newSubcat];
			return { ...cat, subcategories: updatedSubcats };
		});
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleDeleteSubCategory = (catIndex: number, subCatIndex: number) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) => {
			if (i !== catIndex) return cat;
			const updatedSubcats = (cat.subcategories || []).filter(
				(_, j) => j !== subCatIndex
			);
			return { ...cat, subcategories: updatedSubcats };
		});
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleSubSubCategoryChange = (
		catIndex: number,
		subCatIndex: number,
		subSubCatIndex: number,
		newName: string
	) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) => {
			if (i !== catIndex) return cat;
			const updatedSubcats = (cat.subcategories || []).map((subcat, j) => {
				if (j !== subCatIndex) return subcat;
				const updatedSubSubCats = (subcat.sub_subcategories || []).map(
					(subsubcat, k) =>
						k === subSubCatIndex ? { ...subsubcat, name: newName } : subsubcat
				);
				return { ...subcat, sub_subcategories: updatedSubSubCats };
			});
			return { ...cat, subcategories: updatedSubcats };
		});
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleAddSubSubCategory = (catIndex: number, subCatIndex: number) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) => {
			if (i !== catIndex) return cat;
			const updatedSubcats = (cat.subcategories || []).map((subcat, j) => {
				if (j !== subCatIndex) return subcat;
				const newSubSubCat = { name: "" };
				const updatedSubSubCats = [
					...(subcat.sub_subcategories || []),
					newSubSubCat,
				];
				return { ...subcat, sub_subcategories: updatedSubSubCats };
			});
			return { ...cat, subcategories: updatedSubcats };
		});
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleDeleteSubSubCategory = (
		catIndex: number,
		subCatIndex: number,
		subSubCatIndex: number
	) => {
		const updatedCategories = selectedCategory.categories.map((cat, i) => {
			if (i !== catIndex) return cat;
			const updatedSubcats = (cat.subcategories || []).map((subcat, j) => {
				if (j !== subCatIndex) return subcat;
				const updatedSubSubCats = (subcat.sub_subcategories || []).filter(
					(_, k) => k !== subSubCatIndex
				);
				return { ...subcat, sub_subcategories: updatedSubSubCats };
			});
			return { ...cat, subcategories: updatedSubcats };
		});
		setSelectedCategory({ ...selectedCategory, categories: updatedCategories });
	};

	const handleSave = () => {
		handleUpdateCategory(selectedCategory.id, selectedCategory);
		setSelectedCategory(null);
	};

	return (
		<Dialog
			open={!!selectedCategory}
			onOpenChange={(isOpen) => !isOpen && setSelectedCategory(null)}
		>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
				<DialogHeader className="p-6 pb-4">
					<DialogTitle>Edit Type</DialogTitle>
					<DialogDescription>
						Update the details of your type.
					</DialogDescription>
				</DialogHeader>

				{/* No <form> tag. This is a controlled component. */}
				<div className="flex-1 overflow-y-auto p-6 pt-0">
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="edit-category-name">Type Name</Label>
							<Input
								id="edit-category-name"
								value={selectedCategory.name}
								onChange={(e) => handleNameChange(e.target.value)}
							/>
						</div>

						{/* --- L1 (Categories) --- */}
						<div className="grid gap-3">
							<Label>Categories (L1)</Label>
							{selectedCategory.categories.map((cat, catIndex) => (
								<div
									key={catIndex}
									className="grid gap-3 pl-4 border-l-2 border-slate-200"
								>
									<div className="flex items-center gap-2">
										<Input
											value={cat.name}
											onChange={(e) =>
												handleCategoryChange(catIndex, e.target.value)
											}
											className="font-semibold"
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="text-destructive"
											onClick={() => handleDeleteCategory(catIndex)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>

									{/* --- L2 (Subcategories) --- */}
									<div className="grid gap-2 pl-4">
										<Label className="text-xs font-medium text-gray-500">
											Sub-Categories (L2)
										</Label>
										{cat.subcategories?.map((subcat, subCatIndex) => (
											<div
												key={subCatIndex}
												className="grid gap-2 pl-4 border-l-2 border-slate-100"
											>
												<div className="flex items-center gap-2">
													<Input
														value={subcat.name}
														onChange={(e) =>
															handleSubCategoryChange(
																catIndex,
																subCatIndex,
																e.target.value
															)
														}
													/>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="text-destructive"
														onClick={() =>
															handleDeleteSubCategory(catIndex, subCatIndex)
														}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>

												{/* --- L3 (Sub-Subcategories) --- */}
												<div className="grid gap-2 pl-4">
													<Label className="text-xs font-medium text-gray-400">
														Sub-Sub-Categories (L3)
													</Label>
													{subcat.sub_subcategories?.map(
														(subsubcat, subSubCatIndex) => (
															<div
																key={subSubCatIndex}
																className="flex items-center gap-2"
															>
																<Input
																	value={subsubcat.name}
																	onChange={(e) =>
																		handleSubSubCategoryChange(
																			catIndex,
																			subCatIndex,
																			subSubCatIndex,
																			e.target.value
																		)
																	}
																/>
																<Button
																	type="button"
																	variant="ghost"
																	size="icon"
																	className="text-destructive"
																	onClick={() =>
																		handleDeleteSubSubCategory(
																			catIndex,
																			subCatIndex,
																			subSubCatIndex
																		)
																	}
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</div>
														)
													)}
													<Button
														type="button"
														variant="outline"
														size="sm"
														className="mt-1"
														onClick={() =>
															handleAddSubSubCategory(catIndex, subCatIndex)
														}
													>
														<Plus className="w-3 h-3 mr-1" /> Add L3
													</Button>
												</div>
											</div>
										))}
										<Button
											type="button"
											variant="outline"
											size="sm"
											className="mt-2"
											onClick={() => handleAddSubCategory(catIndex)}
										>
											<Plus className="w-4 h-4 mr-2" /> Add Sub-Category (L2)
										</Button>
									</div>
								</div>
							))}
							<Button
								type="button"
								variant="outline"
								className="mt-2"
								onClick={handleAddCategory}
							>
								<Plus className="w-4 h-4 mr-2" /> Add Category (L1)
							</Button>
						</div>
					</div>
				</div>

				<DialogFooter className="p-6 pt-4 border-t">
					<Button
						type="button"
						variant="ghost"
						onClick={() => setSelectedCategory(null)}
					>
						Cancel
					</Button>
					<Button type="button" onClick={handleSave}>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
