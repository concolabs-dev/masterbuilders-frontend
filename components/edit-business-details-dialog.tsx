"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BusinessDetails {
  name: string
  description: string
  email: string
  telephone: string
  address: string
  location: { lat: string; lng: string }
}

interface EditBusinessDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentDetails: BusinessDetails
  onSave: (details: BusinessDetails) => void
}

export function EditBusinessDetailsDialog({
  open,
  onOpenChange,
  currentDetails,
  onSave,
}: EditBusinessDetailsDialogProps) {
  const [details, setDetails] = useState<BusinessDetails>(currentDetails)

  const handleChange = (field: keyof BusinessDetails, value: string) => {
    if (field === "lat" || field === "lng") {
      setDetails({
        ...details,
        location: {
          ...details.location,
          [field]: value,
        },
      })
    } else {
      setDetails({
        ...details,
        [field]: value,
      })
    }
  }

  const handleSave = () => {
    onSave(details)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Business Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" value={details.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-description">Business Description</Label>
            <Textarea
              id="business-description"
              value={details.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="business-email">Email</Label>
              <Input
                id="business-email"
                type="email"
                value={details.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business-telephone">Telephone</Label>
              <Input
                id="business-telephone"
                value={details.telephone}
                onChange={(e) => handleChange("telephone", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-address">Address</Label>
            <Textarea
              id="business-address"
              value={details.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="business-lat">Latitude</Label>
              <Input
                id="business-lat"
                value={details.location.lat}
                onChange={(e) => handleChange("lat", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="business-lng">Longitude</Label>
              <Input
                id="business-lng"
                value={details.location.lng}
                onChange={(e) => handleChange("lng", e.target.value)}
              />
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