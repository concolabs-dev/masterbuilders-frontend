"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Button } from "./ui/button";
import { stripeCheckout, webhooksCheckout } from "@/app/api";

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

type props = {
  priceId: string;
  pid: string;
};

export function PaymentPortal({ priceId, pid }: props) {
  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    if (!stripe) {
      return;
    }
    try {
      await stripeCheckout(priceId, pid).then(async (response) => {
        if (response) {
          if (!response.ok) throw new Error("Something went wrong");
          await stripe.redirectToCheckout({
            sessionId: response.result.id,
          });
          console.log("Professional created successfully with payment");
        }
      });
    } catch (err) {
      console.error("Failed to create professional with payment", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handlePay}>Pay Now</Button>
    </div>
  );
}
