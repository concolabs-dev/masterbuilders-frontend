"use client"

import { useState } from "react"
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

// Mock professional company data
const initialProfessionalData = {
  id: "creative-design-associates",
  name: "Creative Design Associates",
  type: "Architect",
  description:
    "Creative Design Associates is a leading architectural firm with over 15 years of experience in designing innovative and sustainable buildings. Our team of skilled architects and designers is committed to creating spaces that inspire and enhance the quality of life.",
  location: "123 Design Street, Colombo 03, Sri Lanka",
  phone: "+94 77 123 4567",
  email: "info@creativedesign.lk",
  website: "www.creativedesign.lk",
  founded: "2008",
  employees: "25-50",
  rating: 4.9,
  reviews: 42,
  coverImage: "/placeholder.svg?height=400&width=1200",
  logo: "/placeholder.svg?height=200&width=200",
  specialties: ["Modern Architecture", "Interior Design", "Landscape Design", "Sustainable Design", "Urban Planning"],
  services: [
    {
      name: "Architectural Design",
      description:
        "Comprehensive architectural design services for residential, commercial, and institutional projects.",
      icon: "Building",
    },
    {
      name: "Interior Design",
      description: "Creative interior design solutions that optimize space utilization and enhance aesthetics.",
      icon: "Building",
    },
    {
      name: "Landscape Design",
      description: "Innovative landscape design that harmonizes with the built environment and natural surroundings.",
      icon: "Building",
    },
    {
      name: "Project Management",
      description: "End-to-end project management services to ensure timely and quality execution of design projects.",
      icon: "Building",
    },
  ],
  certifications: ["Chartered Architects", "Green Building Council", "ISO 9001:2015"],
}

// Mock projects data
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
  const [professionalData, setProfessionalData] = useState(initialProfessionalData)
  const [projects, setProjects] = useState(initialProjects)
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false)

  const handleProfessionalUpdate = (updatedProfessional) => {
    setProfessionalData(updatedProfessional)
    // In a real app, you would save this to your backend
    console.log("Professional updated:", updatedProfessional)
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

  return (
    <div className="container mx-auto py-10">
      <ProfessionalProfile professional={professionalData} onUpdate={handleProfessionalUpdate} />

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
              <p className="text-muted-foreground">Manage your account settings and preferences.</p>
              <div className="text-center py-12 text-muted-foreground">Settings features coming soon.</div>
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
