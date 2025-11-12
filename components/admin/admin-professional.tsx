import { useState } from "react";
import {
	getAllProfessionals,
	getProfessionals,
	updateProfessional,
} from "@/app/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Professional } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminProfessionalManageTable from "./admin-professional-manage-table";

export default function AdminProfessionalTab() {
	const [selectedProfessional, setSelectedProfessional] =
		useState<Professional | null>(null);
	const [professionalSearch, setProfessionalSearch] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string[]>([
		"hidden",
		"approved",
	]);
	const [viewDialogOpen, setViewDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	const { data: professionals = [], isLoading: professionalsLoading } =
		useQuery({
			queryKey: ["professionals"],
			queryFn: getAllProfessionals,
		});

	const queryClient = useQueryClient();

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

	const handleProfessionalVisibility = (id: string, currentStatus: string) => {
		// Toggle between hidden and approved
		const newStatus = currentStatus === "hidden" ? "approved" : "hidden";

		updateProfessionalMutation.mutate({
			id: id,
			professional: {
				status: newStatus,
			},
		});
	};

	const handleProfessionalSuspend = (id: string) => {
		updateProfessionalMutation.mutate({
			id: id,
			professional: {
				status: "suspended",
			},
		});
	};

	const handleProfessionalRecovery = (id: string) => {
		updateProfessionalMutation.mutate({
			id: id,
			professional: {
				status: "pending",
			},
		});
	};

	const handleProfessionalApprove = (id: string) => {
		updateProfessionalMutation.mutate({
			id: id,
			professional: {
				status: "approved",
			},
		});
	};

	const handleViewProfile = async (professional: Professional) => {
		setSelectedProfessional(professional);
		setViewDialogOpen(true);
	};

	const filteredProfessionals = (professionals || []).filter(
		(professionalWithRecord) => {
			const professional = professionalWithRecord.professional;

			// Search filter
			const matchesSearch =
				professional?.company_name
					?.toLowerCase()
					.includes(professionalSearch.toLowerCase()) ||
				professional?.email
					?.toLowerCase()
					.includes(professionalSearch.toLowerCase()) ||
				professional?.company_type
					?.toLowerCase()
					.includes(professionalSearch.toLowerCase());

			// Status filter
			const matchesStatus =
				statusFilter.includes("all") ||
				statusFilter.includes(professional?.status || "");

			return matchesSearch && matchesStatus;
		}
	);

	const handleProfessionalEdit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (selectedProfessional) {
			const formData = new FormData(e.currentTarget);
			const updatedProfessional: Partial<Professional> = {
				company_name: formData.get("company_name") as string,
				email: formData.get("email") as string,
				telephone_number: formData.get("telephone_number") as string,
				address: formData.get("address") as string,
				company_type: formData.get("company_type") as string,
				company_description: formData.get("company_description") as string,
			};
			updateProfessionalMutation.mutate({
				id: selectedProfessional.id,
				professional: updatedProfessional,
			});
			setSelectedProfessional(null);
		}
	};

	return (
		<Tabs defaultValue="approved">
			<TabsList>
				<TabsTrigger
					value="approved"
					onClick={() => setStatusFilter(["hidden", "approved"])}
				>
					Approved (
					{
						professionals.filter((s) =>
							["hidden", "approved"].includes(s.professional?.status)
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
						professionals.filter((s) =>
							["active"].includes(s.professional?.status)
						).length
					}
					)
				</TabsTrigger>
				<TabsTrigger
					value="suspended"
					onClick={() => setStatusFilter(["suspended"])}
				>
					Suspended (
					{
						professionals.filter((s) =>
							["suspended"].includes(s.professional?.status)
						).length
					}
					)
				</TabsTrigger>
			</TabsList>
			<TabsContent value="approved">
				<h2 className="text-xl font-semibold mb-4">
					Approved & Hiddden Professionals
				</h2>
				<AdminProfessionalManageTable
					title="Professionals & Hidden"
					description="Manage approved & hidden professionals and their accounts."
					filteredProfessionals={filteredProfessionals}
					professionalSearch={professionalSearch}
					selectedProfessional={selectedProfessional}
					editDialogOpen={editDialogOpen}
					setProfessionalSearch={setProfessionalSearch}
					setSelectedProfessional={setSelectedProfessional}
					handleProfessionalVisibility={handleProfessionalVisibility}
					handleProfessionalSuspend={handleProfessionalSuspend}
					handleProfessionalEdit={handleProfessionalEdit}
					setEditDialogOpen={setEditDialogOpen}
				/>
			</TabsContent>
			<TabsContent value="pending">
				<h2 className="text-xl font-semibold mb-4">Pending Professionals</h2>
				<AdminProfessionalManageTable
					title="Professionals"
					description="Manage pending professionals and their accounts."
					filteredProfessionals={filteredProfessionals}
					professionalSearch={professionalSearch}
					selectedProfessional={selectedProfessional}
					viewDialogOpen={viewDialogOpen}
					editDialogOpen={editDialogOpen}
					setSelectedProfessional={setSelectedProfessional}
					setProfessionalSearch={setProfessionalSearch}
					handleProfessionalView={handleViewProfile}
					handleProfessionalSuspend={handleProfessionalSuspend}
					handleProfessionalEdit={handleProfessionalEdit}
					handleProfessionalApprove={handleProfessionalApprove}
					setViewDialogOpen={setViewDialogOpen}
					setEditDialogOpen={setEditDialogOpen}
				/>
			</TabsContent>
			<TabsContent value="suspended">
				<h2 className="text-xl font-semibold mb-4">Suspended Professionals</h2>
				<AdminProfessionalManageTable
					title="Professionals"
					description="Manage suspended professionals and their accounts."
					filteredProfessionals={filteredProfessionals}
					professionalSearch={professionalSearch}
					selectedProfessional={selectedProfessional}
					viewDialogOpen={viewDialogOpen}
					editDialogOpen={editDialogOpen}
					setSelectedProfessional={setSelectedProfessional}
					setProfessionalSearch={setProfessionalSearch}
					handleProfessionalView={handleViewProfile}
					handleProfessionalEdit={handleProfessionalEdit}
					handleProfessionalRecovery={handleProfessionalRecovery}
					setViewDialogOpen={setViewDialogOpen}
					setEditDialogOpen={setEditDialogOpen}
				/>
			</TabsContent>
		</Tabs>
	);
}
