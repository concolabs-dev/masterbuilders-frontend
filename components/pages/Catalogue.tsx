"use client";

import { useEffect, useState, useRef } from "react";
import {
	getMaterialsByCategory,
	getTypes,
	searchMaterials,
	getExchangeRates,
} from "../../app/api";
import { MaterialCard } from "@/components/material-card";
import { PriceChart } from "@/components/price-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { getItemsByMaterialID } from "@/app/api";
import { SupplierItemCard } from "@/components/supplier-item-card";
import { Head } from "next/document";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/loading";
import Link from "next/link";
import { Category, Item, Material } from "@/types";
import { getConversionRate } from "@/lib/utils";

export default function CataloguePage() {
	const [materials, setMaterials] = useState<Material[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
		null
	);
	const [expandedTypes, setExpandedTypes] = useState<string[]>([]);
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
	const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
		[]
	);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
		null
	);
	const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<
		string | null
	>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [tempsearchQuery, setTempSearchQuery] = useState<string>("");
	const [showSidebar, setShowSidebar] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// New state for currency conversion:
	const [selectedCurrency, setSelectedCurrency] = useState<string>("LKR");
	const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
		{}
	);
	const [materialItems, setMaterialItems] = useState<Item[]>([]);

	// Ref for scrolling to results
	const resultsRef = useRef<HTMLDivElement>(null);

	// Scroll to results function
	const scrollToResults = () => {
		// if (resultsRef.current) {
		// 	resultsRef.current.scrollIntoView({
		// 		behavior: "smooth",
		// 		block: "start",
		// 	});
		// }
	};

	useEffect(() => {
		setIsLoading(true);
		console.log(selectedMaterial?.Name);
		if (selectedMaterial) {
			getItemsByMaterialID(encodeURIComponent(selectedMaterial.id))
				.then((data) => {
					setMaterialItems(data);
				})
				.catch((err) =>
					console.error("Error fetching items by material name:", err)
				);
		}
		setIsLoading(false);
		console.log(materialItems);
	}, [selectedMaterial]);

	// Fetch exchange rates from our API (returns major_currencies)
	useEffect(() => {
		async function fetchExchangeRates() {
			try {
				const rates = await getExchangeRates();
				setExchangeRates(rates);
			} catch (error) {
				console.error("Failed to fetch exchange rates:", error);
			}
		}
		fetchExchangeRates();
	}, []);

	const handleButtonClick = () => {
		setSearchQuery(tempsearchQuery);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setSearchQuery(tempsearchQuery);
		}
	};

	const callAPI = async () => {
		try {
			const res = await fetch("/api/test");
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchCategories = async () => {
			try {
				const data = await getTypes();
				setCategories(data);
				if (data.length > 0 && data[0].categories.length > 0) {
					setSelectedType(data[0].name);
					setSelectedCategory(data[0].categories[0].name);
				}
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
		callAPI();
	}, []);

	useEffect(() => {
		const fetchMaterials = async () => {
			try {
				if (tempsearchQuery.trim()) {
					// Perform search when query exists
					const data = await searchMaterials(
						searchQuery,
						selectedSubcategory || undefined
					);
					setTempSearchQuery("");
					setMaterials(data);

					// Scroll to results after search
					setTimeout(scrollToResults, 200);
				} else if (selectedCategory) {
					// Fetch based on category when no search query
					const data = await getMaterialsByCategory(
						selectedCategory,
						selectedSubcategory || undefined,
						selectedSubSubcategory || undefined
					);
					setMaterials(data);

					// Scroll to results after category selection
					setTimeout(scrollToResults, 200);
				}
			} catch (error) {
				console.error("Error fetching materials:", error);
			}
		};
		fetchMaterials();
	}, [
		selectedCategory,
		selectedSubcategory,
		searchQuery,
		selectedSubSubcategory,
	]);

	// Handle category selection with scroll
	const handleCategorySelection = (category: string) => {
		setSelectedCategory(category);
		setSelectedSubcategory(null);
		setSelectedSubSubcategory(null);
		setExpandedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
		// Close sidebar on mobile after selection
		if (window.innerWidth < 768) {
			setShowSidebar(false);
		}
	};

	// Handle subcategory selection with scroll
	// const handleSubcategorySelection = (subcategory: string) => {
	// 	setSelectedSubcategory(subcategory);
	// 	// Close sidebar on mobile after selection
	// 	if (window.innerWidth < 768) {
	// 		setShowSidebar(false);
	// 	}
	// };

	const handleSubcategorySelection = (
		subcategory: string,
		category: string
	) => {
		setSelectedSubcategory(subcategory);
		setSelectedCategory(category);
		setSelectedSubSubcategory(null); // <-- Reset L3 state

		// Toggle L3 expansion
		setExpandedSubcategories((prev) =>
			prev.includes(subcategory)
				? prev.filter((s) => s !== subcategory)
				: [...prev, subcategory]
		);

		// Close sidebar on mobile after selection
		if (window.innerWidth < 768) {
			setShowSidebar(false);
		}
	};

	const handleSubSubcategorySelection = (
		subSubcategory: string,
		subcategory: string,
		category: string
	) => {
		setSelectedSubSubcategory(subSubcategory);
		setSelectedSubcategory(subcategory);
		setSelectedCategory(category);

		// Close sidebar on mobile after selection
		if (window.innerWidth < 768) {
			setShowSidebar(false);
		}
	};

	return (
		<>
			{isLoading && <Loading />}

			{/* Floating Categories Button for Mobile */}
			<Button
				className="md:hidden fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-slate-800 text-white shadow-lg px-4 py-2 flex items-center gap-2"
				onClick={() => setShowSidebar(true)}
			>
				<Menu className="h-4 w-4" />
				Categories
			</Button>

			<div className="container mx-auto px-4 py-8">
				{/* Currency selection dropdown */}
				<div className="mb-4 flex items-center gap-2">
					{/* Currency selection code remains the same */}
				</div>

				<div className="grid gap-6 md:grid-cols-[400px_1fr]">
					<aside className="hidden md:block space-y-4 bg-slate-900 p-4 rounded-lg text-white">
						<h2 className="text-lg font-semibold">Categories</h2>
						{categories.map((type) => (
							<div key={type.name}>
								<Button
									variant="ghost"
									className={`w-full justify-start text-white hover:text-white hover:bg-slate-800 ${
										selectedType === type.name ? "font-bold" : ""
									}`}
									onClick={() => {
										setSelectedType(type.name);
										setExpandedTypes((prev) =>
											prev.includes(type.name)
												? prev.filter((t) => t !== type.name)
												: [...prev, type.name]
										);
									}}
								>
									{expandedTypes.includes(type.name) ? (
										<ChevronDown className="mr-2 h-4 w-4" />
									) : (
										<ChevronRight className="mr-2 h-4 w-4" />
									)}
									{type.name}
								</Button>
								{expandedTypes.includes(type.name) && (
									<div className="ml-4">
										{type.categories.map((category) => (
											<div key={category.name}>
												<Button
													variant="ghost"
													className={`w-full justify-start pl-6 text-slate-300 hover:text-white hover:bg-slate-800 ${
														selectedCategory === category.name
															? "font-bold"
															: ""
													}`}
													onClick={() => handleCategorySelection(category.name)}
												>
													{expandedCategories.includes(category.name) ? (
														<ChevronDown className="mr-2 h-4 w-4" />
													) : (
														<ChevronRight className="mr-2 h-4 w-4" />
													)}
													{category.name}
												</Button>
												{/* L2 - Subcategory */}
												{expandedCategories.includes(category.name) &&
													category.subcategories &&
													category.subcategories.map((sub) => (
														<div className="ml-6" key={sub.name}>
															<Button
																variant="ghost"
																className={`w-full justify-start pl-8 text-slate-400 hover:text-white hover:bg-slate-800 ${
																	selectedSubcategory === sub.name
																		? "font-bold"
																		: ""
																}`}
																// --- MODIFIED CLICK HANDLER ---
																// This now needs to expand L3
																onClick={() =>
																	handleSubcategorySelection(sub.name, category.name)
																}
															>
																{/* --- ADDED CHEVRONS --- */}
																{expandedSubcategories.includes(sub.name) ? (
																	<ChevronDown className="mr-2 h-4 w-4" />
																) : (
																	<ChevronRight className="mr-2 h-4 w-4" />
																)}
																{sub.name}
															</Button>

															{/* --- NEW L3 (Sub-Subcategory) LOOP --- */}
															{expandedSubcategories.includes(sub.name) &&
																sub["Sub subcategories"] && (
																	<div className="ml-8">
																		{sub["Sub subcategories"].map(
																			(subSub, index) => (
																				<Button
																					// Use index for key as strings may not be unique
																					key={index}
																					variant="ghost"
																					className={`w-full justify-start pl-10 text-slate-500 hover:text-white hover:bg-slate-800 ${
																						selectedSubSubcategory ===
																						subSub.name
																							? "font-bold"
																							: ""
																					}`}
																					onClick={() =>
																						handleSubSubcategorySelection(
																							subSub.name,
																							sub.name,
																							category.name
																						)
																					}
																				>
																					{/* The L3 item is just a string */}
																					{subSub.name}
																				</Button>
																			)
																		)}
																	</div>
																)}
															{/* --- END OF NEW L3 LOOP --- */}
														</div>
													))}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</aside>

					{/* Main content area with results ref */}
					<div className="space-y-6">
						<h1 className="text-3xl font-bold">
							Prices
							<span className="ml-2 text-xl font-normal text-gray-400">
								(Excluding VAT)
							</span>
						</h1>
						<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
							<Input
								placeholder="Search materials..."
								className="w-full sm:max-w-md"
								value={tempsearchQuery}
								onChange={(e) => setTempSearchQuery(e.target.value)}
								onKeyUp={handleKeyPress}
							/>
							<div className="flex gap-2">
								<Button onClick={handleButtonClick}>Search</Button>
								<Button
									variant="outline"
									onClick={() => {
										setTempSearchQuery("");
										setSearchQuery("");
									}}
								>
									Clear
								</Button>
								<Select onValueChange={(value) => setSelectedCurrency(value)}>
									<SelectTrigger className="w-[180px] bg-primary text-white font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 rounded-lg">
										<span className="text-white">
											<SelectValue placeholder="Select Currency" />
										</span>
									</SelectTrigger>
									<SelectContent>
										{Object.keys(exchangeRates).map((currency) => (
											<SelectItem key={currency} value={currency}>
												{currency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Results section with ref for scrolling */}
						<div
							ref={resultsRef}
							className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
						>
							{materials.length > 0 ? (
								materials.map((material) => {
									const priceLKR =
										material.Prices.slice()
											.reverse()
											.find((p) => p[1])?.[1] || 0;
									const conversionRate = getConversionRate(
										selectedCurrency,
										exchangeRates
									);
									const displayedPrice = priceLKR * conversionRate;
									return (
										<MaterialCard
											key={material.Number}
											name={material.Name}
											unit={material.Unit}
											location="National"
											rating={4}
											price={displayedPrice}
											currency_t={selectedCurrency || ""}
											onClick={() => setSelectedMaterial(material)}
										/>
									);
								})
							) : (
								<div className="col-span-full text-center py-8">
									<p className="text-gray-500">No materials found</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Categories Modal for Mobile */}
				<Dialog open={showSidebar} onOpenChange={setShowSidebar}>
					<DialogContent
						showCloseButton={false}
						className="max-w-sm max-h-[80vh] overflow-hidden p-0"
					>
						<div className="bg-slate-900 text-white h-full">
							<div className="flex justify-between items-center p-4 border-b border-slate-700">
								<h2 className="text-lg font-semibold">Categories</h2>
								<Button
									size="sm"
									variant="ghost"
									className="text-white hover:bg-slate-800"
									onClick={() => setShowSidebar(false)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>

							<div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)] space-y-2">
								{categories.map((type) => (
									<div key={type.name}>
										<Button
											variant="ghost"
											className={`w-full justify-start text-white hover:text-white hover:bg-slate-800 ${
												selectedType === type.name ? "font-bold" : ""
											}`}
											onClick={() => {
												setSelectedType(type.name);
												setExpandedTypes((prev) =>
													prev.includes(type.name)
														? prev.filter((t) => t !== type.name)
														: [...prev, type.name]
												);
											}}
										>
											{expandedTypes.includes(type.name) ? (
												<ChevronDown className="mr-2 h-4 w-4" />
											) : (
												<ChevronRight className="mr-2 h-4 w-4" />
											)}{" "}
											{type.name}
										</Button>
										{expandedTypes.includes(type.name) && (
											<div className="ml-4">
												{type.categories.map((category) => (
													<div key={category.name}>
														<Button
															variant="ghost"
															className={`w-full justify-start pl-6 text-slate-300 hover:text-white hover:bg-slate-800 ${
																selectedCategory === category.name
																	? "font-bold"
																	: ""
															}`}
															onClick={() => {
																handleCategorySelection(category.name);
																setShowSidebar(false); // Close modal after selection
															}}
														>
															{expandedCategories.includes(category.name) ? (
																<ChevronDown className="mr-2 h-4 w-4" />
															) : (
																<ChevronRight className="mr-2 h-4 w-4" />
															)}{" "}
															{category.name}
														</Button>
														{expandedCategories.includes(category.name) &&
															category.subcategories &&
															category.subcategories.map((sub) => (
																<div className="ml-6" key={sub.name}>
																	<Button
																		variant="ghost"
																		className={`w-full justify-start pl-8 text-slate-400 hover:text-white hover:bg-slate-800 ${
																			selectedSubcategory === sub.name
																				? "font-bold"
																				: ""
																		}`}
																		onClick={() => {
																			handleSubcategorySelection(sub.name, category.name);
																			setShowSidebar(false); // Close modal after selection
																		}}
																	>
																		{sub.name}
																	</Button>
																</div>
															))}
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</DialogContent>
				</Dialog>

				{/* Material Details Dialog */}
				<Dialog
					open={!!selectedMaterial}
					onOpenChange={() => setSelectedMaterial(null)}
				>
					<DialogContent
						showCloseButton={false}
						className="max-w-4xl max-h-[90vh] overflow-y-auto"
					>
						{selectedMaterial && (
							<div className="p-4 space-y-4 bg-white rounded-lg">
								<div className="sticky top-2 z-50 flex justify-end px-2">
									<Button
										size="icon"
										variant="secondary"
										aria-label="Close"
										className="rounded-full shadow-md bg-white/90 text-gray-700 border hover:bg-white"
										onClick={() => setSelectedMaterial(null)}
									>
										<X className="h-5 w-5" />
									</Button>
								</div>
								<h2 className="text-2xl font-bold text-center mb-4">
									{selectedMaterial.Name}
								</h2>
								<div className="grid grid-cols-2 gap-4 text-center text-sm md:text-base">
									<div className="col-span-2 text-center">
										{(() => {
											const latestPriceLKR =
												selectedMaterial.Prices.slice() // Create a shallow copy to avoid mutating the original array
													.sort(
														(a, b) =>
															new Date(b[0]).getTime() -
															new Date(a[0]).getTime()
													) // Sort by date descending
													.find((p) => p[1])?.[1] || 0;
											const conversionRate = getConversionRate(
												selectedCurrency,
												exchangeRates
											);
											const displayedPrice = latestPriceLKR * conversionRate;
											return (
												<p className="text-gray-700 text-lg">
													Latest Price:{" "}
													<span className="text-orange-600 font-bold">
														{selectedCurrency} {displayedPrice.toFixed(2)}
													</span>
												</p>
											);
										})()}
									</div>
									<div>
										<p className="text-gray-600">
											<span className="font-semibold">Category:</span>{" "}
											{selectedMaterial.Category.Category}
										</p>
									</div>
									{selectedMaterial.Category.Subcategory && (
										<div>
											<p className="text-gray-600">
												<span className="font-semibold">Subcategory:</span>{" "}
												{selectedMaterial.Category.Subcategory}
											</p>
										</div>
									)}
									{selectedMaterial.Category["Sub subcategory"] && (
										<div>
											<p className="text-gray-600">
												<span className="font-semibold">Sub-Subcategory:</span>{" "}
												{selectedMaterial.Category["Sub subcategory"]}
											</p>
										</div>
									)}
									<div>
										<p className="text-gray-600">
											<span className="font-semibold">Unit:</span>{" "}
											{selectedMaterial.Unit}
										</p>
									</div>
								</div>

								<PriceChart
									itemName={selectedMaterial.Name}
									prices={selectedMaterial.Prices.map(([date, price]) => {
										const converted = price
											? price *
											  getConversionRate(selectedCurrency, exchangeRates)
											: 0;
										return { date, price: converted };
									})}
									currency={selectedCurrency}
									onClose={() => setSelectedMaterial(null)}
								/>

								{selectedMaterial &&
									materialItems &&
									materialItems.length > 0 && (
										<div className="">
											<h2 className="text-lg font-semibold mb-4">
												Available Items from Suppliers
											</h2>
											<div className="grid gap-3 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3">
												{materialItems.map((item) => {
													const conversionRate =
														selectedCurrency === "LKR"
															? 1
															: exchangeRates[selectedCurrency] || 1;
													const convertedPrice = item.price * conversionRate;

													return (
														<div key={item.id} className="relative">
															<Link
																href={`/supplier/${item.supplierPid}`}
																className="block"
																onClick={(e) => {
																	e.stopPropagation();
																	setSelectedMaterial(null); // Close the modal when navigating to supplier
																}}
															>
																<SupplierItemCard
																	item={{
																		...item,
																		price: convertedPrice,
																	}}
																	onEdit={() => {}}
																	onDelete={() => {}}
																	admin={false}
																	displayCurrency={selectedCurrency}
																/>
															</Link>
														</div>
													);
												})}
											</div>
										</div>
									)}

								{selectedMaterial &&
									materialItems &&
									materialItems.length === 0 && (
										<div className="mt-6">
											<h2 className="text-lg font-semibold mb-4">
												Available Items from Suppliers
											</h2>
											<div className="text-center py-8 text-muted-foreground">
												<p>
													No items available from suppliers for this material.
												</p>
											</div>
										</div>
									)}
							</div>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}
