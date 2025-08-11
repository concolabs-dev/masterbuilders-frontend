"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";

declare const payhere: any;

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

interface PaymentPortalProps {
  request: Payment;
}

export function PaymentPortal({ request }: PaymentPortalProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePay = async () => {
    const res = await fetch("/api/payment/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const payment = await res.json();
    payhere.onCompleted = function onCompleted(orderId: string) {
      console.log("Payment completed. OrderID:" + orderId);
    };

    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    payhere.onError = function onError(error: string) {
      console.log("Error:" + error);
    };
    payhere.startPayment(payment);
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handlePay}>Pay Now</Button>
    </div>
  );
}
