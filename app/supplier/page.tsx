import { redirect } from "next/navigation"

export default function SupplierPage() {
  redirect("/supplier/dashboard")
  return null
}