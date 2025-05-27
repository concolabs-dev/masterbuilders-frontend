"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfessionalDetails {
  name: string
  type: string
  description: string
  email: string
  phone: string
  website: string
  address: string
  founded: string
  employees: string
}

interface EditProfessionalDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentDetails: ProfessionalDetails
  onSave: (details: ProfessionalDetails) => void
}

export function EditProfessionalDetailsDialog({
  open,
  onOpenChange,
  currentDetails,
  onSave,
}: EditProfessionalDetailsDialogProps) {
  const [details, setDetails] = useState<ProfessionalDetails>(currentDetails)

  const handleChange = (field: keyof ProfessionalDetails, value: string) => {
    setDetails({
      ...details,
      [field]: value,
    })
  }

  const handleSave = () => {
    onSave(details)
    onOpenChange(false)
  }

  const professionalTypes = ["Architect", "Contractor", "Quantity Surveyor", "Interior Designer", "Structural Engineer"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Company Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" value={details.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company-type">Company Type</Label>
            <Select value={details.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger id="company-type">
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
          <div className="grid gap-2">
            <Label htmlFor="company-description">Company Description</Label>
            <Textarea
              id="company-description"
              value={details.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company-email">Email</Label>
              <Input
                id="company-email"
                type="email"
                value={details.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-phone">Phone</Label>
              <Input id="company-phone" value={details.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company-website">Website</Label>
            <Input
              id="company-website"
              value={details.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company-address">Address</Label>
            <Textarea
              id="company-address"
              value={details.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company-founded">Year Founded</Label>
              <Input
                id="company-founded"
                value={details.founded}
                onChange={(e) => handleChange("founded", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-employees">Number of Employees</Label>
              <Select value={details.employees} onValueChange={(value) => handleChange("employees", value)}>
                <SelectTrigger id="company-employees">
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
