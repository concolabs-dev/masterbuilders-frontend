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
import { Supplier } from "@/types";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface EditSupplierDialogProps {
	dialogOpen: boolean;
	selectedSupplier: Supplier;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	handleSupplierEdit: ((e: FormEvent<HTMLFormElement>) => void);
}

export default function EditSupplierDialog(props: EditSupplierDialogProps) {
	const {
		selectedSupplier,
		dialogOpen,
		setDialogOpen,
		handleSupplierEdit,
	} = props;
	return (
		<Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Edit Supplier</DialogTitle>
					<DialogDescription>
						Update supplier information and account status.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSupplierEdit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="supplier-business-name">Business Name</Label>
								<Input
									id="supplier-business-name"
									name="business_name"
									defaultValue={selectedSupplier?.business_name}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="supplier-email">Email</Label>
								<Input
									id="supplier-email"
									name="email"
									type="email"
									defaultValue={selectedSupplier?.email}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="supplier-telephone">Phone</Label>
								<Input
									id="supplier-telephone"
									name="telephone"
									defaultValue={selectedSupplier?.telephone}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="supplier-address">Address</Label>
								<Input
									id="supplier-address"
									name="address"
									defaultValue={selectedSupplier?.address}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="supplier-description">Business Description</Label>
							<Textarea
								id="supplier-description"
								name="business_description"
								defaultValue={selectedSupplier?.business_description}
								placeholder="Business description..."
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
						<Button type="submit">Update Supplier</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
