import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Supplier Dashboard - Master Space Builders",
  description: "Manage your construction materials catalogue",
}

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

