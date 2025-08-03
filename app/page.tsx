import { Ruler, Users, FileSpreadsheet, DollarSign, Globe, Zap, Shield } from "lucide-react"
import { HeroSlider } from "@/components/sections/landingPage/hero-slider"
import type { Metadata } from 'next'
import FeaturesSection from "@/components/sections/landingPage/featuresSection"
import StatsSection from "@/components/sections/landingPage/statsSection"
import CtaSection from "@/components/sections/landingPage/ctaSection"
import ContactForm from "@/components/sections/landingPage/contactForm"
import AboutUsSection from "@/components/sections/landingPage/aboutUsSection"
import HomePageContent from "@/components/pages/HomePageContent"

export const metadata: Metadata = {
  metadataBase: new URL('https://buildmarketlk.com'),
  title: {
    default: 'BuildMarket LK - Construction Materials, Suppliers & Professionals Sri Lanka',
    template: '%s | BuildMarket LK'
  },
  description: 'Sri Lanka\'s leading construction marketplace. Find real-time material prices, trusted suppliers, construction professionals, and projects. Your gateway to Sri Lanka\'s construction industry.',
  keywords: [
    'construction materials Sri Lanka',
    'building materials prices',
    'construction suppliers',
    'construction professionals Sri Lanka',
    'building contractors',
    'construction projects',
    'material price tracker',
    'construction marketplace',
    'building suppliers Sri Lanka',
    'construction industry'
  ],
  authors: [{ name: 'BuildMarket LK' }],
  creator: 'Concolabs',
  publisher: 'Concolabs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildmarketlk.com',
    siteName: 'BuildMarket LK',
    title: 'BuildMarket LK - Construction Materials & Professionals',
    description: 'Sri Lanka\'s leading construction marketplace for materials, suppliers, and professionals',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'facebook-domain-verification': 'your-facebook-verification'
    }
  }
}

// Add structured data for homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BuildMarket LK",
  "url": "https://buildmarketlk.com",
  "description": "Sri Lanka's leading construction marketplace for materials, suppliers, and professionals",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://buildmarketlk.com/catalogue?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://www.facebook.com/buildmarketlk",
    "https://www.linkedin.com/company/buildmarket-lk"
  ]
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageContent />
    </>
  )
}