"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Filter, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Professional, 
  getProfessionals, 
  searchProfessionals, 
  getProfessionalsWithFilters, 
  getProfessionalTypes,
  ProfessionalSearchResult
} from "@/app/api"
import DOMPurify from 'dompurify'

export default function ProfessionalsShowcase() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [professionalTypes, setProfessionalTypes] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searching, setSearching] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCompanyType, setSelectedCompanyType] = useState<string>("")
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<ProfessionalSearchResult | null>(null)

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null)

  // Sanitize professional data
  const sanitizeProfessional = (professional: Professional): Professional => {
    return {
      ...professional,
      company_name: DOMPurify.sanitize(professional.company_name || ''),
      company_type: DOMPurify.sanitize(professional.company_type || ''),
      company_description: DOMPurify.sanitize(professional.company_description || ''),
      address: DOMPurify.sanitize(professional.address || ''),
      email: DOMPurify.sanitize(professional.email || ''),
      telephone_number: DOMPurify.sanitize(professional.telephone_number || ''),
      website: DOMPurify.sanitize(professional.website || ''),
      pid: DOMPurify.sanitize(professional.pid || ''),
      cover_image_url: DOMPurify.sanitize(professional.cover_image_url || ''),
      company_logo_url: DOMPurify.sanitize(professional.company_logo_url || ''),
      specializations: professional.specializations?.map(spec => DOMPurify.sanitize(spec)) || [],
      services_offered: professional.services_offered?.map(service => DOMPurify.sanitize(service)) || [],
      certifications_accreditations: professional.certifications_accreditations?.map(cert => DOMPurify.sanitize(cert)) || []
    }
  }

  // Sanitize professionals array
  const sanitizeProfessionals = (professionals: Professional[]): Professional[] => {
    return professionals.map(sanitizeProfessional)
  }

  // Sanitize professional types
  const sanitizeProfessionalTypes = (types: string[]): string[] => {
    return types.map(type => DOMPurify.sanitize(type))
  }

  // Sanitize search results
  const sanitizeSearchResults = (results: ProfessionalSearchResult): ProfessionalSearchResult => {
    return {
      ...results,
      query: DOMPurify.sanitize(results.query || ''),
      results: sanitizeProfessionals(results.results || [])
    }
  }

  // Scroll to results function
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const [professionalsData, typesData] = await Promise.all([
          getProfessionals(),
          getProfessionalTypes()
        ])
        
        // Sanitize data before setting state
        setProfessionals(sanitizeProfessionals(professionalsData))
        setProfessionalTypes(sanitizeProfessionalTypes(typesData.professional_types))
      } catch (err) {
        const sanitizedError = DOMPurify.sanitize("Failed to load professionals")
        setError(sanitizedError)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Handle search
  const handleSearch = async () => {
    const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm.trim())
    
    if (!sanitizedSearchTerm) {
      // If no search term, apply filters only
      await handleFilter()
      return
    }

    try {
      setSearching(true)
      const sanitizedCompanyType = selectedCompanyType ? DOMPurify.sanitize(selectedCompanyType) : undefined
      const filters = sanitizedCompanyType ? { company_type: sanitizedCompanyType } : undefined
      const results = await searchProfessionals(sanitizedSearchTerm, filters)
      
      // Sanitize search results before setting state
      const sanitizedResults = sanitizeSearchResults(results)
      setSearchResults(sanitizedResults)
      setProfessionals(sanitizedResults.results)
      
      // Scroll to results after search completes
      setTimeout(scrollToResults, 100)
    } catch (err) {
      const sanitizedError = DOMPurify.sanitize("Search failed")
      setError(sanitizedError)
      console.error(err)
    } finally {
      setSearching(false)
    }
  }

  // Handle filter by company type
  const handleFilter = async () => {
    const sanitizedCompanyType = selectedCompanyType ? DOMPurify.sanitize(selectedCompanyType) : ""
    
    if (!sanitizedCompanyType) {
      // If no filter, get all professionals
      try {
        setSearching(true)
        const data = await getProfessionals()
        setProfessionals(sanitizeProfessionals(data))
        setSearchResults(null)
        
        // Scroll to results after filter completes
        setTimeout(scrollToResults, 100)
      } catch (err) {
        const sanitizedError = DOMPurify.sanitize("Failed to load professionals")
        setError(sanitizedError)
        console.error(err)
      } finally {
        setSearching(false)
      }
      return
    }

    try {
      setSearching(true)
      const filteredData = await getProfessionalsWithFilters({
        company_type: sanitizedCompanyType
      })
      setProfessionals(sanitizeProfessionals(filteredData))
      setSearchResults(null)
      
      // Scroll to results after filter completes
      setTimeout(scrollToResults, 100)
    } catch (err) {
      const sanitizedError = DOMPurify.sanitize("Filter failed")
      setError(sanitizedError)
      console.error(err)
    } finally {
      setSearching(false)
    }
  }

  // Clear all filters and search
  const clearFilters = async () => {
    setSearchTerm("")
    setSelectedCompanyType("")
    setSearchResults(null)
    try {
      setSearching(true)
      const data = await getProfessionals()
      setProfessionals(sanitizeProfessionals(data))
      
      // Scroll to results after clearing
      setTimeout(scrollToResults, 100)
    } catch (err) {
      const sanitizedError = DOMPurify.sanitize("Failed to reload professionals")
      setError(sanitizedError)
      console.error(err)
    } finally {
      setSearching(false)
    }
  }

  // Handle Enter key for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Handle company type selection
  const handleCompanyTypeChange = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value)
    setSelectedCompanyType(sanitizedValue)
  }

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value)
    setSearchTerm(sanitizedValue)
  }

  // Clear company type filter
  const clearCompanyTypeFilter = () => {
    setSelectedCompanyType("")
  }

  // Group professionals alphabetically by company name
  const groupedProfessionals = professionals.reduce((acc: Record<string, Professional[]>, professional) => {
    const sanitizedCompanyName = DOMPurify.sanitize(professional.company_name || '')
    const firstLetter = sanitizedCompanyName.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(professional)
    return acc
  }, {})

  const hasActiveFilters = searchTerm || selectedCompanyType

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Find Professional Services</h1>
      
      {/* Search and filter section */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by company name, description, specializations, or services..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={searching}>
              <Search className="h-4 w-4 mr-2" />
              {searching ? "Searching..." : "Search"}
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                  {(searchTerm ? 1 : 0) + (selectedCompanyType ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Filter Options */}
        {isFilterOpen && (
          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Company Type</label>
                <div className="flex gap-2">
                  <Select value={selectedCompanyType} onValueChange={handleCompanyTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionalTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCompanyType && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearCompanyTypeFilter}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {selectedCompanyType && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {selectedCompanyType}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleFilter} disabled={searching}>
                Apply Filters
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} disabled={searching}>
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {searchResults && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-blue-800">
              <span className="font-medium">Search Results:</span> Found {searchResults.count} professional(s) 
              for "{searchResults.query}"
              {selectedCompanyType && (
                <span> in category "{selectedCompanyType}"</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results section with ref for scrolling */}
      <div ref={resultsRef}>
        {loading && <div className="text-center py-10">Loading professionals...</div>}
        
        {error && <div className="text-center text-red-500 py-10">{error}</div>}
        
        {!loading && !error && professionals.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-500 mb-4">No professionals found.</div>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear filters and show all
              </Button>
            )}
          </div>
        )}
        
        {!loading && !error && Object.keys(groupedProfessionals).length > 0 && (
          Object.entries(groupedProfessionals)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, pros]) => (
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-lg truncate">{pro.company_name}</h3>
                              <p className="text-gray-600">{pro.company_type}</p>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{pro.address || "Location not specified"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {pro.specializations?.slice(0, 3).map((specialty, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                            {pro.specializations && pro.specializations.length > 3 && (
                              <Badge variant="outline" className="text-xs text-gray-500">
                                +{pro.specializations.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}