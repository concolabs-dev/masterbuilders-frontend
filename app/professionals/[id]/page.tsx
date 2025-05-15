"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Phone, Mail, Globe, Star, Calendar, CheckCircle } from "lucide-react"

// Mock data for a professional company
const professionalData = {
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
      icon: Building,
    },
    {
      name: "Interior Design",
      description: "Creative interior design solutions that optimize space utilization and enhance aesthetics.",
      icon: Building,
    },
    {
      name: "Landscape Design",
      description: "Innovative landscape design that harmonizes with the built environment and natural surroundings.",
      icon: Building,
    },
    {
      name: "Project Management",
      description: "End-to-end project management services to ensure timely and quality execution of design projects.",
      icon: Building,
    },
  ],
  projects: [
    {
      id: "1",
      name: "Serenity Heights Residences",
      type: "Residential",
      location: "Colombo 07",
      year: "2022",
      description:
        "A luxury apartment complex featuring 50 units with modern amenities and sustainable design elements.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
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
    },
  ],
  certifications: ["Chartered Architects", "Green Building Council", "ISO 9001:2015"],
}

export default function ProfessionalCompanyPage({ params }: { params: { id: string } }) {
  const [selectedProject, setSelectedProject] = useState(professionalData.projects[0])

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
        /{" "}
        <Link href="/professionals/showcase" className="hover:text-foreground">
          Showcase
        </Link>{" "}
        / {professionalData.name}
      </div>

      {/* Company Header */}
      <div className="relative mb-8">
        <div className="h-64 w-full relative rounded-xl overflow-hidden">
          <Image
            src={professionalData.coverImage || "/placeholder.svg"}
            alt={`${professionalData.name} cover`}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-xl border-4 border-background bg-background overflow-hidden">
          <Image
            src={professionalData.logo || "/placeholder.svg"}
            alt={professionalData.name}
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
              <h1 className="text-3xl font-bold">{professionalData.name}</h1>
              <Badge variant="secondary" className="font-medium">
                {professionalData.type}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4 max-w-3xl">{professionalData.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{professionalData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{professionalData.phone}</span>
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
              {professionalData.projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${selectedProject.id === project.id ? "border-primary" : ""}`}
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
            </div>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6">
          <h3 className="text-xl font-semibold mb-6">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalData.services.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">{service.name}</h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-12 mb-6">Specializations</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {professionalData.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {specialty}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-12 mb-6">Certifications & Accreditations</h3>
          <div className="space-y-3">
            {professionalData.certifications.map((certification, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{certification}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">About {professionalData.name}</h3>
              <p className="mb-6">{professionalData.description}</p>
              <p className="mb-6">
                With a team of experienced professionals and a commitment to excellence, we have successfully completed
                numerous projects across Sri Lanka. Our approach combines innovative design thinking with practical
                solutions to create spaces that are both functional and aesthetically pleasing.
              </p>
              <p>
                We believe in sustainable design practices and strive to incorporate eco-friendly elements in all our
                projects. Our collaborative approach ensures that we work closely with our clients to understand their
                needs and deliver solutions that exceed their expectations.
              </p>
            </div>
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium mb-4">Company Information</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium">{professionalData.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="font-medium">{professionalData.employees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{professionalData.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{professionalData.phone}</p>
                      <p className="font-medium">{professionalData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <p className="font-medium">{professionalData.website}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{professionalData.rating}</span>
                <span className="text-muted-foreground">out of 5</span>
              </div>
              <p className="text-muted-foreground">Based on {professionalData.reviews} reviews</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-center text-muted-foreground">Reviews feature coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
