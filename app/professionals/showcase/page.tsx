"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Professional, getProfessionals } from "@/app/api"

export default function ProfessionalsShowcase() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true)
        const data = await getProfessionals()
        setProfessionals(data)
      } catch (err) {
        setError("Failed to load professionals")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionals()
  }, [])

  // Group professionals alphabetically by company name
  const groupedProfessionals = professionals.reduce((acc: Record<string, Professional[]>, professional) => {
    const firstLetter = professional.company_name.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(professional)
    return acc
  }, {})

  // Filter professionals based on search term
  const filteredGroups = Object.entries(groupedProfessionals).filter(([letter, pros]) => {
    if (!searchTerm) return true
    return pros.some(p => 
      p.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company_type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Find Professional Services</h1>
      
      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search professionals..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Filter</Button>
      </div>

      {loading && <div className="text-center py-10">Loading professionals...</div>}
      
      {error && <div className="text-center text-red-500 py-10">{error}</div>}
      
      {!loading && !error && filteredGroups.length === 0 && (
        <div className="text-center py-10">No professionals found matching your search.</div>
      )}
      
      {!loading && !error && filteredGroups.map(([letter, pros]) => (
        <div key={letter} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{letter}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pros.map((pro) => (
              <Link key={pro.id} href={`/professionals/${pro.pid}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={pro.cover_image_url || "/images/cover-placeholder.svg"}
                      alt={pro.company_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{pro.company_name}</h3>
                        <p className="text-gray-600">{pro.company_type}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{pro.address || "Location not specified"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pro.specializations?.slice(0, 3).map((specialty, i) => (
                        <Badge key={i} variant="outline">{specialty}</Badge>
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
  )
}
