"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Globe, Edit } from "lucide-react"
import { EditProfileImageDialog } from "./edit-profile-image-dialog"
import { EditCoverImageDialog } from "./edit-cover-image-dialog"
import { EditProfessionalDetailsDialog } from "./edit-professional-details-dialog"
import { EditServicesDialog } from "./edit-services-dialog"
import { Badge } from "./ui/badge"

interface ProfessionalProfileProps {
  professional: {
    id: string
    name: string
    type: string
    description: string
    location: string
    phone: string
    email: string
    website: string
    founded: string
    employees: string
    coverImage: string
    logo: string
    specialties: string[]
    services: {
      name: string
      description: string
      icon: string
    }[]
    certifications: string[]
  }
  onUpdate?: (updatedProfessional: ProfessionalProfileProps["professional"]) => void
}

export function ProfessionalProfile({ professional, onUpdate }: ProfessionalProfileProps) {
  const [currentProfessional, setCurrentProfessional] = useState(professional)
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState(false)
  const [isCoverImageDialogOpen, setIsCoverImageDialogOpen] = useState(false)
  const [isProfessionalDetailsDialogOpen, setIsProfessionalDetailsDialogOpen] = useState(false)
  const [isServicesDialogOpen, setIsServicesDialogOpen] = useState(false)

  const handleProfileImageUpdate = (imageUrl: string) => {
    const updatedProfessional = {
      ...currentProfessional,
      logo: imageUrl,
    }
    setCurrentProfessional(updatedProfessional)
    if (onUpdate) onUpdate(updatedProfessional)
  }

  const handleCoverImageUpdate = (imageUrl: string) => {
    const updatedProfessional = {
      ...currentProfessional,
      coverImage: imageUrl,
    }
    setCurrentProfessional(updatedProfessional)
    if (onUpdate) onUpdate(updatedProfessional)
  }

  const handleProfessionalDetailsUpdate = (details: any) => {
    const updatedProfessional = {
      ...currentProfessional,
      ...details,
    }
    setCurrentProfessional(updatedProfessional)
    if (onUpdate) onUpdate(updatedProfessional)
  }

  const handleServicesUpdate = (services: any, specialties: string[], certifications: string[]) => {
    const updatedProfessional = {
      ...currentProfessional,
      services,
      specialties,
      certifications,
    }
    setCurrentProfessional(updatedProfessional)
    if (onUpdate) onUpdate(updatedProfessional)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={currentProfessional.coverImage || "/placeholder.svg?height=400&width=1200"}
            alt={`${currentProfessional.name} cover`}
            fill
            className="object-cover"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
            onClick={() => setIsCoverImageDialogOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        </div>
        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background overflow-hidden bg-background">
              <Image
                src={currentProfessional.logo || "/placeholder.svg?height=200&width=200"}
                alt={currentProfessional.name}
                fill
                className="object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 text-white flex items-center justify-center"
                onClick={() => setIsProfileImageDialogOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="flex-1 pt-10 md:pt-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{currentProfessional.name}</h1>
                    <Badge variant="secondary" className="font-medium">
                      {currentProfessional.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{currentProfessional.description}</p>
                </div>
                <Button onClick={() => setIsProfessionalDetailsDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {currentProfessional.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {currentProfessional.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {currentProfessional.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  {currentProfessional.website}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {currentProfessional.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5">
                    {specialty}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setIsServicesDialogOpen(true)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileImageDialog
        open={isProfileImageDialogOpen}
        onOpenChange={setIsProfileImageDialogOpen}
        currentImage={currentProfessional.logo}
        onSave={handleProfileImageUpdate}
      />

      <EditCoverImageDialog
        open={isCoverImageDialogOpen}
        onOpenChange={setIsCoverImageDialogOpen}
        currentImage={currentProfessional.coverImage}
        onSave={handleCoverImageUpdate}
      />

      <EditProfessionalDetailsDialog
        open={isProfessionalDetailsDialogOpen}
        onOpenChange={setIsProfessionalDetailsDialogOpen}
        currentDetails={{
          name: currentProfessional.name,
          type: currentProfessional.type,
          description: currentProfessional.description,
          email: currentProfessional.email,
          phone: currentProfessional.phone,
          website: currentProfessional.website,
          address: currentProfessional.location,
          founded: currentProfessional.founded,
          employees: currentProfessional.employees,
        }}
        onSave={handleProfessionalDetailsUpdate}
      />

      <EditServicesDialog
        open={isServicesDialogOpen}
        onOpenChange={setIsServicesDialogOpen}
        currentServices={currentProfessional.services}
        currentSpecialties={currentProfessional.specialties}
        currentCertifications={currentProfessional.certifications}
        onSave={handleServicesUpdate}
      />
    </>
  )
}
