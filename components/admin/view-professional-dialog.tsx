"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProfessionalProfile } from "../professional-profile";
import { Dispatch, SetStateAction } from "react";
import { Item, Professional } from "@/types";

interface ViewProfessionalDialogProps {
	dialogOpen: boolean;
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
	selectedProfessional: Professional;
}

export default function ViewProfessionalDialog(props:ViewProfessionalDialogProps){
	const { dialogOpen, setDialogOpen, selectedProfessional } = props;
	return (
		<Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
			<DialogContent>
				{selectedProfessional && (
					<>
						<ProfessionalProfile
							professional={selectedProfessional}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}