"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"

interface Service {
  name: string
  description: string
  icon: string
}

interface EditServicesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentServices: Service[]
  currentSpecialties: string[]
  currentCertifications: string[]
  onSave: (services: Service[], specialties: string[], certifications: string[]) => void
}

export function EditServicesDialog({
  open,
  onOpenChange,
  currentServices,
  currentSpecialties,
  currentCertifications,
  onSave,
}: EditServicesDialogProps) {
  const [services, setServices] = useState<Service[]>(currentServices)
  const [specialties, setSpecialties] = useState<string[]>(currentSpecialties)
  const [certifications, setCertifications] = useState<string[]>(currentCertifications)
  const [newSpecialty, setNewSpecialty] = useState("")

  const handleSave = () => {
    onSave(services, specialties, certifications)
    onOpenChange(false)
  }

  const handleAddService = () => {
    setServices([
      ...services,
      {
        name: "",
        description: "",
        icon: "Building",
      },
    ])
  }

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices = [...services]
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    }
    setServices(updatedServices)
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()])
      setNewSpecialty("")
    }
  }

  const handleRemoveSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty))
  }

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Services & Specializations</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Services</h3>
              <Button size="sm" onClick={handleAddService}>
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </div>
            {services.map((service, index) => (
              <div key={index} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Service {index + 1}</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveService(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`service-name-${index}`}>Service Name</Label>
                    <Input
                      id={`service-name-${index}`}
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`service-description-${index}`}>Description</Label>
                    <Textarea
                      id={`service-description-${index}`}
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Specializations</h3>
            <div className="grid gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a specialty"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddSpecialty()
                    }
                  }}
                />
                <Button onClick={handleAddSpecialty}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {specialty}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 rounded-full"
                      onClick={() => handleRemoveSpecialty(specialty)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Label className="mb-2 block">Common Specialties</Label>
                <div className="grid grid-cols-2 gap-2">
                  {specialtyOptions
                    .filter((option) => !specialties.includes(option))
                    .map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`specialty-${option}`}
                          checked={specialties.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSpecialties([...specialties, option])
                            } else {
                              setSpecialties(specialties.filter((s) => s !== option))
                            }
                          }}
                        />
                        <Label htmlFor={`specialty-${option}`} className="text-sm font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Certifications & Accreditations</h3>
            <Textarea
              placeholder="Enter certifications (one per line)"
              value={certifications.join("\n")}
              onChange={(e) => setCertifications(e.target.value.split("\n").filter((c) => c.trim()))}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
