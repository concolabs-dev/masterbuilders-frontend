import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Professional Dashboard - Master Space Builders",
  description: "Manage your professional company profile and projects",
}

export default function ProfessionalDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
