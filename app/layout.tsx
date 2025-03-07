import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type React from "react" // Added import for React
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Master Space Builders - Construction Price Catalogue",
  description: "Your trusted source for comprehensive construction pricing",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <UserProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter/>
          </UserProvider>
        </div>
      </body>
    </html>
  )
}

