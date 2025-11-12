import { Dispatch, FormEvent, SetStateAction } from "react";
import { Professional, ProfessionalWithRecord } from "@/types";
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
import {
	Pencil,
	Search,
	Eye,
	EyeClosed,
	User,
	Check,
	Ban,
	RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EditProfessionalDialog from "./edit-professional-dialog";
import ViewProfessionalDialog from "./view-professional-dialog";
import { TooltipButton } from "../common/TooltipButton";

interface AdminProfessionalManageTableProps {
	title: string;
	description: string;
	filteredProfessionals: ProfessionalWithRecord[];
	selectedProfessional: Professional | null;
	setSelectedProfessional: Dispatch<SetStateAction<Professional | null>>;
	professionalSearch: string;
	setProfessionalSearch: Dispatch<SetStateAction<string>>;
	handleProfessionalVisibility?: (id: string, currentStatus: string) => void;
	handleProfessionalEdit?: (e: FormEvent<HTMLFormElement>) => void;
	handleProfessionalSuspend?: (id: string) => void;
	handleProfessionalApprove?: (id: string) => void;
	handleProfessionalView?: (professional: Professional) => Promise<void>;
	handleProfessionalRecovery?: (id: string) => void;
	setEditDialogOpen?: Dispatch<SetStateAction<boolean>>;
	setViewDialogOpen?: Dispatch<SetStateAction<boolean>>;
	editDialogOpen?: boolean;
	viewDialogOpen?: boolean;
}

export default function AdminProfessionalManageTable(
	props: AdminProfessionalManageTableProps
) {
	const {
		title,
		description,
		filteredProfessionals,
		selectedProfessional,
		setSelectedProfessional,
		professionalSearch,
		setProfessionalSearch,
		handleProfessionalVisibility,
		handleProfessionalEdit,
		handleProfessionalSuspend,
		handleProfessionalApprove,
		handleProfessionalView,
		handleProfessionalRecovery,
		setEditDialogOpen,
		setViewDialogOpen,
		editDialogOpen,
		viewDialogOpen,
	} = props;
	return (
		<>
			{" "}
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<div>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
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
								{filteredProfessionals.map(
									(professionalWithRecord: ProfessionalWithRecord) => {
										const professional = professionalWithRecord.professional;
										return (
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
													<Badge variant="default">{professional.status.toUpperCase()}</Badge>
												</TableCell>
												<TableCell>⭐ 4.0</TableCell>
												<TableCell className="text-right space-x-2">
													{handleProfessionalVisibility && (
														<TooltipButton
															variant="ghost"
															size="icon"
															onClick={(event) => {
																handleProfessionalVisibility(
																	professional.id,
																	professional.status
																);
															}}
															tooltip={"Change Visibility"}
														>
															{professional.status === "hidden" ? (
																<EyeClosed className="h-4 w-4" />
															) : (
																<Eye className="h-4 w-4" />
															)}
														</TooltipButton>
													)}
													{handleProfessionalView && (
														<TooltipButton
															tooltip="View"
															variant="ghost"
															size="icon"
															onClick={() =>
																handleProfessionalView(professional)
															}
														>
															<User className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleProfessionalApprove && (
														<TooltipButton
															tooltip="Approve"
															variant="ghost"
															size="icon"
															onClick={() =>
																handleProfessionalApprove(professional.id)
															}
														>
															<Check className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleProfessionalEdit && setEditDialogOpen && (
														<TooltipButton
															tooltip="edit"
															variant="ghost"
															size="icon"
															onClick={() => {
																setSelectedProfessional(professional),
																	setEditDialogOpen(true);
															}}
														>
															<Pencil className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleProfessionalSuspend && (
														<TooltipButton
															tooltip="Suspend"
															variant="ghost"
															size="icon"
															className="text-destructive"
															onClick={() =>
																handleProfessionalSuspend(professional.id)
															}
														>
															<Ban className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleProfessionalRecovery && (
														<TooltipButton
															tooltip="Recover"
															variant="ghost"
															size="icon"
															onClick={() =>
																handleProfessionalRecovery(professional.id)
															}
														>
															<RotateCcw className="h-4 w-4" />
														</TooltipButton>
													)}
												</TableCell>
											</TableRow>
										);
									}
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
			{editDialogOpen &&
				selectedProfessional &&
				setEditDialogOpen &&
				handleProfessionalEdit && (
					<EditProfessionalDialog
						selectedProfessional={selectedProfessional}
						dialogOpen={editDialogOpen}
						setDialogOpen={setEditDialogOpen}
						handleProfessionalEdit={handleProfessionalEdit}
					/>
				)}
			{selectedProfessional && viewDialogOpen && setViewDialogOpen && (
				<ViewProfessionalDialog
					selectedProfessional={selectedProfessional}
					dialogOpen={viewDialogOpen}
					setDialogOpen={setViewDialogOpen}
				/>
			)}
		</>
	);
}
