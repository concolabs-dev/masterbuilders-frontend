// "use client"

// import { useState, useMemo, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Search, Filter, Star, MapPin, Calendar, Building2, Loader2 } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { 
//   getProjectsWithProfessionalInfo, 
//   searchProjects,
//   getProjectsWithFilters,
//   type ProjectWithProfessional 
// } from "@/app/api"

// const projectTypes = ["All Types", "Residential", "Commercial", "Infrastructure"]
// const companyTypes = ["All Companies", "Architect", "Contractor", "Engineer"]
// const sortOptions = [
//   { value: "year", label: "Year (Newest First)" },
//   { value: "name", label: "Name" },
//   { value: "company", label: "Company" },
//   { value: "rating", label: "Rating" },
// ]

// export default function ProjectsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedType, setSelectedType] = useState("All Types")
//   const [selectedCompany, setSelectedCompany] = useState("All Companies")
//   const [sortBy, setSortBy] = useState("year")
//   const [projects, setProjects] = useState<ProjectWithProfessional[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch projects on component mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//         console.log("Fetching initial projects...")
//         const data = await getProjectsWithProfessionalInfo()
//         console.log("Fetched projects data:", data)
//         console.log("First project ID:", data[0]?.id)
//         setProjects(data)
//       } catch (err) {
//         console.error("Error fetching projects:", err)
//         setError("Failed to load projects. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [])

//   // Handle search with debouncing
//   useEffect(() => {
//     if (!searchTerm.trim()) return

//     const debounceTimer = setTimeout(async () => {
//       try {
//         setLoading(true)
//         const searchFilters = {
//           type: selectedType !== "All Types" ? selectedType : undefined,
//         }
        
//         console.log("Searching projects with term:", searchTerm)
//         const searchResult = await searchProjects(searchTerm, searchFilters)
//         console.log("Search results:", searchResult)
        
//         // Get professional info for search results
//         const projectsWithProfessional = await Promise.all(
//           searchResult.results.map(async (project) => {
//             // Since search results might not include professional info,
//             // we'll fetch projects with professional info and filter
//             const allProjectsWithProfessional = await getProjectsWithProfessionalInfo()
//             return allProjectsWithProfessional.find(p => p.id === project.id) || project
//           })
//         )
        
//         console.log("Projects with professional info:", projectsWithProfessional)
//         setProjects(projectsWithProfessional)
//       } catch (err) {
//         console.error("Error searching projects:", err)
//         setError("Search failed. Please try again.")
//       } finally {
//         setLoading(false)
//       }
//     }, 500)

//     return () => clearTimeout(debounceTimer)
//   }, [searchTerm, selectedType])

//   // Handle filters
//   useEffect(() => {
//     if (searchTerm.trim()) return // Don't filter if actively searching

//     const fetchFilteredProjects = async () => {
//       try {
//         setLoading(true)
//         const filters = {
//           company_type: selectedCompany !== "All Companies" ? selectedCompany : undefined,
//         }

//         console.log("Applying filters:", filters)
        
//         let data: ProjectWithProfessional[]
//         if (Object.values(filters).some(Boolean)) {
//           data = await getProjectsWithProfessionalInfo(filters)
//         } else {
//           data = await getProjectsWithProfessionalInfo()
//         }
        
//         console.log("Filtered projects data:", data)
//         console.log("Setting projects state with:", data.length, "projects")
//         setProjects(data)
//       } catch (err) {
//         console.error("Error filtering projects:", err)
//         setError("Failed to filter projects.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchFilteredProjects()
//   }, [selectedCompany, searchTerm])

//   // Filter and sort projects client-side
//   const filteredProjects = useMemo(() => {
//     console.log("Filtering projects, current projects state:", projects)
//     console.log("Projects length:", projects.length)
    
//     let filtered = projects.filter((project) => {
//       const matchesType = selectedType === "All Types" || project.type === selectedType
//       return matchesType
//     })

//     console.log("After type filtering:", filtered.length)

//     // Sort projects
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case "year":
//           return parseInt(b.year) - parseInt(a.year)
//         case "name":
//           return a.name.localeCompare(b.name)
//         case "company":
//           return (a.professional?.company_name || "").localeCompare(b.professional?.company_name || "")
//         case "rating":
//           // Since we don't have rating in the API, we'll sort by year as fallback
//           return parseInt(b.year) - parseInt(a.year)
//         default:
//           return 0
//       }
//     })

//     console.log("Final filtered projects:", filtered)
//     return filtered
//   }, [projects, selectedType, sortBy])

//   const resetFilters = async () => {
//     setSearchTerm("")
//     setSelectedType("All Types")
//     setSelectedCompany("All Companies")
//     setSortBy("year")
    
//     try {
//       setLoading(true)
//       const data = await getProjectsWithProfessionalInfo()
//       setProjects(data)
//     } catch (err) {
//       console.error("Error resetting filters:", err)
//       setError("Failed to reset filters.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//           <h3 className="text-lg font-medium mb-2">Error Loading Projects</h3>
//           <p className="text-muted-foreground mb-4">{error}</p>
//           <Button onClick={() => window.location.reload()}>Try Again</Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold mb-4">Construction Projects</h1>
//         <p className="text-lg text-muted-foreground">
//           Explore our portfolio of completed construction projects across Sri Lanka
//         </p>
//       </div>

//       {/* Search and Filters */}
//       <div className="mb-8 space-y-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               placeholder="Search projects, companies, or descriptions..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Button variant="outline" onClick={resetFilters} disabled={loading}>
//             <Filter className="h-4 w-4 mr-2" />
//             Reset Filters
//           </Button>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4">
//           <Select value={selectedType} onValueChange={setSelectedType}>
//             <SelectTrigger className="w-full md:w-48">
//               <SelectValue placeholder="Project Type" />
//             </SelectTrigger>
//             <SelectContent>
//               {projectTypes.map((type) => (
//                 <SelectItem key={type} value={type}>
//                   {type}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={selectedCompany} onValueChange={setSelectedCompany}>
//             <SelectTrigger className="w-full md:w-48">
//               <SelectValue placeholder="Company Type" />
//             </SelectTrigger>
//             <SelectContent>
//               {companyTypes.map((company) => (
//                 <SelectItem key={company} value={company}>
//                   {company}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger className="w-full md:w-48">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               {sortOptions.map((option) => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-muted-foreground">
//           {loading ? (
//             <span className="flex items-center gap-2">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Loading projects...
//             </span>
//           ) : (
//             `Showing ${filteredProjects.length} projects`
//           )}
//         </p>
//       </div>

//       {/* Projects Grid */}
//       {loading ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <Card key={index} className="overflow-hidden">
//               <div className="h-32 bg-gray-200 animate-pulse" />
//               <CardContent className="p-6">
//                 <div className="h-6 bg-gray-200 animate-pulse mb-2 rounded" />
//                 <div className="h-4 bg-gray-200 animate-pulse mb-4 rounded" />
//                 <div className="flex gap-4 mb-4">
//                   <div className="h-4 bg-gray-200 animate-pulse rounded flex-1" />
//                   <div className="h-4 bg-gray-200 animate-pulse rounded flex-1" />
//                 </div>
//                 <div className="border-t pt-4">
//                   <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full" />
//                     <div className="flex-1">
//                       <div className="h-4 bg-gray-200 animate-pulse mb-1 rounded" />
//                       <div className="h-3 bg-gray-200 animate-pulse rounded" />
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : filteredProjects.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {filteredProjects.map((project, index) => {
//             // Debug each project
//             console.log(`Rendering project ${index}:`, {
//               id: project.id,
//               pid: project.pid,
//               name: project.name,
//               hasId: !!project.id,
//               idType: typeof project.id
//             })
//             const projectPid = project.pid
//             // Create fallback for missing ID
//             const projectId = project.id || `fallback-${index}`
//             const projectKey = project.id  || `key-${index}`

//             if (!project.id) {
//               console.warn(`Project missing ID:`, project)
//             }

//             return (
          
//                 <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
//                      <Link key={projectKey} href={`/projects/${projectId}`}>
//                   <div className="relative">
//                     <Image
//                       src={project.images?.[0] || "/placeholder.svg?height=300&width=400"}
//                       alt={project.name}
//                       width={400}
//                       height={300}
//                       className="w-full h-32 object-cover"
//                     />
//                     <Badge className="absolute top-3 left-3" variant="secondary">
//                       {project.type}
//                     </Badge>
//                     {project.featured && (
//                       <Badge className="absolute top-3 right-3" variant="default">
//                         Featured
//                       </Badge>
//                     )}
//                   </div>
// </Link>
//                   <CardContent className="p-6">
//                          <Link key={projectKey} href={`/projects/${projectId}`}>
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="text-sm font-semibold line-clamp-1">{project.name}</h3>
//                     </div>

//                     <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

//                     <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
//                       <div className="flex items-center">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         {project.location}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         {project.year}
//                       </div>
//                     </div>

              
// </Link>
//                     {/* Company Summary */}
//                     {project.professional && (
//                          <Link key={projectKey} href={`/professionals/${projectPid}`}>
//                       <div className="border-t pt-4">
//                         <div className="flex items-center gap-3">
//                           <Image
//                             src={project.professional.company_logo_url || "/placeholder.svg?height=20&width=20"}
//                             alt={project.professional.company_name}
//                             width={20}
//                             height={20}
//                             className="rounded-full object-cover"
//                           />
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h4 className="font-medium line-clamp-1">{project.professional.company_name}</h4>
                              
//                             </div>
//                             <Badge variant="outline" className="text-xs">
//                                 {project.professional.company_type}
//                               </Badge>
//                           </div>
//                         </div>
//                       </div>
//                       </Link>
//                     )}
//                   </CardContent>
//                 </Card>
           
//             )
//           })}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//           <h3 className="text-lg font-medium mb-2">No projects found</h3>
//           <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
//           <Button onClick={resetFilters}>Reset Filters</Button>
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Star, MapPin, Calendar, Building2, Loader2, ChevronDown, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  getProjectsWithProfessionalInfo, 
  searchProjects,
  getProjectsWithFilters,
  getProfessionals,
  type ProjectWithProfessional,
  type Professional
} from "@/app/api"

const projectTypes = [
  "All Types",
  "Residential",
  "Commercial", 
  "Industrial",
  "Institutional",
  "Hospitality",
  "Healthcare",
  "Educational",
  "Mixed-Use",
  "Infrastructure",
  "Landscape",
  "Interior Design",
  "Urban Planning",
  "Renovation"
]

const professionalTypes = [
  "All Companies",
  "Architect", 
  "Contractor", 
  "Quantity Surveyor", 
  "Interior Designer", 
  "Structural Engineer"
]

const sortOptions = [
  { value: "year", label: "Year (Newest First)" },
  { value: "name", label: "Name" },
  { value: "company", label: "Company" },
  { value: "rating", label: "Rating" },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedCompanyType, setSelectedCompanyType] = useState("All Companies")
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("year")
  const [projects, setProjects] = useState<ProjectWithProfessional[]>([])
  const [companies, setCompanies] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false)

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getProfessionals()
        setCompanies(companiesData)
      } catch (err) {
        console.error("Error fetching companies:", err)
      }
    }

    fetchCompanies()
  }, [])

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log("Fetching initial projects...")
        const data = await getProjectsWithProfessionalInfo()
        console.log("Fetched projects data:", data)
        console.log("First project ID:", data[0]?.id)
        setProjects(data)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Handle search with debouncing
  useEffect(() => {
    if (!searchTerm.trim()) return

    const debounceTimer = setTimeout(async () => {
      try {
        setLoading(true)
        const searchFilters = {
          type: selectedType !== "All Types" ? selectedType : undefined,
        }
        
        console.log("Searching projects with term:", searchTerm)
        const searchResult = await searchProjects(searchTerm, searchFilters)
        console.log("Search results:", searchResult)
        
        // Get professional info for search results
        const projectsWithProfessional = await Promise.all(
          searchResult.results.map(async (project) => {
            // Since search results might not include professional info,
            // we'll fetch projects with professional info and filter
            const allProjectsWithProfessional = await getProjectsWithProfessionalInfo()
            return allProjectsWithProfessional.find(p => p.id === project.id) || project
          })
        )
        
        console.log("Projects with professional info:", projectsWithProfessional)
        setProjects(projectsWithProfessional)
      } catch (err) {
        console.error("Error searching projects:", err)
        setError("Search failed. Please try again.")
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, selectedType])

  // Handle filters
  useEffect(() => {
    if (searchTerm.trim()) return // Don't filter if actively searching

    const fetchFilteredProjects = async () => {
      try {
        setLoading(true)
        const filters = {
          company_type: selectedCompanyType !== "All Companies" ? selectedCompanyType : undefined,
        }

        console.log("Applying filters:", filters)
        
        let data: ProjectWithProfessional[]
        if (Object.values(filters).some(Boolean)) {
          data = await getProjectsWithProfessionalInfo(filters)
        } else {
          data = await getProjectsWithProfessionalInfo()
        }
        
        console.log("Filtered projects data:", data)
        console.log("Setting projects state with:", data.length, "projects")
        setProjects(data)
      } catch (err) {
        console.error("Error filtering projects:", err)
        setError("Failed to filter projects.")
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredProjects()
  }, [selectedCompanyType, searchTerm])

  // Filter and sort projects client-side
  const filteredProjects = useMemo(() => {
    console.log("Filtering projects, current projects state:", projects)
    console.log("Projects length:", projects.length)
    
    let filtered = projects.filter((project) => {
      const matchesType = selectedType === "All Types" || project.type === selectedType
      const matchesCompany = selectedCompanies.length === 0 || 
        (project.professional && selectedCompanies.includes(project.professional.pid))
      
      return matchesType && matchesCompany
    })

    console.log("After filtering:", filtered.length)

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year":
          return parseInt(b.year) - parseInt(a.year)
        case "name":
          return a.name.localeCompare(b.name)
        case "company":
          return (a.professional?.company_name || "").localeCompare(b.professional?.company_name || "")
        case "rating":
          // Since we don't have rating in the API, we'll sort by year as fallback
          return parseInt(b.year) - parseInt(a.year)
        default:
          return 0
      }
    })

    console.log("Final filtered projects:", filtered)
    return filtered
  }, [projects, selectedType, selectedCompanies, sortBy])

  const resetFilters = async () => {
    setSearchTerm("")
    setSelectedType("All Types")
    setSelectedCompanyType("All Companies")
    setSelectedCompanies([])
    setSortBy("year")
    
    try {
      setLoading(true)
      const data = await getProjectsWithProfessionalInfo()
      setProjects(data)
    } catch (err) {
      console.error("Error resetting filters:", err)
      setError("Failed to reset filters.")
    } finally {
      setLoading(false)
    }
  }

  const handleCompanyToggle = (companyPid: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyPid)
        ? prev.filter(pid => pid !== companyPid)
        : [...prev, companyPid]
    )
  }

  const getSelectedCompanyNames = () => {
    return companies
      .filter(company => selectedCompanies.includes(company.pid))
      .map(company => company.company_name)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Projects</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Construction Projects</h1>
        <p className="text-lg text-muted-foreground">
          Explore our portfolio of completed construction projects across Sri Lanka
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects, companies, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={resetFilters} disabled={loading}>
            <Filter className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCompanyType} onValueChange={setSelectedCompanyType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Company Type" />
            </SelectTrigger>
            <SelectContent>
              {professionalTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Company Selection Dialog */}
          <Dialog open={companyDialogOpen} onOpenChange={setCompanyDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-48 justify-between">
                <span>
                  {selectedCompanies.length === 0 
                    ? "Select Companies"
                    : `${selectedCompanies.length} companies selected`
                  }
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[500px]">
              <DialogHeader>
                <DialogTitle>Select Companies</DialogTitle>
                <DialogDescription>
                  Choose specific companies to filter projects
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {companies.map((company) => (
                  <div
                    key={company.pid}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => handleCompanyToggle(company.pid)}
                  >
                    <div className="flex-shrink-0">
                      {selectedCompanies.includes(company.pid) ? (
                        <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                      )}
                    </div>
                    <div className="flex items-center space-x-3 flex-1">
                      <Image
                        src={company.company_logo_url || "/placeholder.svg?height=32&width=32"}
                        alt={company.company_name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{company.company_name}</p>
                        <p className="text-xs text-muted-foreground">{company.company_type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCompanies([])}
                  size="sm"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setCompanyDialogOpen(false)}
                  size="sm"
                >
                  Apply ({selectedCompanies.length})
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {(selectedCompanies.length > 0 || selectedType !== "All Types" || selectedCompanyType !== "All Companies") && (
          <div className="flex flex-wrap gap-2">
            {selectedType !== "All Types" && (
              <Badge variant="secondary" className="px-3 py-1">
                Type: {selectedType}
                <button
                  onClick={() => setSelectedType("All Types")}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCompanyType !== "All Companies" && (
              <Badge variant="secondary" className="px-3 py-1">
                Company Type: {selectedCompanyType}
                <button
                  onClick={() => setSelectedCompanyType("All Companies")}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            )}
            {getSelectedCompanyNames().map((companyName, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {companyName}
                <button
                  onClick={() => {
                    const company = companies.find(c => c.company_name === companyName)
                    if (company) handleCompanyToggle(company.pid)
                  }}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading projects...
            </span>
          ) : (
            `Showing ${filteredProjects.length} projects`
          )}
        </p>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-32 bg-gray-200 animate-pulse" />
              <CardContent className="p-3">
                <div className="h-4 bg-gray-200 animate-pulse mb-2 rounded" />
                <div className="h-3 bg-gray-200 animate-pulse mb-3 rounded" />
                <div className="flex gap-2 mb-3">
                  <div className="h-3 bg-gray-200 animate-pulse rounded flex-1" />
                  <div className="h-3 bg-gray-200 animate-pulse rounded flex-1" />
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 animate-pulse mb-1 rounded" />
                      <div className="h-2 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredProjects.map((project, index) => {
            // Debug each project
            console.log(`Rendering project ${index}:`, {
              id: project.id,
              pid: project.pid,
              name: project.name,
              hasId: !!project.id,
              idType: typeof project.id
            })
            const projectPid = project.pid
            // Create fallback for missing ID
            const projectId = project.id || `fallback-${index}`
            const projectKey = project.id || `key-${index}`

            if (!project.id) {
              console.warn(`Project missing ID:`, project)
            }

            return (
              <Link key={projectKey} href={`/projects/${projectId}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative">
                    <Image
                      src={project.images?.[0] || "/placeholder.svg?height=200&width=300"}
                      alt={project.name}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
                      {project.type}
                    </Badge>
                    {project.featured && (
                      <Badge className="absolute top-2 right-2 text-xs" variant="default">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-3">
                    <div className="mb-2">
                      <h3 className="text-sm font-semibold line-clamp-2 leading-tight">{project.name}</h3>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>

                    <div className="flex flex-col gap-1 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Company Summary */}
                    {project.professional && (
                      <div className="border-t pt-3">
                        <Link href={`/professionals/${projectPid}`} onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors">
                            <Image
                              src={project.professional.company_logo_url || "/placeholder.svg?height=24&width=24"}
                              alt={project.professional.company_name}
                              width={24}
                              height={24}
                              className="rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-1">
                                <h4 className="text-xs font-medium line-clamp-1">{project.professional.company_name}</h4>
                              </div>
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {project.professional.company_type}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      )}
    </div>
  )
}