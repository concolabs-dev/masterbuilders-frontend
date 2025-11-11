"use client";

import { ChevronDown, ChevronRight, Eye, Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { MaterialCard } from "@/components/material-card";
import { PriceChart } from "@/components/price-chart";
import AdminSuppliersTab from "@/components/admin-suppliers";
import Modal from "@/components/ui/Modal";
import {
	getMaterialsByCategory,
	getMaterials,
	getTypes,
	createMaterial,
	updateMaterial,
	deleteMaterial,
	createType,
	updateType,
	deleteType,
	searchMaterials,
} from "../api";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { withRoleGuard } from "../hoc/withRoleGuard";
import MonthManager from "@/components/MonthManager";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	// ... existing imports
	getProfessionals,
	updateSupplier,
	deleteProfessional,
	updateProfessional,
} from "../api";
import EditCategoryDialog from "./components/editCategoryDialog";
import { Category, Material, Professional, Supplier } from "@/types";

const mockSuppliers = [
	{
		id: "1",
		name: "ABC Construction Supplies",
		email: "contact@abcsupplies.lk",
		phone: "+94 11 234 5678",
		location: "Colombo",
		category: "Building Materials",
		status: "Active",
		joinedDate: "2024-01-15",
		totalProducts: 45,
		rating: 4.5,
	},
	{
		id: "2",
		name: "Lanka Steel Corporation",
		email: "info@lankasteel.lk",
		phone: "+94 11 345 6789",
		location: "Gampaha",
		category: "Steel & Metal",
		status: "Active",
		joinedDate: "2024-02-20",
		totalProducts: 28,
		rating: 4.2,
	},
	{
		id: "3",
		name: "Green Building Materials",
		email: "sales@greenbuild.lk",
		phone: "+94 11 456 7890",
		location: "Kandy",
		category: "Eco-Friendly Materials",
		status: "Pending",
		joinedDate: "2024-03-10",
		totalProducts: 12,
		rating: 4.0,
	},
];

const mockProfessionals = [
	{
		id: "1",
		name: "Silva & Associates",
		email: "info@silvaassociates.lk",
		phone: "+94 11 567 8901",
		location: "Colombo",
		category: "Architects",
		status: "Active",
		joinedDate: "2024-01-10",
		totalProjects: 23,
		rating: 4.8,
		ciobVerified: true,
	},
	{
		id: "2",
		name: "Premier Construction Ltd",
		email: "contact@premierconstruction.lk",
		phone: "+94 11 678 9012",
		location: "Negombo",
		category: "Contractors",
		status: "Active",
		joinedDate: "2024-02-05",
		totalProjects: 18,
		rating: 4.6,
		ciobVerified: true,
	},
	{
		id: "3",
		name: "Quantity Surveyors Lanka",
		email: "info@qslanka.lk",
		phone: "+94 11 789 0123",
		location: "Galle",
		category: "Quantity Surveyors",
		status: "Suspended",
		joinedDate: "2024-03-01",
		totalProjects: 8,
		rating: 3.9,
		ciobVerified: false,
	},
];
function AdminDashboard() {
	const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
		null
	);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);
	// Update the state variable types
	const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
		null
	);
	const [selectedProfessional, setSelectedProfessional] =
		useState<Professional | null>(null);
	const [professionalSearch, setProfessionalSearch] = useState("");
	const { user, error, isLoading } = useUser();

	const { data: professionals = [], isLoading: professionalsLoading } =
		useQuery({
			queryKey: ["professionals"],
			queryFn: getProfessionals,
		});
	console.log(user);
	const queryClient = useQueryClient();

	const { data: materials = [] } = useQuery<Material[]>({
		queryKey: ["materials"],
		queryFn: getMaterials,
	});

	const {
		data: categories = [],
		isLoading: categoriesLoading,
		error: categoriesError,
	} = useQuery<Category[]>({
		queryKey: ["categories"],
		queryFn: getTypes,
	});

	const createMaterialMutation = useMutation({
		mutationFn: createMaterial,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["materials"] });
		},
	});

	const updateMaterialMutation = useMutation({
		mutationFn: ({
			id,
			material,
		}: {
			id: string;
			material: Partial<Material>;
		}) => updateMaterial(id, material),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["materials"] });
		},
	});

	const deleteMaterialMutation = useMutation({
		mutationFn: deleteMaterial,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["materials"] });
		},
	});

	const createCategoryMutation = useMutation({
		mutationFn: createType,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const updateCategoryMutation = useMutation({
		mutationFn: ({ id, category }: { id: string; category: any }) =>
			updateType(id, category as any),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const deleteCategoryMutation = useMutation({
		mutationFn: deleteType,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const handleCreateMaterial = (newMaterial: Material) => {
		createMaterialMutation.mutate(newMaterial);
	};

	const handleUpdateMaterial = (
		id: string,
		updatedMaterial: Partial<Material>
	) => {
		updateMaterialMutation.mutate({ id, material: updatedMaterial });
	};

	const handleDeleteMaterial = (id: string) => {
		deleteMaterialMutation.mutate(id);
	};

	const handleCreateCategory = (newCategory: Omit<Category, "id">) => {
		createCategoryMutation.mutate(newCategory);
	};

	const handleUpdateCategory = (id: string, updatedCategory: any) => {
		updateCategoryMutation.mutate({ id, category: updatedCategory });
	};

	const handleUpdateSupplier = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (selectedSupplier) {
			const formData = new FormData(e.currentTarget);
			const updatedSupplier: Partial<Supplier> = {
				business_name: formData.get("business_name") as string,
				email: formData.get("email") as string,
				telephone: formData.get("telephone") as string,
				address: formData.get("address") as string,
				business_description: formData.get("business_description") as string,
			};
			updateSupplierMutation.mutate({
				id: selectedSupplier.id,
				supplier: updatedSupplier,
			});
			setSelectedSupplier(null);
		}
	};

	const handleDeleteCategory = (id: string) => {
		deleteCategoryMutation.mutate(id);
	};
	const handleLogout = async () => {
		window.location.href = "/api/auth/logout";
	};

	const updateSupplierMutation = useMutation({
		mutationFn: ({
			id,
			supplier,
		}: {
			id: string;
			supplier: Partial<Supplier>;
		}) => updateSupplier(id, supplier),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
	});

	// Add mutations for professionals
	const updateProfessionalMutation = useMutation({
		mutationFn: ({
			id,
			professional,
		}: {
			id: string;
			professional: Partial<Professional>;
		}) => updateProfessional(id, { ...professional, id } as Professional),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["professionals"] });
		},
	});

	const deleteProfessionalMutation = useMutation({
		mutationFn: deleteProfessional,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["professionals"] });
		},
	});

	const handleDeleteProfessional = (id: string) => {
		if (window.confirm("Are you sure you want to delete this professional?")) {
			deleteProfessionalMutation.mutate(id);
		}
	};
	const getStatusBadge = (status: string) => {
		const variants: {
			[key: string]: "default" | "secondary" | "destructive" | "outline";
		} = {
			Active: "default",
			Pending: "secondary",
			Suspended: "destructive",
		};
		return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
	};

	// Update the filter functions with null checks

	const filteredProfessionals = (professionals || []).filter(
		(professional) =>
			professional?.company_name
				?.toLowerCase()
				.includes(professionalSearch.toLowerCase()) ||
			professional?.email
				?.toLowerCase()
				.includes(professionalSearch.toLowerCase()) ||
			professional?.company_type
				?.toLowerCase()
				.includes(professionalSearch.toLowerCase())
	);

	return (
		<div className="container mx-auto py-10">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<Button variant="outline" onClick={handleLogout}>
					Logout
				</Button>
			</div>

			<Tabs defaultValue="materials" className="space-y-4">
				<TabsList>
					<TabsTrigger value="materials">Materials</TabsTrigger>
					<TabsTrigger value="categories">Categories</TabsTrigger>
					<TabsTrigger value="suppliers">Suppliers</TabsTrigger>
					<TabsTrigger value="professionals">professionals</TabsTrigger>
					<TabsTrigger value="payments">Payments</TabsTrigger>
				</TabsList>

				<TabsContent value="materials" className="space-y-4">
					<MaterialsUI />
				</TabsContent>

				<TabsContent value="categories" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle>Types</CardTitle>
									<CardDescription>
										Manage your material types, categories and subcategories.
									</CardDescription>
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button>
											<Plus className="w-4 h-4 mr-2" />
											Add Type
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add New Type</DialogTitle>
											<DialogDescription>
												Add a new category to organize your materials.
											</DialogDescription>
										</DialogHeader>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												const formData = new FormData(e.currentTarget);
												const newCategory = {
													name: formData.get("name") as string,
													categories: [],
												};
												handleCreateCategory(newCategory);
											}}
										>
											<div className="grid gap-4 py-4">
												<div className="grid gap-2">
													<Label htmlFor="categoryName">Type Name</Label>
													<Input
														id="categoryName"
														name="name"
														placeholder="Category name"
													/>
												</div>
											</div>
											<DialogFooter>
												<Button type="submit">Save Type</Button>
											</DialogFooter>
										</form>
									</DialogContent>
								</Dialog>
							</div>
						</CardHeader>
						<CardContent>
							{categoriesLoading ? (
								<div>Loading categories...</div>
							) : categoriesError ? (
								<div>Error loading categories: {categoriesError.message}</div>
							) : (
								<div className="rounded-md border">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Category</TableHead>
												<TableHead>Subcategories</TableHead>
												<TableHead className="text-right">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{Array.isArray(categories) ? (
												categories.map((category) => (
													<TableRow key={category.id}>
														<TableCell className="font-medium">
															{category.name}
														</TableCell>
														<TableCell>
															{Array.isArray(category.categories)
																? category.categories
																		.map((subcat) => subcat.name)
																		.join(", ")
																: "No subcategories"}
														</TableCell>
														<TableCell className="text-right space-x-2">
															<Button
																variant="ghost"
																size="icon"
																onClick={() => setSelectedCategory(category)}
															>
																<Pencil className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="text-destructive"
																onClick={() =>
																	handleDeleteCategory(category.id!)
																} // Use id instead of name
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell colSpan={3}>
														No categories available
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="payments" className="space-y-4">
					<p>payments</p>
				</TabsContent>
				<TabsContent value="suppliers" className="space-y-4">
					<AdminSuppliersTab />
				</TabsContent>

				<TabsContent value="professionals" className="space-y-4">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div>
									<CardTitle>Professionals</CardTitle>
									<CardDescription>
										Manage registered professionals and their accounts.
									</CardDescription>
								</div>
								<div className="flex items-center space-x-2">
									<div className="relative">
										<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
										<Input
											placeholder="Search professionals..."
											value={professionalSearch}
											onChange={(e) => setProfessionalSearch(e.target.value)}
											className="pl-8 w-64"
										/>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Company Name</TableHead>
											<TableHead>Contact</TableHead>
											<TableHead>Location</TableHead>
											<TableHead>Category</TableHead>
											<TableHead>Projects</TableHead>
											<TableHead>CIOB Verified</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Rating</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredProfessionals.map((professional) => (
											<TableRow key={professional.id}>
												<TableCell className="font-medium">
													{professional.company_name}
												</TableCell>
												<TableCell>
													<div className="text-sm">
														<div>{professional.email}</div>
														<div className="text-muted-foreground">
															{professional.telephone_number}
														</div>
													</div>
												</TableCell>
												<TableCell>{professional.address}</TableCell>
												<TableCell>{professional.company_type}</TableCell>
												<TableCell>
													{professional.specializations?.length || 0}
												</TableCell>
												<TableCell>
													<Badge variant="secondary">Pending</Badge>
												</TableCell>
												<TableCell>
													<Badge variant="default">Active</Badge>
												</TableCell>
												<TableCell>⭐ 4.0</TableCell>
												<TableCell className="text-right space-x-2">
													<Button variant="ghost" size="icon">
														<Eye className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onClick={() =>
															setSelectedProfessional(professional)
														}
													>
														<Pencil className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														className="text-destructive"
														onClick={() =>
															handleDeleteProfessional(professional.id)
														}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Edit Category Dialog */}
			<EditCategoryDialog
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				handleUpdateCategory={handleUpdateCategory}
			/>

			{/* Edit Supplier Dialog */}


			{/* Edit Professional Dialog */}
			<Dialog
				open={!!selectedProfessional}
				onOpenChange={() => setSelectedProfessional(null)}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Edit Professional</DialogTitle>
						<DialogDescription>
							Update professional information and account status.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (selectedProfessional) {
								const formData = new FormData(e.currentTarget);
								const updatedProfessional: Partial<Professional> = {
									company_name: formData.get("company_name") as string,
									email: formData.get("email") as string,
									telephone_number: formData.get("telephone_number") as string,
									address: formData.get("address") as string,
									company_type: formData.get("company_type") as string,
									company_description: formData.get(
										"company_description"
									) as string,
								};
								updateProfessionalMutation.mutate({
									id: selectedProfessional.id,
									professional: updatedProfessional,
								});
								setSelectedProfessional(null);
							}
						}}
					>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="professional-company-name">
										Company Name
									</Label>
									<Input
										id="professional-company-name"
										name="company_name"
										defaultValue={selectedProfessional?.company_name}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="professional-email">Email</Label>
									<Input
										id="professional-email"
										name="email"
										type="email"
										defaultValue={selectedProfessional?.email}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="professional-telephone">Phone</Label>
									<Input
										id="professional-telephone"
										name="telephone_number"
										defaultValue={selectedProfessional?.telephone_number}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="professional-address">Address</Label>
									<Input
										id="professional-address"
										name="address"
										defaultValue={selectedProfessional?.address}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="professional-company-type">
										Company Type
									</Label>
									<Select defaultValue={selectedProfessional?.company_type}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Architecture">Architecture</SelectItem>
											<SelectItem value="Engineering">Engineering</SelectItem>
											<SelectItem value="Construction">Construction</SelectItem>
											<SelectItem value="Consulting">Consulting</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="professional-website">Website</Label>
									<Input
										id="professional-website"
										name="website"
										defaultValue={selectedProfessional?.website}
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="professional-description">
									Company Description
								</Label>
								<Textarea
									id="professional-description"
									name="company_description"
									defaultValue={selectedProfessional?.company_description}
									placeholder="Company description..."
								/>
							</div>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function MaterialsUI() {
	const [isMonthManagerOpen, setIsMonthManagerOpen] = useState(false);

	const openMonthManager = () => setIsMonthManagerOpen(true);
	const closeMonthManager = () => setIsMonthManagerOpen(false);
	const [materials, setMaterials] = useState<Material[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
		null
	);
	const [expandedTypes, setExpandedTypes] = useState<string[]>([]);
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
		null
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [tempsearchQuery, setTempSearchQuery] = useState("");
	const [showSidebar, setShowSidebar] = useState(false);

	// Admin edit state
	const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [editName, setEditName] = useState("");
	const [editUnit, setEditUnit] = useState("");
	const [editType, setEditType] = useState("");
	const [editCategory, setEditCategory] = useState("");
	const [editSubcategory, setEditSubcategory] = useState("");
	const [editSubSubcategory, setEditSubSubcategory] = useState("");
	const [editPrices, setEditPrices] = useState<[string, number | null][]>([]);

	// Create material dialog state
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createName, setCreateName] = useState("");
	const [createUnit, setCreateUnit] = useState("");
	const [createType, setCreateType] = useState("");
	const [createCat, setCreateCat] = useState("");
	const [createSubcat, setCreateSubcat] = useState("");
	const [createSubSubcat, setCreateSubSubcat] = useState("");
	const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(
		[]
	);
	const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<
		string | null
	>(null);

	const handleButtonClick = () => {
		setSearchQuery(tempsearchQuery);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setSearchQuery(tempsearchQuery);
		}
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await getTypes();
				setCategories(data);
				if (data.length && data[0].categories.length) {
					setSelectedType(data[0].name);
					setSelectedCategory(data[0].categories[0].name);
				}
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchMaterials = async () => {
			try {
				if (tempsearchQuery.trim()) {
					const data = await searchMaterials(
						searchQuery,
						selectedSubcategory || undefined
					);
					setTempSearchQuery("");
					setMaterials(data);
				} else if (selectedCategory) {
					const data = await getMaterialsByCategory(
						selectedCategory,
						selectedSubcategory || undefined
					);
					setMaterials(data);
				}
			} catch (error) {
				console.error("Error fetching materials:", error);
			}
		};
		fetchMaterials();
	}, [selectedCategory, selectedSubcategory, searchQuery]);

	const openEditDialog = (material: Material) => {
		setEditingMaterial(material);
		setEditName(material.Name);
		setEditUnit(material.Unit);
		setEditType(material.Type || "");
		setEditCategory(material.Category.Category || "");
		setEditSubcategory(material.Category.Subcategory || "");
		setEditSubSubcategory(material.Category["Sub subcategory"] || "");
		setEditPrices(material.Prices);
		setEditDialogOpen(true);
	};

	const closeEditDialog = () => {
		setEditDialogOpen(false);
		setEditingMaterial(null);
	};

	// Create
	const openCreateDialog = () => {
		setCreateName("");
		setCreateUnit("");
		setCreateType("");
		setCreateCat("");
		setCreateSubcat("");
		setCreateSubSubcat("");
		setCreateDialogOpen(true);
	};

	const closeCreateDialog = () => {
		setCreateDialogOpen(false);
	};

	const handleCreateMaterial = async () => {
		try {
			const newMonth = new Date();
			newMonth.setMonth(newMonth.getMonth());
			newMonth.setDate(1);
			const newMonthString = newMonth.toISOString().split("T")[0] + " 00:00:00";
			const generateUUID = () => {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
					/[xy]/g,
					function (c) {
						const r = (Math.random() * 16) | 0;
						const v = c == "x" ? r : (r & 0x3) | 0x8;
						return v.toString(16);
					}
				);
			};
			await createMaterial({
				Name: createName,
				Unit: createUnit,
				Type: createType,
				Number: generateUUID(),
				Category: {
					Category: createCat,
					Subcategory: createSubcat || null,
					"Sub subcategory": createSubSubcat || null,
				},
				Prices: [[newMonthString, null]] as [string, number | null][],
				id: "",
				Qty: 0,
				Source: null,
			});
			// refetch
			const data = await getMaterialsByCategory(createCat);
			setMaterials(data);
		} catch (error) {
			console.error("Error creating material:", error);
		}
		closeCreateDialog();
	};

	// Edits
	const handleTypeChange = (value: string) => {
		setEditType(value);
		setEditCategory("");
		setEditSubcategory("");
		setEditSubSubcategory("");
	};
	const handleCategoryChange = (value: string) => {
		setEditCategory(value);
		setEditSubcategory("");
		setEditSubSubcategory("");
	};
	const handleSubcategoryChange = (value: string) => {
		setEditSubcategory(value);
		setEditSubSubcategory("");
	};
	const handleDeleteMaterial = async (materialId: string) => {
		if (window.confirm("Are you sure you want to delete this material?")) {
			try {
				await deleteMaterial(materialId);

				// Refetch materials to update the list
				if (selectedCategory) {
					const data = await getMaterialsByCategory(
						selectedCategory,
						selectedSubcategory || undefined
					);
					setMaterials(data);
				}
			} catch (error) {
				console.error("Error deleting material:", error);
				alert("Failed to delete material. Please try again.");
			}
		}
	};
	const handleEditSave = async () => {
		if (!editingMaterial) return;
		try {
			await updateMaterial(editingMaterial.Number, {
				Name: editName,
				Unit: editUnit,
				Type: editType,
				Category: {
					Category: editCategory,
					Subcategory: editSubcategory,
					"Sub subcategory": editSubSubcategory,
				},
				Prices: editPrices,
			});
			if (createCat) {
				const data = await getMaterialsByCategory(
					createCat,
					selectedSubcategory || undefined
				);
				setMaterials(data);
			} else if (selectedCategory) {
				const data = await getMaterialsByCategory(
					selectedCategory,
					selectedSubcategory || undefined
				);
				setMaterials(data);
			}
		} catch (error) {
			console.error("Error updating material:", error);
		}
		closeEditDialog();
	};

	const addNewMonthToAllMaterials = async () => {
		const newMonth = new Date();
		newMonth.setMonth(newMonth.getMonth());
		newMonth.setDate(1);
		const newMonthString = newMonth.toISOString().split("T")[0] + " 00:00:00";

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
		} catch (error) {
			console.error("Error adding new month to materials:", error);
		}
	};

	const currentType = categories.find((t) => t.name === editType);
	const currentCat = currentType?.categories?.find(
		(c) => c.name === editCategory
	);
	const currentSub = currentCat?.subcategories?.find(
		(s) => s.name === editSubcategory
	);
	const handleCategorySelection = (category: string) => {
		setSelectedCategory(category);
		setSelectedSubcategory(null);
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

	const handleSubcategorySelection = (subcategory: string) => {
		setSelectedSubcategory(subcategory);
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

	const handleSubSubcategorySelection = (subSubcategory: string) => {
		setSelectedSubSubcategory(subSubcategory);

		// Close sidebar on mobile after selection
		if (window.innerWidth < 768) {
			setShowSidebar(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<Button
				className="md:hidden bg-slate-900 mb-4"
				onClick={() => setShowSidebar(!showSidebar)}
			>
				<Menu className="h-6 w-6" />
				Categories
			</Button>
			<div className="grid gap-6 md:grid-cols-[400px_1fr]">
				<aside
					className={`space-y-4 bg-slate-900 p-4 rounded-lg text-white md:block ${
						showSidebar ? "block" : "hidden"
					}`}
				>
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
													selectedCategory === category.name ? "font-bold" : ""
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
																handleSubcategorySelection(sub.name)
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
															sub.sub_subcategories && (
																<div className="ml-8">
																	{sub.sub_subcategories.map(
																		(subSub, index) => (
																			<Button
																				// Use index for key as strings may not be unique
																				key={index}
																				variant="ghost"
																				className={`w-full justify-start pl-10 text-slate-500 hover:text-white hover:bg-slate-800 ${
																					selectedSubSubcategory === subSub.name
																						? "font-bold"
																						: ""
																				}`}
																				onClick={() =>
																					handleSubSubcategorySelection(
																						subSub.name
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

				<div className="space-y-6">
					<h1 className="text-3xl font-bold">
						Prices
						<span className="ml-2 text-xl font-normal text-gray-400">
							(Excluding VAT) (Admin)
						</span>
					</h1>
					<div className="flex items-center gap-4">
						<Input
							placeholder="Search materials..."
							className="max-w-sm"
							value={tempsearchQuery}
							onChange={(e) => setTempSearchQuery(e.target.value)}
							onKeyUp={handleKeyPress}
						/>
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
						<div>
							{/* Month Manager Button */}
							<Button variant="outline" onClick={openMonthManager}>
								Month Manager
							</Button>

							{/* Month Manager Modal */}
							<Modal isOpen={isMonthManagerOpen} onClose={closeMonthManager}>
								<MonthManager
									materials={materials}
									setMaterials={setMaterials}
								/>
							</Modal>
						</div>
						<Button variant="outline" onClick={openCreateDialog}>
							Add Material
						</Button>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{materials.length > 0 ? (
							materials.map((material) => (
								<div key={material.Number} className="relative">
									<MaterialCard
										name={material.Name}
										unit={material.Unit}
										location="National"
										rating={4}
										price={material.Prices.find((p) => p[1])?.[1] || 0}
										currency_t="LKR"
										onClick={() => setSelectedMaterial(material)}
									/>
									<div className="absolute top-2 right-2 flex gap-1">
										<Button
											variant="outline"
											size="sm"
											onClick={() => openEditDialog(material)}
										>
											Edit
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => handleDeleteMaterial(material.id)}
										>
											Delete
										</Button>
									</div>
								</div>
							))
						) : (
							<p className="text-gray-500">No materials found</p>
						)}
					</div>
				</div>
			</div>

			{/* View Material Dialog */}
			<Dialog
				open={!!selectedMaterial}
				onOpenChange={() => setSelectedMaterial(null)}
			>
				<DialogContent className="max-w-2xl">
					{selectedMaterial && (
						<div className="p-4 space-y-4 bg-white rounded-lg">
							<h2 className="text-2xl font-bold text-center mb-4">
								{selectedMaterial.Name}
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-2 text-center">
									<p className="text-gray-700 text-lg">
										Latest Price:{" "}
										<span className="text-green-600">
											$
											{selectedMaterial.Prices.find((p) => p[1])?.[1]?.toFixed(
												2
											) || 0}
										</span>
									</p>
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
								prices={selectedMaterial.Prices.map(([date, price]) => ({
									date,
									price,
								}))}
								currency="LKR"
								onClose={() => setSelectedMaterial(null)}
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* Edit Material Dialog */}
			<Dialog open={editDialogOpen} onOpenChange={closeEditDialog}>
				<DialogContent className="max-w-xl">
					<DialogHeader>
						<DialogTitle>Edit Material</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 mt-4">
						<Input
							placeholder="Material Name"
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
						/>
						<Input
							placeholder="Unit"
							value={editUnit}
							onChange={(e) => setEditUnit(e.target.value)}
						/>
						<div>
							<label className="block text-sm font-medium">Type</label>
							<select
								className="w-full border p-2 mt-1"
								value={editType}
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
							<label className="block text-sm font-medium">Category</label>
							<select
								className="w-full border p-2 mt-1"
								value={editCategory}
								onChange={(e) => handleCategoryChange(e.target.value)}
								disabled={!editType}
							>
								<option value="">-- Select Category --</option>
								{currentType?.categories &&
									currentType.categories.map((cat) => (
										<option key={cat.name} value={cat.name}>
											{cat.name}
										</option>
									))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium">Subcategory</label>
							<select
								className="w-full border p-2 mt-1"
								value={editSubcategory}
								onChange={(e) => handleSubcategoryChange(e.target.value)}
								disabled={!editCategory}
							>
								<option value="">-- Select Subcategory --</option>
								{currentCat?.subcategories &&
									currentCat.subcategories.map((sub) => (
										<option key={sub.name} value={sub.name}>
											{sub.name}
										</option>
									))}
							</select>
						</div>
						{/* <div>
              <label className="block text-sm font-medium">Sub-Subcategory</label>
              <select
                className="w-full border p-2 mt-1"
                value={editSubSubcategory}
                onChange={(e) => setEditSubSubcategory(e.target.value)}
                disabled={!editSubcategory}
              >
                <option value="">-- Select Sub-Subcategory --</option>
                {currentSub?.sub_subcategories &&
                  currentSub.sub_subcategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div> */}
						<div className="max-h-64 overflow-y-auto">
							<label className="block text-sm font-medium">Prices</label>
							{editPrices.map((price, index) => (
								<div key={index} className="flex gap-2 mt-2">
									<Input
										type="text"
										value={price[0]}
										readOnly
										className="w-1/2"
									/>
									<Input
										type="number"
										value={price[1] ?? ""}
										onChange={(e) => {
											const newPrices = [...editPrices];
											newPrices[index][1] = e.target.value
												? parseFloat(e.target.value)
												: null;
											setEditPrices(newPrices);
										}}
										className="w-1/2"
									/>
								</div>
							))}
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={closeEditDialog}>
							Cancel
						</Button>
						<Button onClick={handleEditSave}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Create Material Dialog */}
			<Dialog open={createDialogOpen} onOpenChange={closeCreateDialog}>
				<DialogContent className="max-w-xl">
					<DialogHeader>
						<DialogTitle>Add New Material</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 mt-4">
						<Input
							placeholder="Material Name"
							value={createName}
							onChange={(e) => setCreateName(e.target.value)}
						/>
						<Input
							placeholder="Unit"
							value={createUnit}
							onChange={(e) => setCreateUnit(e.target.value)}
						/>
						<div>
							<label className="block text-sm font-medium">Type</label>
							<select
								className="w-full border p-2 mt-1"
								value={createType}
								onChange={(e) => setCreateType(e.target.value)}
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
							<label className="block text-sm font-medium">Category</label>
							{createType ? (
								<select
									className="w-full border p-2 mt-1"
									value={createCat}
									onChange={(e) => setCreateCat(e.target.value)}
								>
									<option value="">-- Select Category --</option>
									{categories
										.find((ctg) => ctg.name === createType)
										?.categories.map((cat) => (
											<option key={cat.name} value={cat.name}>
												{cat.name}
											</option>
										))}
								</select>
							) : (
								<select className="w-full border p-2 mt-1" disabled>
									<option>-- Select Type First --</option>
								</select>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium">Subcategory</label>
							{createCat ? (
								<select
									className="w-full border p-2 mt-1"
									value={createSubcat}
									onChange={(e) => setCreateSubcat(e.target.value)}
								>
									<option value="">-- Select Subcategory --</option>
									{(() => {
										const foundType = categories.find(
											(t) => t.name === createType
										);
										const foundCategory = foundType?.categories.find(
											(c) => c.name === createCat
										);

										// Debug log
										console.log("Found Type:", foundType);
										console.log("Found Category:", foundCategory);
										console.log("Subcategories:", foundCategory?.subcategories);

										return (
											foundCategory?.subcategories?.map((sub) => (
												<option key={sub.name} value={sub.name}>
													{sub.name}
												</option>
											)) || []
										);
									})()}
								</select>
							) : (
								<select className="w-full border p-2 mt-1" disabled>
									<option>-- Select Category First --</option>
								</select>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium">
								Sub-Subcategory
							</label>
							{createSubcat ? (
								<select
									className="w-full border p-2 mt-1"
									value={createSubSubcat}
									onChange={(e) => setCreateSubSubcat(e.target.value)}
								>
									<option value="">-- Select Sub-Subcategory --</option>
									{(() => {
										try {
											const foundType = categories.find(
												(t) => t.name === createType
											);
											const foundCategory = foundType?.categories.find(
												(c) => c.name === createCat
											);
											const foundSubcategory =
												foundCategory?.subcategories?.find(
													(s) => s.name === createSubcat
												);

											// Quick fix: Check if sub_subcategories exists and is an array
											const subSubcategories = (foundSubcategory as any)
												?.sub_subcategories;

											if (Array.isArray(subSubcategories)) {
												return subSubcategories.map(
													(subsub: any, index: number) => {
														// Handle both string and object cases
														const value =
															typeof subsub === "string"
																? subsub
																: subsub?.name || subsub;
														const displayName =
															typeof subsub === "string"
																? subsub
																: subsub?.name || subsub;

														return (
															<option key={index} value={value}>
																{displayName}
															</option>
														);
													}
												);
											}

											return (
												<option disabled>No sub-subcategories available</option>
											);
										} catch (error) {
											console.error(
												"Error rendering sub-subcategories:",
												error
											);
											return (
												<option disabled>
													Error loading sub-subcategories
												</option>
											);
										}
									})()}
								</select>
							) : (
								<select className="w-full border p-2 mt-1" disabled>
									<option>-- Select Subcategory First --</option>
								</select>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={closeCreateDialog}>
							Cancel
						</Button>
						<Button onClick={handleCreateMaterial}>Create</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
export default withRoleGuard(AdminDashboard, ["admin"]);
