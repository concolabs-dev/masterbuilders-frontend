
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface BillingOverviewProps {
  currentBalance: number
  nextPaymentDue: string
  nextPaymentAmount: number
  accountStatus: "active" | "overdue" | "suspended"
  onPayNow: () => void
}

export function BillingOverview({
  currentBalance,
  nextPaymentDue,
  nextPaymentAmount,
  accountStatus,
  onPayNow,
}: BillingOverviewProps) {
  const getStatusIcon = () => {
    switch (accountStatus) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "suspended":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
    }
  }

  const getStatusColor = () => {
    switch (accountStatus) {
      case "active":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "suspended":
        return "bg-orange-100 text-orange-800"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs. {currentBalance.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs. {nextPaymentAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{nextPaymentDue}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Account Status</CardTitle>
          {getStatusIcon()}
        </CardHeader>
        <CardContent>
          <Badge className={getStatusColor()}>{accountStatus.toUpperCase()}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onPayNow}
            className="w-full"
            variant={accountStatus === "overdue" ? "destructive" : "default"}
          >
            {accountStatus === "overdue" ? "Pay Overdue" : "Pay Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
