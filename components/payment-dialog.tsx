
"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Building, Smartphone } from "lucide-react"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  onPayment: (paymentData: any) => void
}

export function PaymentDialog({ open, onOpenChange, amount, onPayment }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onPayment({
      method: paymentMethod,
      amount,
      timestamp: new Date().toISOString(),
    })

    setIsProcessing(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
          <DialogDescription>Complete your payment of Rs. {amount.toLocaleString()}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handlePayment}>
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                <div className="space-y-2">
                  <Card className="cursor-pointer hover:bg-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <CreditCard className="h-4 w-4" />
                        <Label htmlFor="credit_card" className="cursor-pointer">
                          Credit Card
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Building className="h-4 w-4" />
                        <Label htmlFor="bank_transfer" className="cursor-pointer">
                          Bank Transfer
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="digital_wallet" id="digital_wallet" />
                        <Smartphone className="h-4 w-4" />
                        <Label htmlFor="digital_wallet" className="cursor-pointer">
                          Digital Wallet
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </div>
{/* TODO: */}
            {paymentMethod === "credit_card" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="card_number">Card Number</Label>
                    <Input id="card_number" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                  <div>
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank_transfer" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input id="account_number" placeholder="Enter account number" required />
                </div>
                <div>
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input id="bank_name" placeholder="Enter bank name" required />
                </div>
              </div>
            )}

            {paymentMethod === "digital_wallet" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wallet_id">Wallet ID / Phone Number</Label>
                  <Input id="wallet_id" placeholder="Enter wallet ID or phone" required />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay Rs. ${amount.toLocaleString()}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
