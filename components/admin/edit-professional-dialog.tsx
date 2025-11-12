"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Professional } from "@/types";
import { Dispatch, FormEvent, SetStateAction } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { PROFESSIONAL_TYPES } from "@/lib/constants";

interface EditProfessionalDialogProps {
	dialogOpen: boolean;
	selectedProfessional: Professional;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	handleProfessionalEdit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function EditProfessionalDialog(
	props: EditProfessionalDialogProps
) {
	const {
		selectedProfessional,
		dialogOpen,
		setDialogOpen,
		handleProfessionalEdit,
	} = props;
	return (
		<Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Edit Professional</DialogTitle>
					<DialogDescription>
						Update professional information and account status.
					</DialogDescription>
				</DialogHeader>
				<div className="flex-1 overflow-y-auto px-6">
					{" "}
					<form onSubmit={handleProfessionalEdit}>
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
									<Select
										name="company_type"
										defaultValue={selectedProfessional?.company_type}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{PROFESSIONAL_TYPES.map((type) => (
												<SelectItem key={type} value={type}>
													{type}
												</SelectItem>
											))}
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
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Update Professional</Button>
						</DialogFooter>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
