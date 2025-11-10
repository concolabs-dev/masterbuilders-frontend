import { useEffect, useState } from "react";
import {
	getPaymentRecords,
	getSupplierByPPID,
	getItemsBySupplier,
	updatePaymentRecord,
	getSuppliers,
	deleteSupplier,
	updateSupplierStatus,
} from "@/app/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SupplierProfile } from "@/components/supplier-profile";
import { SupplierItemList } from "@/components/supplier-item-list";
import { Item, SupplierWithRecord, Supplier } from "@/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AdminSuppliersTabProps {}

function AdminSuppliersTab(props: AdminSuppliersTabProps) {
	const [supplierSearch, setSupplierSearch] = useState("");
	const [approvedList, setApprovedList] = useState<SupplierWithRecord[]>([]);
	const [notApprovedList, setNotApprovedList] = useState<SupplierWithRecord[]>(
		[]
	);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
		null
	);
	const [supplierItems, setSupplierItems] = useState<Item[]>([]);

	const { data: suppliers = [], isLoading: suppliersLoading } = useQuery({
		queryKey: ["suppliers"],
		queryFn: getSuppliers,
	});

	const queryClient = useQueryClient();

	const deleteSupplierMutation = useMutation({
		mutationFn: deleteSupplier,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
	});

	const statusChnageSupplierMutation = useMutation({
		mutationFn: updateSupplierStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
	});

	// Update the delete handlers
	const handleDeleteSupplier = (id: string) => {
		if (window.confirm("Are you sure you want to delete this supplier?")) {
			deleteSupplierMutation.mutate(id);
		}
	};

	const handleInactiveSupplier = (id: string) => {
		statusChnageSupplierMutation.mutate(id);
	};

	const fetchSuppliers = async () => {
		try {
			const paymentRecords = await getPaymentRecords();
			const approved: SupplierWithRecord[] = [];
			const notApproved: SupplierWithRecord[] = [];

			for (const record of paymentRecords) {
				let supplier = await getSupplierByPPID(record.pid);
				if (!supplier) {
					throw new Error("Supplier not found");
				}

				if (record.approved) {
					approved.push({ supplier, record });
				} else {
					notApproved.push({ supplier, record });
				}
			}
			setApprovedList(approved);
			setNotApprovedList(notApproved);
		} catch (error) {
			console.error("Error fetching suppliers:", error);
		}
	};

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const toggleApproval = async (recordId: string, newStatus: boolean) => {
		try {
			await updatePaymentRecord(recordId, { approved: newStatus });
			fetchSuppliers();
		} catch (error) {
			console.error("Error updating approval:", error);
		}
	};

	const handleViewProfile = async (supplier: Supplier) => {
		setSelectedSupplier(supplier);
		try {
			if (supplier.pid) {
				const items = await getItemsBySupplier(supplier.pid);
				setSupplierItems(items);
			}
		} catch (error) {
			console.error("Error fetching supplier items:", error);
		}
		setDialogOpen(true);
	};

	const filteredSuppliers = (suppliers || []).filter(
		(supplier) =>
			supplier?.business_name
				?.toLowerCase()
				.includes(supplierSearch.toLowerCase()) ||
			supplier?.email?.toLowerCase().includes(supplierSearch.toLowerCase()) ||
			supplier?.address?.toLowerCase().includes(supplierSearch.toLowerCase())
	);

	const renderTable = (list: SupplierWithRecord[], approved: boolean) => (
		<table className="min-w-full">
			<thead>
				<tr>
					<th className="p-2 text-left">Business Name</th>
					<th className="p-2 text-left">Email</th>
					<th className="p-2 text-left">Telephone</th>
					<th className="p-2 text-left"></th>
				</tr>
			</thead>
			<tbody>
				{list.map(({ supplier, record }) => (
					<tr key={supplier.id} className="border-b">
						<td className="p-2">{supplier.business_name}</td>
						<td className="p-2">{supplier.email}</td>
						<td className="p-2">{supplier.telephone}</td>
						<td className="p-2 flex gap-2">
							<Button
								variant="outline"
								onClick={() => toggleApproval(record.id, !approved)}
							>
								{approved ? "Revoke" : "Approve"}
							</Button>
							<Button
								variant="outline"
								onClick={() => handleViewProfile(supplier)}
							>
								View Profile
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	return (
		<>
			<Tabs defaultValue="approved">
				<TabsList>
					<TabsTrigger value="approved">Approved</TabsTrigger>
					<TabsTrigger value="notApproved">Not Approved</TabsTrigger>
				</TabsList>
				<TabsContent value="approved">
					<h2 className="text-xl font-semibold mb-4">Approved Suppliers</h2>
					{renderTable(approvedList, true)}
				</TabsContent>
				<TabsContent value="notApproved">
					<h2 className="text-xl font-semibold mb-4">Not Approved Suppliers</h2>
					{renderTable(notApprovedList, false)}
				</TabsContent>
			</Tabs>

			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<div>
							<CardTitle>Suppliers</CardTitle>
							<CardDescription>
								Manage registered suppliers and their accounts.
							</CardDescription>
						</div>
						<div className="flex items-center space-x-2">
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search suppliers..."
									value={supplierSearch}
									onChange={(e) => setSupplierSearch(e.target.value)}
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
									<TableHead>Products</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Rating</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredSuppliers.map((supplier: Supplier) => (
									<TableRow key={supplier.id}>
										<TableCell className="font-medium">
											{supplier.business_name}
										</TableCell>
										<TableCell>
											<div className="text-sm">
												<div>{supplier.email}</div>
												<div className="text-muted-foreground">
													{supplier.telephone}
												</div>
											</div>
										</TableCell>
										<TableCell>{supplier.address}</TableCell>
										<TableCell>
											<Badge variant="outline">Business</Badge>
										</TableCell>
										<TableCell>
											<Badge variant="outline">PID: {supplier.pid}</Badge>
										</TableCell>
										<TableCell>
											{<Badge variant="default">Active</Badge>}
										</TableCell>
										<TableCell>⭐ 4.0</TableCell>
										<TableCell className="text-right space-x-2">
											<Button
												variant="ghost"
												size="icon"
												onClick={(event) => {
													console.log("Clicked:", selectedSupplier);
													handleInactiveSupplier(supplier.pid);
												}}
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => setSelectedSupplier(supplier)}
											>
												<Pencil className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="text-destructive"
												onClick={() => handleDeleteSupplier(supplier.id)}
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

			<Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
				<DialogContent>
					{selectedSupplier && (
						<>
							<SupplierProfile
								supplier={{
									id: selectedSupplier.id,
									name: selectedSupplier.business_name,
									email: selectedSupplier.email,
									telephone: selectedSupplier.telephone,
									address: selectedSupplier.address,
									location: {
										lat: selectedSupplier.location.latitude.toString(),
										lng: selectedSupplier.location.longitude.toString(),
									},
									profileImage: selectedSupplier.profile_pic_url,
									coverImage: selectedSupplier.cover_pic_url,
									description: selectedSupplier.business_description,
								}}
								admin={false}
							/>
							<div className="mt-6">
								<h3 className="text-lg font-semibold">Items</h3>
								{supplierItems && (
									<SupplierItemList
										items={supplierItems}
										onEdit={() => {}}
										onDelete={() => {}}
										admin={false}
										displayCurrency="Rs."
									/>
								)}
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

export default AdminSuppliersTab;
