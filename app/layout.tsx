import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type React from "react" // Added import for React
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
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
<head>
  <title>Build Masters LK - Affordable Construction Materials & Supplies in Sri Lanka</title>
  <meta name="description" content="Master Space Builders Pvt Ltd is revolutionizing the construction industry by bridging the gap between suppliers and builders. Explore our extensive catalogue of construction, electrical, and other materials at competitive prices. Discover cheap material prices, construction prices, and high-quality Sri Lankan material supplies with our innovative platform." />
<meta name="keywords" content="cheap material prices in Sri Lanka, construction prices in Sri Lanka, Sri Lankan material supplies, construction materials Sri Lanka, building materials Sri Lanka, electrical materials, affordable construction, building catalogue, affordable construction materials, cheap construction supplies, quality building products, budget building materials, top construction marketplace, online building supplies, innovative construction solutions, reliable supplier network, trusted construction marketplace, cost-effective building resources, construction cost saving, competitive construction prices, construction supplier discounts, transparent pricing construction, cement Sri Lanka, affordable cement supplies, cheap cement price Colombo, quality cement distributors, bulk cement purchase, cement suppliers Kandy, aggregates Sri Lanka, cheap aggregates for construction, quality aggregates supplier, affordable aggregate materials, bulk aggregates Colombo, sand suppliers Sri Lanka, cheap construction sand, quality sand for building, affordable sand prices, bricks Sri Lanka, cheap bricks for construction, quality brick supplier, bulk bricks purchase, discounted brick prices, steel bars Sri Lanka, cheap rebar suppliers, affordable steel construction, quality structural steel, bulk steel purchase Sri Lanka, premium metal building supplies, discounted steel prices Colombo, roofing materials Sri Lanka, affordable roofing supplies, cheap roofing materials, quality roof installations, insulation materials Sri Lanka, energy-efficient insulation, budget insulation suppliers, electrical supplies Sri Lanka, affordable electrical components, cheap electrical equipment, quality electrical distributors, lighting supplies Colombo, electrical fittings Kandy, electrical cable suppliers, bulk electrical products Sri Lanka, plumbing supplies Sri Lanka, affordable plumbing materials, cheap plumbing equipment, quality sanitary fittings, bulk plumbing parts, discount bathroom fixtures, floor tiles Sri Lanka, affordable floor tiles, cheap wall tiles, quality interior finishes, bathroom fixtures Sri Lanka, kitchen fittings Colombo, paint suppliers Sri Lanka, decorative building materials, construction tools Sri Lanka, affordable building tools, cheap construction equipment, quality construction machinery, heavy equipment suppliers, power tools for construction, bulk tool purchase Sri Lanka, innovative construction technology, digital construction catalog, smart building solutions, modern construction products, sustainable building materials, eco-friendly construction supplies, energy-efficient building solutions, advanced construction equipment, next-generation construction tools, cheap cement price Sri Lanka, affordable cement Colombo, quality aggregates supplier Kandy, budget sand suppliers Galle, discount bricks Jaffna, premium steel bars Sri Lanka, cost-effective roofing Colombo, innovative electrical supplies Kandy, bulk plumbing parts Galle, modern floor tiles Jaffna, reliable construction tools Colombo, sustainable insulation materials Sri Lanka, eco-friendly building products Kandy, top rated construction equipment Galle, advanced construction solutions Colombo" />


  <meta property="og:title" content="Build Masters LK - Affordable Construction Materials & Supplies in Sri Lanka" />
  <meta property="og:description" content="Master Space Builders Pvt Ltd is revolutionizing the construction industry by bridging the gap between suppliers and builders. Explore our extensive catalogue of construction, electrical, and other materials at competitive prices. Discover cheap material prices, construction prices, and high-quality Sri Lankan material supplies with our innovative platform." />
  <meta property="og:image" content="/images/logobm.png" />
  <meta property="og:url" content="https://www.buildmasters.lk" />
  

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Build Masters LK - Affordable Construction Materials & Supplies in Sri Lanka" />
  <meta name="twitter:description" content="Master Space Builders Pvt Ltd is revolutionizing the construction industry by bridging the gap between suppliers and builders. Explore our extensive catalogue of construction, electrical, and other materials at competitive prices. Discover cheap material prices, construction prices, and high-quality Sri Lankan material supplies with our innovative platform." />
  <meta name="twitter:image" content="/images/logobm.png" />
  
  <link rel="icon" href="/images/logobm.png" />
</head>

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

