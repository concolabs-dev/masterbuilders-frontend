import Providers from "../providers"
import AdminDashboard from "./dashboard"
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
export default function AdminPage() {
  return (
    <UserProvider><Providers>
    <AdminDashboard />
  </Providers></UserProvider>
    
  )
}

