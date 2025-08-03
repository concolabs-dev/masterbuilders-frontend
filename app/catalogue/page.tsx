import type { Metadata } from 'next'
import CataloguePage from '@/components/pages/Catalogue'

export const metadata: Metadata = {
  title: 'Construction Materials Catalogue - Real-Time Prices Sri Lanka | BuildMarket LK',
  description: 'Browse construction materials with real-time prices from verified suppliers across Sri Lanka. Compare prices, find deals on cement, steel, tiles, and more building materials.',
  keywords: [
    'construction materials catalogue Sri Lanka',
    'building materials prices today',
    'cement prices Sri Lanka',
    'steel prices current',
    'tiles prices',
    'construction supplies online',
    'material price comparison',
    'building materials directory'
  ],
  openGraph: {
    title: 'Construction Materials Catalogue - Live Prices Sri Lanka',
    description: 'Find and compare construction material prices from top suppliers in Sri Lanka',
    images: ['/og-catalogue.jpg']
  }
}

export default function Catalogue() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Construction Materials Catalogue",
    "description": "Comprehensive catalogue of construction materials with real-time pricing",
    "url": "https://buildmarketlk.com/catalogue"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CataloguePage />
    </>
  )
}