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
import { updateProfessional } from "@/app/api"
import { ImageWithFallback } from "./ui/ImageWithFallback"
import { Professional } from "@/types"
interface ProfessionalProfileProps {
  professional: Professional
  onUpdate?: (updatedProfessional: ProfessionalProfileProps["professional"]) => void
}

export function ProfessionalProfile({ professional, onUpdate }: ProfessionalProfileProps) {
  const [currentProfessional, setCurrentProfessional] = useState(professional)
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState(false)
  const [isCoverImageDialogOpen, setIsCoverImageDialogOpen] = useState(false)
  const [isProfessionalDetailsDialogOpen, setIsProfessionalDetailsDialogOpen] = useState(false)
  const [isServicesDialogOpen, setIsServicesDialogOpen] = useState(false)

  const handleProfileImageUpdate = async (imageUrl: string) => {
    const updatedProfessional: Professional = {
      ...currentProfessional,
      company_logo_url: imageUrl,
    }
    setCurrentProfessional(updatedProfessional)
    await updateProfessional(currentProfessional.id, updatedProfessional)
    if (onUpdate) onUpdate(updatedProfessional)

  }

  const handleCoverImageUpdate =async (imageUrl: string) => {
    const updatedProfessional: Professional = {
      ...currentProfessional,
      cover_image_url: imageUrl,
    }
    await updateProfessional(currentProfessional.id, updatedProfessional)
    setCurrentProfessional(updatedProfessional)
    if (onUpdate) onUpdate(updatedProfessional)
  }

  const handleProfessionalDetailsUpdate = (details: any) => {
    const updatedProfessional: Professional = {
      ...currentProfessional,
      company_name: details.name,
      company_type: details.type,
      company_description: details.description,
      email: details.email,
      telephone_number: details.phone,
      website: details.website,
      address: details.address,
      year_founded: details.founded ? parseInt(details.founded) : currentProfessional.year_founded,
      number_of_employees: details.employees ? parseInt(details.employees) : currentProfessional.number_of_employees
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
            src={currentProfessional.cover_image_url || "/images/cover-placeholder.svg"}
            alt={`${currentProfessional.company_name} cover`}
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
                src={currentProfessional.company_logo_url || "/images/logo-placeholder.svg"}
                alt={currentProfessional.company_name}
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
                    <h1 className="text-2xl font-bold">{currentProfessional.company_name}</h1>
                    <Badge variant="secondary" className="font-medium">
                      {currentProfessional.company_type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">{currentProfessional.company_description}</p>
                </div>
                <Button onClick={() => setIsProfessionalDetailsDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {typeof currentProfessional.address === "string" ? currentProfessional.address : JSON.stringify(currentProfessional.address)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {currentProfessional.telephone_number}
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
                {currentProfessional.specializations.map((specialty, index) => (
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
        currentImage={currentProfessional.company_logo_url}
        onSave={handleProfileImageUpdate}
      />

      <EditCoverImageDialog
        open={isCoverImageDialogOpen}
        onOpenChange={setIsCoverImageDialogOpen}
        currentImage={currentProfessional.cover_image_url}
        onSave={handleCoverImageUpdate}
      />

      <EditProfessionalDetailsDialog
        open={isProfessionalDetailsDialogOpen}
        onOpenChange={setIsProfessionalDetailsDialogOpen}
        currentDetails={{
          name: currentProfessional.company_name,
          type: currentProfessional.company_type,
          description: currentProfessional.company_description,
          email: currentProfessional.email,
          phone: currentProfessional.telephone_number,
          website: currentProfessional.website,
          address: currentProfessional.address,
          founded: JSON.stringify(currentProfessional.year_founded),
          employees: JSON.stringify(currentProfessional.number_of_employees),
        }}
        onSave={handleProfessionalDetailsUpdate}
      />

      <EditServicesDialog
        open={isServicesDialogOpen}
        onOpenChange={setIsServicesDialogOpen}
        currentServices={(currentProfessional.services_offered || []).map(service => ({
          name: service,
          description: "",
          icon: "Building"
        }))}
        currentSpecialties={currentProfessional.specializations}
        currentCertifications={currentProfessional.certifications_accreditations}
        onSave={handleServicesUpdate}
      />
    </>
  )
}
