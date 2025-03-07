// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"
// import { ImageUpload } from "@/components/image-upload"
// import { Check, ChevronRight, MapPin } from "lucide-react"

// function SupplierOnboarding() {
//   const router = useRouter()
//   const [step, setStep] = useState(1)
//   const totalSteps = 5
//   const progress = (step / totalSteps) * 100
//   const {user, error, isLoading} = useUser();
//   console.log(user)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     telephone: "",
//     address: "",
//     location: { lat: "", lng: "" },
//     profileImage: "",
//     coverImage: "",
//     description: "",
//   })

//   const updateFormData = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value })
//   }

//   const handleNext = () => {
//     if (step < totalSteps) {
//       setStep(step + 1)
//       window.scrollTo(0, 0)
//     }
//   }

//   const handleBack = () => {
//     if (step > 1) {
//       setStep(step - 1)
//       window.scrollTo(0, 0)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you would typically send the data to your API
    
//     console.log("Form submitted:", formData)

//     // Redirect to success page or dashboard
//     router.push("/onboarding/success")
//   }
// // In a client component (e.g., within your ImageUpload component)

//   return (
//     <div className="container max-w-3xl py-10">
//       <div className="mb-8 space-y-4">
//         <h1 className="text-3xl font-bold">Supplier Onboarding</h1>
//         <p className="text-muted-foreground">Complete your profile to join our network of trusted suppliers.</p>
//       </div>

//       <div className="mb-8">
//         <div className="flex justify-between mb-2">
//           <span className="text-sm font-medium">
//             Step {step} of {totalSteps}
//           </span>
//           <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
//         </div>
//         <Progress value={progress} className="h-2" />
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>
//             {step === 1 && "Basic Information"}
//             {step === 2 && "Contact Details"}
//             {step === 3 && "Location"}
//             {step === 4 && "Profile Images"}
//           </CardTitle>
//           <CardDescription>
//             {step === 1 && "Tell us about your business"}
//             {step === 2 && "How can customers reach you?"}
//             {step === 3 && "Where are you located?"}
//             {step === 4 && "Upload your profile and cover images"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form id="onboardingForm" onSubmit={handleSubmit}>
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Business Name</Label>
//                   <Input
//                     id="name"
//                     placeholder="Your business name"
//                     value={formData.name}
//                     onChange={(e) => updateFormData("name", e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="description">Business Description</Label>
//                   <Textarea
//                     id="description"
//                     placeholder="Tell us about your business and the products/services you offer"
//                     value={formData.description}
//                     onChange={(e) => updateFormData("description", e.target.value)}
//                     className="min-h-[120px]"
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="your@email.com"
//                     value={formData.email}
//                     onChange={(e) => updateFormData("email", e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="telephone">Telephone Number</Label>
//                   <Input
//                     id="telephone"
//                     type="tel"
//                     placeholder="Your contact number"
//                     value={formData.telephone}
//                     onChange={(e) => updateFormData("telephone", e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="address">Address</Label>
//                   <Textarea
//                     id="address"
//                     placeholder="Your business address"
//                     value={formData.address}
//                     onChange={(e) => updateFormData("address", e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="latitude">Latitude</Label>
//                     <Input
//                       id="latitude"
//                       placeholder="e.g. 6.9271"
//                       value={formData.location.lat}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           location: { ...formData.location, lat: e.target.value },
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="longitude">Longitude</Label>
//                     <Input
//                       id="longitude"
//                       placeholder="e.g. 79.8612"
//                       value={formData.location.lng}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           location: { ...formData.location, lng: e.target.value },
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-center p-4 border rounded-md border-dashed">
//                   <div className="text-center">
//                     <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
//                     <p className="text-sm text-muted-foreground">
//                       Map integration will be available soon. For now, please enter your coordinates manually.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 4 && (
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <Label>Profile Picture</Label>
//                   <ImageUpload
//                     value={formData.profileImage}
//                     onChange={(url) => updateFormData("profileImage", url)}
//                     label="Upload profile picture"
//                     description="This will be displayed on your supplier profile"
//                     imageClassName="w-32 h-32 rounded-full object-cover"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Cover Image</Label>
//                   <ImageUpload
//                     value={formData.coverImage}
//                     onChange={(url) => {updateFormData("coverImage", url); console.log("efwfege",url)}}
//                     label="Upload cover image"
//                     description="This will be displayed at the top of your supplier profile"
//                     imageClassName="w-full h-40 object-cover rounded-md"
//                   />
//                 </div>
//               </div>
//             )}
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={handleBack} disabled={step === 1}>
//             Back
//           </Button>
//           {step < totalSteps ? (
//             <Button onClick={handleNext}>
//               Continue <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           ) : (
//             <Button type="submit" form="onboardingForm" className="bg-primary">
//               Complete <Check className="ml-2 h-4 w-4" />
//             </Button>
//           )}
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default withPageAuthRequired(SupplierOnboarding)
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ImageUpload } from "@/components/image-upload"
import { Check, ChevronRight, MapPin } from "lucide-react"
import { createSupplier } from "../api" // adjust this import as necessary

function SupplierOnboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const progress = (step / totalSteps) * 100
  const { user, error, isLoading } = useUser()
  console.log(user)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    location: { lat: "", lng: "" },
    profileImage: "",
    coverImage: "",
    description: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Build supplier payload matching the API expectations.
    const supplierPayload = {
      email: formData.email,
      pid: user?.sub || "", // using Auth0 user sub as supplier PID
      business_name: formData.name,
      business_description: formData.description,
      telephone: formData.telephone,
      email_given: formData.email, // adjust if needed
      address: formData.address,
      location: {
        latitude: parseFloat(formData.location.lat),
        longitude: parseFloat(formData.location.lng),
      },
      profile_pic_url: formData.profileImage,
      cover_pic_url: formData.coverImage,
    }
    console.log("Supplier payload:", supplierPayload)
    try {
      const createdSupplier = await createSupplier(supplierPayload)
      console.log("Supplier created:", createdSupplier)
      router.push("/onboarding/success")
    } catch (err) {
      console.error("Failed to create supplier", err)
      // Optionally add error handling UI here.
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Supplier Onboarding</h1>
        <p className="text-muted-foreground">
          Complete your profile to join our network of trusted suppliers.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Information"}
            {step === 2 && "Contact Details"}
            {step === 3 && "Location"}
            {step === 4 && "Profile Images"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about your business"}
            {step === 2 && "How can customers reach you?"}
            {step === 3 && "Where are you located?"}
            {step === 4 && "Upload your profile and cover images"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="onboardingForm" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name</Label>
                  <Input
                    id="name"
                    placeholder="Your business name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business and the products/services you offer"
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone Number</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Your contact number"
                    value={formData.telephone}
                    onChange={(e) =>
                      updateFormData("telephone", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Your business address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g. 6.9271"
                      value={formData.location.lat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: {
                            ...formData.location,
                            lat: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g. 79.8612"
                      value={formData.location.lng}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: {
                            ...formData.location,
                            lng: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-md border-dashed">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Map integration will be available soon. For now, please
                      enter your coordinates manually.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <ImageUpload
                    value={formData.profileImage}
                    onChange={(url) => updateFormData("profileImage", url)}
                    label="Upload profile picture"
                    description="This will be displayed on your supplier profile"
                    imageClassName="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <ImageUpload
                    value={formData.coverImage}
                    onChange={(url) => {
                      updateFormData("coverImage", url)
                      console.log("cover image url:", url)
                    }}
                    label="Upload cover image"
                    description="This will be displayed at the top of your supplier profile"
                    imageClassName="w-full h-40 object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" form="onboardingForm" className="bg-primary">
              Complete <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default withPageAuthRequired(SupplierOnboarding)
