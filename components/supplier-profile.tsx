

// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { MapPin, Phone, Mail, Edit } from "lucide-react"
// import { EditProfileImageDialog } from "./edit-profile-image-dialog"
// import { EditCoverImageDialog } from "./edit-cover-image-dialog"
// import { EditBusinessDetailsDialog } from "./edit-business-details-dialog"
// import { updateSupplier } from "@/app/api"

// interface SupplierProfileProps {
//   supplier: {
//     id: string
//     name: string
//     email: string
//     telephone: string
//     address: string
//     location: { lat: string; lng: string }
//     profileImage: string
//     coverImage: string
//     description: string
//   }
//   onUpdate?: (updatedSupplier: SupplierProfileProps["supplier"]) => void
//   admin?: boolean
// }

// export interface Location {
//   latitude: number
//   longitude: number
// }

// export interface Supplier {
//   id: string
//   email: string
//   pid: string
//   business_name: string
//   business_description: string
//   telephone: string
//   email_given: string
//   address: string
//   location?: Location
//   profile_pic_url: string
//   cover_pic_url: string
// }

// // Type for business details coming from the dialog
// interface BusinessDetails {
//   name: string
//   description: string
//   email: string
//   telephone: string
//   address: string
//   location: { lat: string; lng: string }
// }

// export function SupplierProfile({ supplier, onUpdate,admin }: SupplierProfileProps) {
//   const [currentSupplier, setCurrentSupplier] = useState(supplier)
//   const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState(false)
//   const [isCoverImageDialogOpen, setIsCoverImageDialogOpen] = useState(false)
//   const [isBusinessDetailsDialogOpen, setIsBusinessDetailsDialogOpen] = useState(false)

//   const handleProfileImageUpdate = async (imageUrl: string) => {
//     try {
//       const updatedSupplier: Supplier = await updateSupplier(currentSupplier.id, {
//         profile_pic_url: imageUrl,
//       })

//       setCurrentSupplier((prev) => ({
//         ...prev,
//         profileImage: updatedSupplier.profile_pic_url,
//       }))

//       if (onUpdate)
//         onUpdate({
//           ...currentSupplier,
//           profileImage: updatedSupplier.profile_pic_url,
//         })
//         window.location.reload()
//     } catch (error) {
//       console.error("Error updating profile image:", error)
//     }
//   }

//   const handleCoverImageUpdate = async (imageUrl: string) => {
//     try {
//       const updatedSupplier: Supplier = await updateSupplier(currentSupplier.id, {
//         cover_pic_url: imageUrl,
//       })

//       setCurrentSupplier((prev) => ({
//         ...prev,
//         coverImage: updatedSupplier.cover_pic_url,
//       }))

//       if (onUpdate)
//         onUpdate({
//           ...currentSupplier,
//           coverImage: updatedSupplier.cover_pic_url,
//         })
//         window.location.reload()
//     } catch (error) {
//       console.error("Error updating cover image:", error)
//     }
//   }

//   const handleBusinessDetailsUpdate = async (details: BusinessDetails) => {
//     try {
//       const updatedSupplier: Supplier = await updateSupplier(currentSupplier.id, {
//         business_name: details.name,
//         business_description: details.description,
//         email_given: details.email,
//         telephone: details.telephone,
//         address: details.address,
//         // Convert the string values to numbers for the API call
//         location: {
//           latitude: Number(details.location.lat),
//           longitude: Number(details.location.lng),
//         },
//       })

//       // Use the returned location if available; otherwise, fallback to the details provided.
//       const newLocation =
//         updatedSupplier.location && updatedSupplier.location.latitude !== undefined
//           ? {
//               lat: updatedSupplier.location.latitude.toString(),
//               lng: updatedSupplier.location.longitude.toString(),
//             }
//           : details.location

//       setCurrentSupplier((prev) => ({
//         ...prev,
//         name: updatedSupplier.business_name,
//         description: updatedSupplier.business_description,
//         email: updatedSupplier.email_given,
//         telephone: updatedSupplier.telephone,
//         address: updatedSupplier.address,
//         location: newLocation,
//       }))

//       if (onUpdate) {
//         onUpdate({
//           ...currentSupplier,
//           name: updatedSupplier.business_name,
//           description: updatedSupplier.business_description,
//           email: updatedSupplier.email_given,
//           telephone: updatedSupplier.telephone,
//           address: updatedSupplier.address,
//           location: newLocation,
//         })
//       }
//       window.location.reload()
//     } catch (error) {
//       console.error("Error updating business details:", error)
//     }
//   }


//   return (
//     <>
//       <Card className="overflow-hidden">
//         <div className="relative h-48 md:h-64 w-full">
//           <Image
//             src={currentSupplier.coverImage || "/placeholder.svg?height=400&width=800"}
//             alt={`${currentSupplier.name} cover`}
//             fill
//             className="object-cover"
//           />
//           <Button
//             size="sm"
//             variant="ghost"
//             className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
//             onClick={() => setIsCoverImageDialogOpen(true)}
//           >
//             <Edit className="h-4 w-4 mr-2" />
//             Edit Cover
//           </Button>
//         </div>
//         <CardContent className="pt-0">
//           <div className="flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16">
//             <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full shadow-md border-4 border-background overflow-hidden bg-background">
//               <Image
//                 src={currentSupplier.profileImage || "/placeholder.svg?height=200&width=200"}
//                 alt={currentSupplier.name}
//                 fill
//                 className="object-cover"
//               />
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 text-white flex items-center justify-center"
//                 onClick={() => setIsProfileImageDialogOpen(true)}
//               >
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit
//               </Button>
//             </div>
//             <div className="flex-1 pt-10 md:pt-20">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-2xl font-bold">{currentSupplier.name}</h1>
//                   <p className="text-muted-foreground mt-1">{currentSupplier.description}</p>
//                 </div>
//                 <Button onClick={() => setIsBusinessDetailsDialogOpen(true)}>
//                   <Edit className="h-4 w-4 mr-2" />
//                   Edit Profile
//                 </Button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <MapPin className="h-4 w-4 mr-2" />
//                   {currentSupplier.address}
//                 </div>
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <Phone className="h-4 w-4 mr-2" />
//                   {currentSupplier.telephone}
//                 </div>
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <Mail className="h-4 w-4 mr-2" />
//                   {currentSupplier.email}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <EditProfileImageDialog
//         open={isProfileImageDialogOpen}
//         onOpenChange={setIsProfileImageDialogOpen}
//         currentImage={currentSupplier.profileImage}
//         onSave={handleProfileImageUpdate}
//       />

//       <EditCoverImageDialog
//         open={isCoverImageDialogOpen}
//         onOpenChange={setIsCoverImageDialogOpen}
//         currentImage={currentSupplier.coverImage}
//         onSave={handleCoverImageUpdate}
//       />

//       <EditBusinessDetailsDialog
//         open={isBusinessDetailsDialogOpen}
//         onOpenChange={setIsBusinessDetailsDialogOpen}
//         currentDetails={{
//           name: currentSupplier.name,
//           description: currentSupplier.description,
//           email: currentSupplier.email,
//           telephone: currentSupplier.telephone,
//           address: currentSupplier.address,
//           location: currentSupplier.location,
//         }}
//         onSave={handleBusinessDetailsUpdate}
//       />
//     </>
//   )
// }
"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Edit } from "lucide-react"
import { EditProfileImageDialog } from "./edit-profile-image-dialog"
import { EditCoverImageDialog } from "./edit-cover-image-dialog"
import { EditBusinessDetailsDialog } from "./edit-business-details-dialog"
import { updateSupplier } from "@/app/api"
import { ImageWithFallback } from "./ui/ImageWithFallback"
import { Location, Supplier } from "@/types"

interface SupplierProfileProps {
  supplier: {
    id: string
    name: string
    email: string
    telephone: string
    address: string
    location: { lat: string; lng: string }
    profileImage: string
    coverImage: string
    description: string
  }
  onUpdate?: (updatedSupplier: SupplierProfileProps["supplier"]) => void
  admin?: boolean
}

// Type for business details coming from the dialog
interface BusinessDetailsProps {
  name: string
  description: string
  email: string
  telephone: string
  address: string
  location: { lat: string; lng: string }
}

export function SupplierProfile({ supplier, onUpdate, admin }: SupplierProfileProps) {
  const [currentSupplier, setCurrentSupplier] = useState(supplier)
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState(false)
  const [isCoverImageDialogOpen, setIsCoverImageDialogOpen] = useState(false)
  const [isBusinessDetailsDialogOpen, setIsBusinessDetailsDialogOpen] = useState(false)

  const handleProfileImageUpdate = async (imageUrl: string) => {
    try {
      const updatedSupplier: Supplier = await updateSupplier(currentSupplier.id, {
        profile_pic_url: imageUrl,
      })

      setCurrentSupplier((prev) => ({
        ...prev,
        profileImage: updatedSupplier.profile_pic_url,
      }))

      if (onUpdate)
        onUpdate({
          ...currentSupplier,
          profileImage: updatedSupplier.profile_pic_url,
        })
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile image:", error)
    }
  }
  console.log(currentSupplier)
  const handleCoverImageUpdate = async (imageUrl: string) => {
    try {
      const updatedSupplier: Supplier = await updateSupplier(currentSupplier.id, {
        cover_pic_url: imageUrl,
      })

      setCurrentSupplier((prev) => ({
        ...prev,
        coverImage: updatedSupplier.cover_pic_url,
      }))

      if (onUpdate)
        onUpdate({
          ...currentSupplier,
          coverImage: updatedSupplier.cover_pic_url,
        })
      window.location.reload()
    } catch (error) {
      console.error("Error updating cover image:", error)
    }
  }

  const handleBusinessDetailsUpdate = async (details: BusinessDetailsProps) => {
    try {
      const updatedSupplier: Supplier = await updateSupplier(currentSupplier.id, {
        business_name: details.name,
        business_description: details.description,
        email_given: details.email,
        telephone: details.telephone,
        address: details.address,
        // Convert the string values to numbers for the API call
        location: {
          latitude: Number(details.location.lat),
          longitude: Number(details.location.lng),
        },
      })

      // Use the returned location if available; otherwise, fallback to the details provided.
      const newLocation =
        updatedSupplier.location && updatedSupplier.location.latitude !== undefined
          ? {
              lat: updatedSupplier.location.latitude.toString(),
              lng: updatedSupplier.location.longitude.toString(),
            }
          : details.location

      setCurrentSupplier((prev) => ({
        ...prev,
        name: updatedSupplier.business_name,
        description: updatedSupplier.business_description,
        email: updatedSupplier.email_given,
        telephone: updatedSupplier.telephone,
        address: updatedSupplier.address,
        location: newLocation,
      }))

      if (onUpdate) {
        onUpdate({
          ...currentSupplier,
          name: updatedSupplier.business_name,
          description: updatedSupplier.business_description,
          email: updatedSupplier.email_given,
          telephone: updatedSupplier.telephone,
          address: updatedSupplier.address,
          location: newLocation,
        })
      }
      window.location.reload()
    } catch (error) {
      console.error("Error updating business details:", error)
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={currentSupplier.coverImage || "/placeholder.svg?height=400&width=800"}
            alt={`${currentSupplier.name} cover`}
            fill
            className="object-cover"
          />
          {admin && (
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => setIsCoverImageDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          )}
        </div>
        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16">
            <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full shadow-md border-4 border-background overflow-hidden bg-background">
              <Image
                src={currentSupplier.profileImage || "/placeholder.svg?height=200&width=200"}
                alt={currentSupplier.name}
                fill
                className="object-cover"
              />
              {admin && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 text-white flex items-center justify-center"
                  onClick={() => setIsProfileImageDialogOpen(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <div className="flex-1 pt-10 md:pt-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{currentSupplier.name}</h1>
                  <p className="text-muted-foreground mt-1">{currentSupplier.description}</p>
                </div>
                {admin && (
                  <Button onClick={() => setIsBusinessDetailsDialogOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {currentSupplier.address}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {currentSupplier.telephone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {currentSupplier.email}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {admin && (
        <>
          <EditProfileImageDialog
            open={isProfileImageDialogOpen}
            onOpenChange={setIsProfileImageDialogOpen}
            currentImage={currentSupplier.profileImage}
            onSave={handleProfileImageUpdate}
          />

          <EditCoverImageDialog
            open={isCoverImageDialogOpen}
            onOpenChange={setIsCoverImageDialogOpen}
            currentImage={currentSupplier.coverImage}
            onSave={handleCoverImageUpdate}
          />

          <EditBusinessDetailsDialog
            open={isBusinessDetailsDialogOpen}
            onOpenChange={setIsBusinessDetailsDialogOpen}
            currentDetails={{
              name: currentSupplier.name,
              description: currentSupplier.description,
              email: currentSupplier.email,
              telephone: currentSupplier.telephone,
              address: currentSupplier.address,
              location: currentSupplier.location,
            }}
            onSave={handleBusinessDetailsUpdate}
          />
        </>
      )}
    </>
  )
}