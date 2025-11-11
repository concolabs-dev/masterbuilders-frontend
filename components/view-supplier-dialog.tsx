"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SupplierProfile } from "./supplier-profile";
import { SupplierItemList } from "./supplier-item-list";
import { Dispatch, SetStateAction } from "react";
import { Item, Supplier } from "@/types";

interface ViewSupplierDialogProps {
	dialogOpen: boolean;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	selectedSupplier: Supplier;
	supplierItems: Item[] | undefined;
}

export default function ViewSupplierDialog(props: ViewSupplierDialogProps) {
	const { dialogOpen, setDialogOpen, selectedSupplier, supplierItems } = props;
	return (
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
	);
}
