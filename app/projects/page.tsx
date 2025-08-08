import type { Metadata } from 'next'
import ProjectsPageContent from '@/components/pages/Projects'

export const metadata: Metadata = {
  title: 'Construction Projects Gallery Sri Lanka | Completed Building Projects Portfolio',
  description: 'Explore completed construction projects across Sri Lanka. View residential, commercial, and infrastructure projects by top construction companies and professionals.',
  keywords: [
    'construction projects Sri Lanka',
    'building projects portfolio',
    'completed construction work',
    'residential projects',
    'commercial buildings',
    'construction company projects',
    'architecture portfolio'
  ],
  openGraph: {
    title: 'Construction Projects Gallery - Completed Building Projects Portfolio',
    description: 'Explore completed construction projects across Sri Lanka',
    images: ['/og-projects.jpg']
  }
}

export default function ProjectsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Construction Projects Gallery",
    "description": "Completed construction projects across Sri Lanka",
    "url": "https://buildmarketlk.com/projects"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectsPageContent />
    </>
  )
}