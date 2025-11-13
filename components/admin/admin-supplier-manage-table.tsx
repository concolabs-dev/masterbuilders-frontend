import { Dispatch, FormEvent, SetStateAction } from "react";
import { Item, Supplier, SupplierWithRecord } from "@/types";
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
import EditSupplierDialog from "./edit-supplier-dialog";
import ViewSupplierDialog from "./view-supplier-dialog";
import { TooltipButton } from "../common/TooltipButton";

interface AdminSupplierManageTableProps {
	title: string;
	description: string;
	filteredSuppliers: SupplierWithRecord[];
	selectedSupplier: Supplier | null;
	setSelectedSupplier: Dispatch<SetStateAction<Supplier | null>>;
	supplierSearch: string;
	setSupplierSearch: Dispatch<SetStateAction<string>>;
	handleSupplierVisibility?: (id: string, currentStatus: string) => void;
	handleSupplierEdit?: (e: FormEvent<HTMLFormElement>) => void;
	handleSupplierSuspend?: (id: string) => void;
	handleSupplierApprove?: (id: string) => void;
	handleSupplierView?: (supplier: Supplier) => Promise<void>;
	handleSupplierRecovery?: (id: string) => void;
	supplierItems?: Item[];
	setEditDialogOpen?: Dispatch<SetStateAction<boolean>>;
	setViewDialogOpen?: Dispatch<SetStateAction<boolean>>;
	editDialogOpen?: boolean;
	viewDialogOpen?: boolean;
}

export default function AdminSupplierManageTable(
	props: AdminSupplierManageTableProps
) {
	const {
		title,
		description,
		filteredSuppliers,
		selectedSupplier,
		setSelectedSupplier,
		handleSupplierVisibility,
		handleSupplierEdit,
		handleSupplierSuspend,
		handleSupplierApprove,
		handleSupplierView,
		handleSupplierRecovery,
		supplierSearch,
		setSupplierSearch,
		supplierItems,
		editDialogOpen,
		viewDialogOpen,
		setViewDialogOpen,
		setEditDialogOpen,
	} = props;
	return (
		<>
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
								{filteredSuppliers.map(
									(supplierWithRecord: SupplierWithRecord) => {
										const supplier = supplierWithRecord.supplier;
										return (
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
													<Badge variant="default">
														{supplier.status.toUpperCase()}
													</Badge>
												</TableCell>
												<TableCell>⭐ 4.0</TableCell>
												<TableCell className="text-right space-x-2">
													{handleSupplierVisibility && (
														<TooltipButton
															variant="ghost"
															size="icon"
															onClick={(event) => {
																handleSupplierVisibility(
																	supplier.id,
																	supplier.status
																);
															}}
															tooltip={"Change Visibility"}
														>
															{supplier.status === "hidden" ? (
																<EyeClosed className="h-4 w-4" />
															) : (
																<Eye className="h-4 w-4" />
															)}
														</TooltipButton>
													)}
													{handleSupplierView && (
														<TooltipButton
															tooltip="View"
															variant="ghost"
															size="icon"
															onClick={() => handleSupplierView(supplier)}
														>
															<User className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleSupplierApprove && (
														<TooltipButton
															tooltip="Approve"
															variant="ghost"
															size="icon"
															onClick={() => handleSupplierApprove(supplier.id)}
														>
															<Check className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleSupplierEdit && setEditDialogOpen && (
														<TooltipButton
															tooltip="edit"
															variant="ghost"
															size="icon"
															onClick={() => {
																setSelectedSupplier(supplier),
																	setEditDialogOpen(true);
															}}
														>
															<Pencil className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleSupplierSuspend && (
														<TooltipButton
															tooltip="Suspend"
															variant="ghost"
															size="icon"
															className="text-destructive"
															onClick={() => handleSupplierSuspend(supplier.id)}
														>
															<Ban className="h-4 w-4" />
														</TooltipButton>
													)}
													{handleSupplierRecovery && (
														<TooltipButton
															tooltip="Recover"
															variant="ghost"
															size="icon"
															onClick={() =>
																handleSupplierRecovery(supplier.id)
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
				selectedSupplier &&
				setEditDialogOpen &&
				handleSupplierEdit && (
					<EditSupplierDialog
						selectedSupplier={selectedSupplier}
						dialogOpen={editDialogOpen}
						setDialogOpen={setEditDialogOpen}
						handleSupplierEdit={handleSupplierEdit}
					/>
				)}
			{selectedSupplier && viewDialogOpen && setViewDialogOpen && (
				<ViewSupplierDialog
					selectedSupplier={selectedSupplier}
					dialogOpen={viewDialogOpen}
					setDialogOpen={setViewDialogOpen}
					supplierItems={supplierItems}
				/>
			)}
		</>
	);
}
