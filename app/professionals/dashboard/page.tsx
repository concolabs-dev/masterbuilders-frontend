"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Grid, List, Search } from "lucide-react"
import { ProfessionalProfile } from "@/components/professional-profile"
import { ProjectCard } from "@/components/project-card"
import { ProjectList } from "@/components/project-list"
import { AddProjectDialog } from "@/components/add-project-dialog"
import { EditProjectDialog } from "@/components/edit-project-dialog"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Professional, getProfessionalByPID, updateProfessional } from "@/app/api"
import Loading from "../loading" 
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock projects data - keeping this for now
const initialProjects = [
  {
    id: "1",
    name: "Serenity Heights Residences",
    type: "Residential",
    location: "Colombo 07",
    year: "2022",
    description: "A luxury apartment complex featuring 50 units with modern amenities and sustainable design elements.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: true,
  },
  {
    id: "2",
    name: "Ocean View Commercial Plaza",
    type: "Commercial",
    location: "Galle",
    year: "2021",
    description:
      "A mixed-use commercial development with retail spaces, offices, and recreational areas overlooking the Indian Ocean.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  {
    id: "3",
    name: "Green Valley Eco Resort",
    type: "Hospitality",
    location: "Kandy",
    year: "2020",
    description:
      "An eco-friendly resort nestled in the hills of Kandy, featuring sustainable architecture and minimal environmental impact.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    featured: false,
  },
  {
    id: "4",
    name: "Innovation Hub Tech Campus",
    type: "Institutional",
    location: "Colombo 04",
    year: "2019",
    description:
      "A state-of-the-art technology campus designed to foster innovation and collaboration among tech startups.",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
]

export default function ProfessionalDashboardPage() {
  const { user, isLoading: isUserLoading, error: userError } = useUser()
  const [professionalData, setProfessionalData] = useState<Professional | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Projects state (using dummy data for now)
  const [projects, setProjects] = useState(initialProjects)
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false)

  // Fetch professional data when user is loaded
  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (!user?.sub) return
      
      try {
        setIsLoading(true)
        const data = await getProfessionalByPID(user.sub)
        setProfessionalData(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch professional data:", err)
        setError("Failed to load your professional profile. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.sub) {
      fetchProfessionalData()
    }
  }, [user?.sub])

  const handleProfessionalUpdate = async (updatedProfessional) => {
    if (!professionalData?.id) return
    
    try {
      // Assuming you have an updateProfessional function in your API
      // const updated = await updateProfessional(professionalData.id, updatedProfessional)
      // setProfessionalData(updated)
      
      // For now, just update the state
      setProfessionalData({...professionalData, ...updatedProfessional})
      await updateProfessional(professionalData.id, updatedProfessional)
      console.log("Professional updated:", updatedProfessional)
    } catch (err) {
      console.error("Failed to update professional:", err)
    }
  }

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: (projects.length + 1).toString(),
      featured: false,
    }
    setProjects([...projects, projectWithId])
    setIsAddProjectDialogOpen(false)
  }

  const handleUpdateProject = (id, updatedProject) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, ...updatedProject } : project)))
    setSelectedProject(null)
    setIsEditProjectDialogOpen(false)
  }

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleToggleFeature = (id) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, featured: !project.featured } : project)))
  }

  // Loading state
  if (isUserLoading || isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-6">
        {/* <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div> */}
        <Loading />
      </div>
    )
  }

  // Error state
  if (userError || error) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "There was an error loading your profile. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // No professional profile found
  if (!professionalData) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">No Professional Profile Found</h1>
        <p className="text-muted-foreground mb-6">
          It seems you don't have a professional profile yet. Please complete the onboarding process.
        </p>
        <Button onClick={() => window.location.href = "/onboarding"}>
          Complete Onboarding
        </Button>
      </div>
    )
  }

  // Format the professional data for the profile component
  const formattedProfessional = {
    id: professionalData.id,
    name: professionalData.company_name,
    type: professionalData.company_type,
    description: professionalData.company_description || "",
    location: professionalData.address || "",
    phone: professionalData.telephone_number || "",
    email: professionalData.email || "",
    website: professionalData.website || "",
    founded: professionalData.year_founded?.toString() || "",
    employees: professionalData.number_of_employees?.toString() || "",
    coverImage: professionalData.cover_image_url || "/placeholder.svg?height=400&width=1200",
    logo: professionalData.company_logo_url || "/placeholder.svg?height=200&width=200",
    specialties: professionalData.specializations || [],
    certifications: professionalData.certifications_accreditations || [],
    services: (professionalData.services_offered || []).map(service => ({
      name: service,
      description: "",
      icon: "Building"
    }))
  }

  return (
    <div className="container mx-auto py-10">
      <ProfessionalProfile professional={formattedProfessional} onUpdate={handleProfessionalUpdate} />

      <Tabs defaultValue="projects" className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-secondary" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-secondary" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setIsAddProjectDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => {
                    setSelectedProject(project)
                    setIsEditProjectDialogOpen(true)
                  }}
                  onDelete={() => handleDeleteProject(project.id)}
                  onToggleFeature={() => handleToggleFeature(project.id)}
                />
              ))}
            </div>
          ) : (
            <ProjectList
              projects={filteredProjects}
              onEdit={(project) => {
                setSelectedProject(project)
                setIsEditProjectDialogOpen(true)
              }}
              onDelete={(id) => handleDeleteProject(id)}
              onToggleFeature={(id) => handleToggleFeature(id)}
            />
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found. Add your first project to showcase your work.
            </div>
          )}
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Services</h2>
              <p className="text-muted-foreground mb-6">
                Edit your services and specializations to showcase your expertise to potential clients.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Your Services</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {professionalData.services_offered?.map((service, index) => (
                    <li key={index}>{service}</li>
                  )) || <li className="text-muted-foreground">No services added yet</li>}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Your Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {professionalData.specializations?.map((spec, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                      {spec}
                    </span>
                  )) || <span className="text-muted-foreground">No specializations added yet</span>}
                </div>
              </div>
              
              <Button>Edit Services & Specializations</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <p className="text-muted-foreground">View insights about your profile views and engagement.</p>
              <div className="text-center py-12 text-muted-foreground">Analytics features coming soon.</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Company Name</h3>
                  <p>{professionalData.company_name}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Company Type</h3>
                  <p>{professionalData.company_type}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p>{professionalData.email}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p>{professionalData.telephone_number}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p>{professionalData.address}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Website</h3>
                  <p>{professionalData.website || "Not specified"}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button>Edit Account Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Project Dialog */}
      <AddProjectDialog
        open={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
        onSubmit={handleAddProject}
      />

      {/* Edit Project Dialog */}
      <EditProjectDialog
        open={isEditProjectDialogOpen}
        onOpenChange={setIsEditProjectDialogOpen}
        project={selectedProject}
        onSubmit={(updatedProject) => handleUpdateProject(selectedProject?.id, updatedProject)}
      />
    </div>
  )
}
