"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ImageUpload } from "@/components/image-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, ChevronRight, MapPin } from "lucide-react"
import { createProfessional, getProfessionalByPID, Professional} from "@/app/api"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function ProfessionalRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const { user } = useUser()
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
    useEffect(() => {
      if (!user?.sub) return
      getProfessionalByPID(user.sub)
      .then((existing: Professional | undefined) => {
        if (existing) setAlreadyRegistered(true)
      })
      .catch((err) => console.error("Failed checking professional by PID:", err))
      getProfessionalByPID(user.sub)
        .then((existing: Professional | undefined) => {
        if (existing) router.push("/professionals/dashboard")
        })
        .catch((err) => console.error("Failed checking professional by PID:", err))
    }, [user?.sub, router])

  const [formData, setFormData] = useState({
    companyName: "",
    type: "",
    email: "",
    telephone: "",
    website: "",
    address: "",
    location: { lat: "", lng: "" },
    description: "",
    founded: "",
    employees: "",
    specialties: [] as string[],
    services: [] as string[],
    certifications: [] as string[],
    logo: "",
    coverImage: "",
  })

  const updateFormData = (field: string, value: string | string[]) => {
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

    const professionalPayload = {
      company_name: formData.companyName,
      company_type: formData.type, // Default value or add a field to collect this
      company_description: formData.description,
      year_founded: parseInt(formData.founded, 10), // Convert to number
      number_of_employees: 1, // Default value or add a field to collect this
      email: formData.email,
      telephone_number: formData.telephone,
      website: "", // Default value or add a field to collect this
      address: formData.address,
      location: {
        latitude: parseFloat(formData.location.lat),
        longitude: parseFloat(formData.location.lng),
      },
      specializations: formData.specialties, // Default value or add a field to collect this
      services_offered: formData.services, // Default value or add a field to collect this
      certifications_accreditations:formData.certifications, // Default value or add a field to collect this
      company_logo_url: formData.logo,
      cover_image_url: formData.coverImage,
      pid: user?.sub || ""
    }
    
    try {
      await createProfessional(professionalPayload)
      router.push("/register/success")
    } catch (err) {
      console.error("Failed to create professional", err)
    }

  }

  const professionalTypes = ["Architect", "Contractor", "Quantity Surveyor", "Interior Designer", "Structural Engineer"]
  const specialtyOptions = [
    "Residential",
    "Commercial",
    "Industrial",
    "Institutional",
    "Sustainable Design",
    "Urban Planning",
    "Interior Design",
    "Landscape Design",
    "Renovation",
    "High-rise Buildings",
    "Infrastructure",
    "Healthcare",
    "Educational",
    "Hospitality",
  ]
  const serviceOptions = [
    "Architectural Design",
    "Construction Management",
    "Cost Estimation",
    "Interior Design",
    "Landscape Design",
    "Project Management",
    "Structural Engineering",
    "MEP Engineering",
    "Urban Planning",
    "Feasibility Studies",
    "Building Information Modeling (BIM)",
    "Sustainable Design Consulting",
    "Construction Supervision",
  ]

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Professional Company Registration</h1>
        <p className="text-muted-foreground">
          Complete your company profile to join our network of trusted professionals.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Company Information"}
            {step === 2 && "Contact Details"}
            {step === 3 && "Specializations & Services"}
            {step === 4 && "Company Images"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about your company"}
            {step === 2 && "How can clients reach you?"}
            {step === 3 && "What services and specialties do you offer?"}
            {step === 4 && "Upload your company logo and cover image"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="registrationForm" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Company Type</Label>
                  <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your company, its history, and what makes it unique"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="founded">Year Founded</Label>
                    <Input
                      id="founded"
                      placeholder="e.g. 2010"
                      value={formData.founded}
                      onChange={(e) => updateFormData("founded", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Select value={formData.employees} onValueChange={(value) => updateFormData("employees", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-500">201-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    placeholder="company@example.com"
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
                    onChange={(e) => updateFormData("telephone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Your company address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude (Optional)</Label>
                    <Input
                      id="latitude"
                      placeholder="e.g. 6.9271"
                      value={formData.location.lat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, lat: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude (Optional)</Label>
                    <Input
                      id="longitude"
                      placeholder="e.g. 79.8612"
                      value={formData.location.lng}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, lng: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-md border-dashed">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Map integration will be available soon. For now, please enter your coordinates manually if known.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Specializations</Label>
                  <p className="text-sm text-muted-foreground mb-3">Select the areas your company specializes in</p>
                  <div className="grid grid-cols-2 gap-2">
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`specialty-${specialty}`}
                          checked={formData.specialties.includes(specialty)}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              updateFormData("specialties", [...formData.specialties, specialty])
                            } else {
                              updateFormData(
                                "specialties",
                                formData.specialties.filter((s) => s !== specialty),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={`specialty-${specialty}`} className="text-sm font-normal">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Services Offered</Label>
                  <p className="text-sm text-muted-foreground mb-3">Select the services your company provides</p>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              updateFormData("services", [...formData.services, service])
                            } else {
                              updateFormData(
                                "services",
                                formData.services.filter((s) => s !== service),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={`service-${service}`} className="text-sm font-normal">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications & Accreditations</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enter any certifications or accreditations your company has (one per line)
                  </p>
                  <Textarea
                    id="certifications"
                    placeholder="e.g. ISO 9001:2015&#10;Chartered Architects&#10;Green Building Council"
                    value={formData.certifications.join("\n")}
                    onChange={(e) =>
                      updateFormData(
                        "certifications",
                        e.target.value.split("\n").filter((c) => c.trim()),
                      )
                    }
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <ImageUpload
                    value={formData.logo}
                    onChange={(url) => updateFormData("logo", url)}
                    label="Upload company logo"
                    description="This will be displayed on your company profile"
                    imageClassName="w-32 h-32 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <ImageUpload
                    value={formData.coverImage}
                    onChange={(url) => updateFormData("coverImage", url)}
                    label="Upload cover image"
                    description="This will be displayed at the top of your company profile"
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
            <Button type="submit" form="registrationForm" className="bg-primary">
              Complete <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
