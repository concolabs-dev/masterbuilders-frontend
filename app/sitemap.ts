import { MetadataRoute } from 'next'
import { getSuppliers, getProfessionals, getMaterials, getProjects } from './api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://buildmarketlk.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/supplier`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/professionals/showcase`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ]

  // Dynamic pages
  try {
    const [suppliers, professionals, materials, projects] = await Promise.all([
      getSuppliers(),
      getProfessionals(),
      getMaterials(),
      getProjects()
    ])

    const supplierPages = suppliers.map((supplier) => ({
      url: `${baseUrl}/supplier/${supplier.pid}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    const professionalPages = professionals.map((professional) => ({
      url: `${baseUrl}/professionals/${professional.pid}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    const projectPages = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    return [...staticPages, ...supplierPages, ...professionalPages, ...projectPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}