import { useState } from "react";
import { getItemsBySupplier, getAllSuppliers, updateSupplier } from "@/app/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Item, Supplier } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminManageTable from "./admin-manage-table";

interface AdminSuppliersTabProps {}

function AdminSuppliersTab(props: AdminSuppliersTabProps) {
	const [supplierSearch, setSupplierSearch] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string[]>([
		"hidden",
		"approved",
	]);
	const [viewDialogOpen, setViewDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
		null
	);
	const [supplierItems, setSupplierItems] = useState<Item[]>([]);

	const { data: suppliers = [], isLoading: suppliersLoading } = useQuery({
		queryKey: ["suppliers"],
		queryFn: getAllSuppliers,
	});

	const queryClient = useQueryClient();

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

	const handleSupplierVisibility = (id: string, currentStatus: string) => {
		// Toggle between hidden and approved
		const newStatus = currentStatus === "hidden" ? "approved" : "hidden";

		updateSupplierMutation.mutate({
			id: id,
			supplier: {
				status: newStatus,
			},
		});
	};

	const handleSupplierSuspend = (id: string) => {
		updateSupplierMutation.mutate({
			id: id,
			supplier: {
				status: "suspended",
			},
		});
	};

	const handleSupplierRecovery = (id: string) => {
		updateSupplierMutation.mutate({
			id: id,
			supplier: {
				status: "pending",
			},
		});
	};

	const handleSupplierApprove = (id: string) => {
		updateSupplierMutation.mutate({
			id: id,
			supplier: {
				status: "approved",
			},
		});
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
		setViewDialogOpen(true);
	};

	const filteredSuppliers = (suppliers || []).filter((supplierWithRecord) => {
		const supplier = supplierWithRecord.supplier;

		// Search filter
		const matchesSearch =
			supplier?.business_name
				?.toLowerCase()
				.includes(supplierSearch.toLowerCase()) ||
			supplier?.email?.toLowerCase().includes(supplierSearch.toLowerCase()) ||
			supplier?.address?.toLowerCase().includes(supplierSearch.toLowerCase());

		// Status filter
		const matchesStatus =
			statusFilter.includes("all") ||
			statusFilter.includes(supplier?.status || "");

		return matchesSearch && matchesStatus;
	});

	const handleSupplierEdit = (e: React.FormEvent<HTMLFormElement>) => {
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

	return (
		<>
			<Tabs defaultValue="approved">
				<TabsList>
					<TabsTrigger
						value="approved"
						onClick={() => setStatusFilter(["hidden", "approved"])}
					>
						Approved (
						{
							suppliers.filter((s) =>
								["hidden", "approved"].includes(s.supplier.status)
							).length
						}
						)
					</TabsTrigger>
					<TabsTrigger
						value="pending"
						onClick={() => setStatusFilter(["active"])}
					>
						Not Approved (
						{
							suppliers.filter((s) => ["active"].includes(s.supplier.status))
								.length
						}
						)
					</TabsTrigger>
					<TabsTrigger
						value="suspended"
						onClick={() => setStatusFilter(["suspended"])}
					>
						Suspended (
						{
							suppliers.filter((s) => ["suspended"].includes(s.supplier.status))
								.length
						}
						)
					</TabsTrigger>
				</TabsList>
				<TabsContent value="approved">
					<h2 className="text-xl font-semibold mb-4">
						Approved & Hiddden Suppliers
					</h2>
					<AdminManageTable
						title="Suppliers & Hidden"
						description="Manage approved & hidden suppliers and their accounts."
						filteredSuppliers={filteredSuppliers}
						supplierSearch={supplierSearch}
						selectedSupplier={selectedSupplier}
						editDialogOpen={editDialogOpen}
						setSupplierSearch={setSupplierSearch}
						setSelectedSupplier={setSelectedSupplier}
						handleSupplierVisibility={handleSupplierVisibility}
						handleSupplierSuspend={handleSupplierSuspend}
						handleSupplierEdit={handleSupplierEdit}
						setEditDialogOpen={setEditDialogOpen}
					/>
				</TabsContent>
				<TabsContent value="pending">
					<h2 className="text-xl font-semibold mb-4">Pending Suppliers</h2>
					<AdminManageTable
						title="Suppliers"
						description="Manage pending suppliers and their accounts."
						filteredSuppliers={filteredSuppliers}
						supplierSearch={supplierSearch}
						selectedSupplier={selectedSupplier}
						viewDialogOpen={viewDialogOpen}
						editDialogOpen={editDialogOpen}
						supplierItems={supplierItems}
						setSelectedSupplier={setSelectedSupplier}
						setSupplierSearch={setSupplierSearch}
						handleSupplierView={handleViewProfile}
						handleSupplierSuspend={handleSupplierSuspend}
						handleSupplierEdit={handleSupplierEdit}
						handleSupplierApprove={handleSupplierApprove}
						setViewDialogOpen={setViewDialogOpen}
						setEditDialogOpen={setEditDialogOpen}
					/>
				</TabsContent>
				<TabsContent value="suspended">
					<h2 className="text-xl font-semibold mb-4">Suspended Suppliers</h2>
					<AdminManageTable
						title="Suppliers"
						description="Manage suspended suppliers and their accounts."
						filteredSuppliers={filteredSuppliers}
						supplierSearch={supplierSearch}
						selectedSupplier={selectedSupplier}
						viewDialogOpen={viewDialogOpen}
						editDialogOpen={editDialogOpen}
						supplierItems={supplierItems}
						setSelectedSupplier={setSelectedSupplier}
						setSupplierSearch={setSupplierSearch}
						handleSupplierView={handleViewProfile}
						handleSupplierEdit={handleSupplierEdit}
						handleSupplierRecovery={handleSupplierRecovery}
						setViewDialogOpen={setViewDialogOpen}
						setEditDialogOpen={setEditDialogOpen}
					/>
				</TabsContent>
			</Tabs>
		</>
	);
}

export default AdminSuppliersTab;
