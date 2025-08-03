import type { Metadata } from 'next'
import SupplierPageContent from '@/components/pages/Supplier'

export const metadata: Metadata = {
  title: 'Construction Suppliers Directory Sri Lanka | Verified Building Material Suppliers',
  description: 'Find trusted construction material suppliers across Sri Lanka. Connect with verified suppliers for cement, steel, tiles, hardware, and all building materials.',
  keywords: [
    'construction suppliers Sri Lanka',
    'building material suppliers',
    'cement suppliers',
    'steel suppliers Sri Lanka',
    'hardware suppliers',
    'construction materials vendors',
    'building supplies companies',
    'verified suppliers directory'
  ],
  openGraph: {
    title: 'Construction Suppliers Directory - Verified Building Material Suppliers',
    description: 'Find trusted construction material suppliers across Sri Lanka',
    images: ['/og-suppliers.jpg']
  }
}

export default function SuppliersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Construction Suppliers Directory",
    "description": "Verified construction material suppliers across Sri Lanka",
    "url": "https://buildmarketlk.com/supplier"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SupplierPageContent />
    </>
  )
}