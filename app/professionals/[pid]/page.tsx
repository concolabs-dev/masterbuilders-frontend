"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Phone, Mail, Globe, Star, Calendar, CheckCircle } from "lucide-react"
import { getProfessionalByPID, getProjectsByPID, Professional, Project } from "@/app/api"
import Loading from "@/components/loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ProfessionalCompanyPage({ params }: { params: { pid: string } }) {
  const [professionalData, setProfessionalData] = useState<Professional | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch professional and project data based on PID
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch professional data
        const professional = await getProfessionalByPID(params.pid)
        console.log(professional)
        setProfessionalData(professional)

        // Fetch projects associated with the professional's PID
        const projects = await getProjectsByPID(params.pid)
        setProjects(projects)

        // Set the first project as the selected project
        if(projects){
        if (projects.length > 0) {
          setSelectedProject(projects[0])
        }
      }else{
        setSelectedProject(null)  
      }

        setError(null)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Failed to load professional data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.pid])

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Loading />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  // No professional data found
  if (!professionalData) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Professional Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the professional you're looking for. Please check the URL or try again later.
        </p>
        <Link href="/professionals">
          <Button>Back to Professionals</Button>
        </Link>
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
        <Link href="/professionals" className="hover:text-foreground">
          Professionals
        </Link>{" "}
        / {professionalData.company_name}
      </div>

      {/* Company Header */}
      <div className="relative mb-8">
        <div className="h-64 w-full relative rounded-xl overflow-hidden">
          <Image
            src={professionalData.cover_image_url || "/placeholder.svg"}
            alt={`${professionalData.company_name} cover`}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-xl border-4 border-background bg-background overflow-hidden">
          <Image
            src={professionalData.company_logo_url  || "/placeholder.svg"}
            alt={professionalData.company_name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Company Info */}
      <div className="mt-20 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{professionalData.company_name}</h1>
              <Badge variant="secondary" className="font-medium">
                {professionalData.company_type}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4 max-w-3xl">{professionalData.company_description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{String(professionalData.address)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{professionalData.telephone_number}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{professionalData.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{professionalData.website}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Button>Contact Now</Button>
            <Button variant="outline">Save to Favorites</Button>
          </div>
        </div>
      </div>

      {/* Company Details Tabs */}
      <Tabs defaultValue="portfolio" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Projects</h3>
              {!projects && (
                <p className="text-muted-foreground">No projects available.</p>
              )}
              {projects &&projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${
                    selectedProject?.id === project.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium">{project.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Badge variant="outline" className="mr-2">
                        {project.type}
                      </Badge>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{project.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="md:col-span-2">
              {selectedProject && (
                <>
                  <h3 className="text-xl font-semibold mb-4">{selectedProject.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="secondary" className="mr-2">
                      {selectedProject.type}
                    </Badge>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedProject.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{selectedProject.year}</span>
                  </div>
                  <p className="mb-6">{selectedProject.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.images.map((image, index) => (
                      <div key={index} className="relative h-48 rounded-md overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${selectedProject.name} image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6">
          <h3 className="text-xl font-semibold mb-6">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalData.services_offered?.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">{service}</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="mt-6">
          <h3 className="text-xl font-semibold mb-4">About {professionalData.company_name}</h3>
          <p className="mb-6">{professionalData.company_description}</p>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div>
              {/* <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{professionalData.rating}</span>
                <span className="text-muted-foreground">out of 5</span>
              </div>
              <p className="text-muted-foreground">Based on {professionalData.reviews} reviews</p> */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}