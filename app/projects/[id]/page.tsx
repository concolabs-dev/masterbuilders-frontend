"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Phone, Mail, Globe, Star, Loader2, Building2, AlertCircle } from "lucide-react"
import { 
  getProjectById, 
  getProfessionalByPID,
  type Project,
  type Professional 
} from "@/app/api"

interface ProjectWithProfessional extends Project {
  professional?: Professional;
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [project, setProject] = useState<ProjectWithProfessional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch project data
        const projectData = await getProjectById(params.id)
        
        // Fetch professional data if PID exists
        let professionalData: Professional | undefined
        if (projectData.pid) {
          try {
            professionalData = await getProfessionalByPID(projectData.pid)
          } catch (err) {
            console.warn("Failed to fetch professional data:", err)
            // Don't throw error, just continue without professional data
          }
        }
        
        setProject({
          ...projectData,
          professional: professionalData
        })
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Failed to load project details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProjectData()
    }
  }, [params.id])

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Project</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Link href="/projects">
              <Button variant="outline">Back to Projects</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Project not found
  if (!project) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Project Not Found</h3>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/projects" className="hover:text-foreground">
          Projects
        </Link>{" "}
        / {project.name}
      </div>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <Badge variant="secondary" className="font-medium">
                {project.type}
              </Badge>
              {project.featured && (
                <Badge variant="default" className="font-medium">
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-6 text-sm mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Images */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            {project.images && project.images.length > 0 ? (
              <>
                <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.images[selectedImageIndex] || "/images/cover-placeholder.svg"}
                    alt={`${project.name} image ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=500&width=800&text=Image+Not+Found";
                    }}
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                        selectedImageIndex === index ? "border-primary" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image || "/images/logo-placeholder.svg"}
                        alt={`${project.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=100&width=100&text=No+Image";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="relative h-96 rounded-lg overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No images available</p>
                </div>
              </div>
            )}
          </div>

          {/* Project Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Project Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description || "No description available for this project."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Contact Information */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {project.professional ? "Company Information" : "Project Information"}
              </h2>

              {project.professional ? (
                <>
                  {/* Company Logo and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={project.professional.company_logo_url || "/images/logo-placeholder.svg"}
                        alt={project.professional.company_name}
                        width={64}
                        height={64}
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=64&width=64&text=No+Logo";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{project.professional.company_name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {project.professional.company_type}
                      </Badge>
                    </div>
                  </div>

                  {/* Company Description */}
                  <p className="text-sm text-muted-foreground mb-6">
                    {project.professional.company_description || "No description available."}
                  </p>

                  {/* Contact Information */}
                  <div className="space-y-3 mb-6">
                    {project.professional.telephone_number && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{project.professional.telephone_number}</span>
                      </div>
                    )}
                    {project.professional.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{project.professional.email}</span>
                      </div>
                    )}
                    {project.professional.website && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{project.professional.website}</span>
                      </div>
                    )}
                    {project.professional.address && (
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{project.professional.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Additional Professional Info */}
                  {(project.professional.specializations?.length > 0 || 
                    project.professional.services_offered?.length > 0) && (
                    <div className="mb-6">
                      {project.professional.specializations?.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Specializations</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.professional.specializations.slice(0, 3).map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {project.professional.services_offered?.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Services</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.professional.services_offered.slice(0, 3).map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contact Button */}
                  <Button className="w-full" asChild>
                    <a href={`mailto:${project.professional.email}?subject=Inquiry about ${project.name}`}>
                      Contact Company
                    </a>
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Company information not available for this project.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}