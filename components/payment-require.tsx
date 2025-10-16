"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Package, PaymentContainer } from "@concolabs-dev/payment";

interface RequirePaymentProps {
	open: boolean;
	packageTypes: Package[];
	puid: string;
	successUrl: string;
	onOpenChange: (bool: boolean) => void;
}

export function RequirePaymentDialog({
	open,
	packageTypes,
	puid,
	successUrl,
	onOpenChange,
}: RequirePaymentProps) {
	return (
		<Dialog open={open} onOpenChange={() => onOpenChange(false)}>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle>Pay to Continue The Service</DialogTitle>
				</DialogHeader>
				<Label>
					Your trial period has ended. Please upgrade your plan within 7 days to
					ensure uninterrupted access to the service.
				</Label>
				<PaymentContainer
					backendUrl={process.env.NEXT_PUBLIC_PAYMENT_API_URL || ""}
					cancelUrl={process.env.NEXT_PUBLIC_FRONTEND_API_URL || ""}
					successUrl={successUrl}
					packageList={packageTypes}
					stripekey={process.env.NEXT_PUBLIC_STRIPE_SECRET || ""}
					puid={puid}
					code={"BML"}
				/>
			</DialogContent>
		</Dialog>
	);
}
