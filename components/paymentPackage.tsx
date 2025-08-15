"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentPortal } from "@/components/paymentPortal";

interface Payment {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  order_id: string;
  items: string;
  currency: string;
  amount: string;
}

interface PaymentPackageBoxProps {
  title: string;
  description?: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  request: Payment;
}

export function PaymentPackage({
  title,
  description,
  price,
  features,
  highlighted = false,
  request,
}: PaymentPackageBoxProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md border shadow-md transition-all hover:shadow-lg",
        highlighted ? "border-primary ring-2 ring-primary" : ""
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">{price}</div>
        <ul className="space-y-2 text-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <PaymentPortal request={request} />
      </CardFooter>
    </Card>
  );
}
