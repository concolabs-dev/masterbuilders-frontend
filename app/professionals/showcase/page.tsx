"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock professional companies data organized alphabetically
const professionals = {
  A: [
    {
      id: "apex-architects",
      name: "Apex Architects",
      type: "Architect",
      location: "Colombo 07",
      rating: 4.8,
      projects: 32,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Residential", "Commercial", "Sustainable Design"],
    },
    {
      id: "alpha-construction",
      name: "Alpha Construction Ltd",
      type: "Contractor",
      location: "Colombo 04",
      rating: 4.5,
      projects: 48,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["High-rise Buildings", "Infrastructure", "Renovations"],
    },
    {
      id: "accurate-quantity-surveyors",
      name: "Accurate Quantity Surveyors",
      type: "Quantity Surveyor",
      location: "Colombo 03",
      rating: 4.7,
      projects: 56,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Cost Estimation", "Contract Administration", "Value Engineering"],
    },
  ],
  B: [
    {
      id: "blue-ocean-architects",
      name: "Blue Ocean Architects",
      type: "Architect",
      location: "Colombo 05",
      rating: 4.6,
      projects: 28,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Luxury Homes", "Hospitality", "Urban Planning"],
    },
    {
      id: "build-right-construction",
      name: "Build Right Construction",
      type: "Contractor",
      location: "Colombo 06",
      rating: 4.4,
      projects: 37,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Residential", "Commercial", "Industrial"],
    },
  ],
  C: [
    {
      id: "creative-design-associates",
      name: "Creative Design Associates",
      type: "Architect",
      location: "Colombo 03",
      rating: 4.9,
      projects: 42,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Modern Architecture", "Interior Design", "Landscape Design"],
    },
    {
      id: "construct-plus",
      name: "Construct Plus",
      type: "Contractor",
      location: "Colombo 08",
      rating: 4.3,
      projects: 51,
      image: "/placeholder.svg?height=200&width=300",
      specialties: ["Government Projects", "Educational Institutions", "Healthcare Facilities"],
    },
  ],
}

const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
const professionalTypes = [
  "All",
  "Architect",
  "Contractor",
  "Quantity Surveyor",
  "Interior Designer",
  "Structural Engineer",
]

export default function ProfessionalsShowcasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter professionals based on search query and type
  const filteredProfessionals = Object.entries(professionals).reduce(
    (acc, [letter, list]) => {
      const filtered = list.filter((professional) => {
        const matchesSearch =
          professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          professional.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesType = selectedType === "All" || professional.type === selectedType
        return matchesSearch && matchesType
      })
      if (filtered.length > 0) {
        acc[letter] = filtered
      }
      return acc
    },
    {} as Record<string, (typeof professionals)["A"]>,
  )

  // Get visible professionals based on selected letter or search
  const visibleProfessionals = selectedLetter
    ? { [selectedLetter]: filteredProfessionals[selectedLetter] || [] }
    : filteredProfessionals

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setSelectedLetter(letter)
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
        / Showcase
      </div>

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Professional Companies</h1>
          <p className="text-muted-foreground">Find the right professionals for your construction project</p>
        </div>
        <Link href="/professionals/register">
          <Button>Register as a Professional</Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or specialty..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedLetter(null)
            }}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {professionalTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-secondary" : ""}
          >
            <div className="grid grid-cols-2 gap-1 h-4 w-4">
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
            </div>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-secondary" : ""}
          >
            <div className="flex flex-col gap-1 h-4 w-4 justify-center">
              <div className="h-0.5 w-full bg-current rounded-sm" />
              <div className="h-0.5 w-full bg-current rounded-sm" />
              <div className="h-0.5 w-full bg-current rounded-sm" />
            </div>
          </Button>
        </div>
      </div>

      {/* Alphabet Navigation */}
      <div className="flex flex-wrap gap-1 mb-8">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            size="sm"
            className="w-8 h-8 p-0"
            disabled={!professionals[letter as keyof typeof professionals]}
            onClick={() => scrollToLetter(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>

      {/* Professionals List */}
      {viewMode === "grid" ? (
        <div className="space-y-8">
          {Object.entries(visibleProfessionals).map(([letter, list]) => (
            <div key={letter} id={`letter-${letter}`}>
              <h2 className="text-lg font-semibold bg-muted px-4 py-2 rounded-md mb-4">{letter}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((professional) => (
                  <Link key={professional.id} href={`/professionals/${professional.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                      <div className="relative h-48 w-full">
                        <Image
                          src={professional.image || "/placeholder.svg"}
                          alt={professional.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="font-medium">
                            {professional.type}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{professional.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{professional.location}</span>
                          <span className="mx-2">•</span>
                          <span>{professional.projects} Projects</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {professional.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/5">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(visibleProfessionals).map(([letter, list]) => (
            <div key={letter} id={`letter-${letter}`}>
              <h2 className="text-lg font-semibold bg-muted px-4 py-2 rounded-md mb-4">{letter}</h2>
              <div className="space-y-4">
                {list.map((professional) => (
                  <Link key={professional.id} href={`/professionals/${professional.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden shrink-0">
                            <Image
                              src={professional.image || "/placeholder.svg"}
                              alt={professional.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-lg">{professional.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Badge variant="secondary" className="mr-2 font-medium">
                                    {professional.type}
                                  </Badge>
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{professional.location}</span>
                                  <span className="mx-2">•</span>
                                  <span>{professional.projects} Projects</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2 md:mt-0">
                                {professional.specialties.map((specialty, index) => (
                                  <Badge key={index} variant="outline" className="bg-primary/5">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(visibleProfessionals).length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No professionals found matching your search.</div>
      )}
    </div>
  )
}
