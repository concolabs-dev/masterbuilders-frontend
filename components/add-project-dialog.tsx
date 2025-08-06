"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { Trash2 } from "lucide-react"

interface AddProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (project: any) => void
}

export function AddProjectDialog({ open, onOpenChange, onSubmit }: AddProjectDialogProps) {
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState("")
  const [projectLocation, setProjectLocation] = useState("")
  const [projectYear, setProjectYear] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectImages, setProjectImages] = useState<string[]>([])

  const handleSubmit = () => {
    const newProject = {
      name: projectName,
      type: projectType,
      location: projectLocation,
      year: projectYear,
      description: projectDescription,
      images: projectImages,
    }

    onSubmit(newProject)
    resetForm()
  }

  const resetForm = () => {
    setProjectName("")
    setProjectType("")
    setProjectLocation("")
    setProjectYear("")
    setProjectDescription("")
    setProjectImages([])
  }

  const handleAddImage = (url: string) => {
    setProjectImages([...projectImages, url])
  }

  const handleRemoveImage = (index: number) => {
    setProjectImages(projectImages.filter((_, i) => i !== index))
  }

  const projectTypes = [
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
    "Renovation",
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString())

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm()
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>Add a new project to showcase your work.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-year">Year Completed</Label>
              <Select value={projectYear} onValueChange={setProjectYear}>
                <SelectTrigger id="project-year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-location">Location</Label>
            <Input
              id="project-location"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              placeholder="City, Country"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe the project, its features, and your role"
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label>Project Images</Label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {projectImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
           <ImageUpload
  value=""
  onChange={handleAddImage}
  label="Project Image"
  description="Upload project showcase image"
  dimensions={{ width: 800, height: 600 }}
  enableCrop={true}
  maxFileSize={6}
  quality={85}
  allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
  imageClassName="w-full h-48 object-cover rounded-lg"
/>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!projectName || !projectType || !projectLocation || !projectYear}>
            Add Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
