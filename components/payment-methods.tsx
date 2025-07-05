"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Trash2 } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "credit_card" | "bank_account"
  last4: string
  brand?: string
  isDefault: boolean
  expiryDate?: string
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  onAddPaymentMethod: () => void
  onDeletePaymentMethod: (id: string) => void
  onSetDefault: (id: string) => void
}

export function PaymentMethods({
  paymentMethods,
  onAddPaymentMethod,
  onDeletePaymentMethod,
  onSetDefault,
}: PaymentMethodsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment Methods</CardTitle>
          <Button onClick={onAddPaymentMethod}>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {method.type === "credit_card" ? method.brand : "Bank Account"} ****{method.last4}
                  </span>
                  {method.isDefault && <Badge variant="secondary">Default</Badge>}
                </div>
                {method.expiryDate && <p className="text-sm text-muted-foreground">Expires {method.expiryDate}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <Button variant="outline" size="sm" onClick={() => onSetDefault(method.id)}>
                  Set Default
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => onDeletePaymentMethod(method.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {paymentMethods.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No payment methods added yet. Add one to get started.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
