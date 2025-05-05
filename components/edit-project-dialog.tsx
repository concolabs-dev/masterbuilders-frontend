"use client"

import { useState, useEffect } from "react"
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

interface EditProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: string
    name: string
    type: string
    location: string
    year: string
    description: string
    images: string[]
    featured: boolean
  } | null
  onSubmit: (project: any) => void
}

export function EditProjectDialog({ open, onOpenChange, project, onSubmit }: EditProjectDialogProps) {
  const [projectName, setProjectName] = useState("")
  const [projectType, setProjectType] = useState("")
  const [projectLocation, setProjectLocation] = useState("")
  const [projectYear, setProjectYear] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectImages, setProjectImages] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)

  useEffect(() => {
    if (project) {
      setProjectName(project.name)
      setProjectType(project.type)
      setProjectLocation(project.location)
      setProjectYear(project.year)
      setProjectDescription(project.description)
      setProjectImages(project.images)
      setFeatured(project.featured)
    }
  }, [project])

  const handleSubmit = () => {
    if (!project) return

    const updatedProject = {
      name: projectName,
      type: projectType,
      location: projectLocation,
      year: projectYear,
      description: projectDescription,
      images: projectImages,
      featured,
    }

    onSubmit(updatedProject)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Make changes to your project details.</DialogDescription>
        </DialogHeader>
        {project && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-project-name">Project Name</Label>
              <Input id="edit-project-name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-project-type">Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger id="edit-project-type">
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
                <Label htmlFor="edit-project-year">Year Completed</Label>
                <Select value={projectYear} onValueChange={setProjectYear}>
                  <SelectTrigger id="edit-project-year">
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
              <Label htmlFor="edit-project-location">Location</Label>
              <Input
                id="edit-project-location"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-project-description">Description</Label>
              <Textarea
                id="edit-project-description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Project Images</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="mr-2"
                  />
                  <Label htmlFor="featured" className="text-sm font-normal">
                    Featured Project
                  </Label>
                </div>
              </div>
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
                label="Add project image"
                description="Upload images of your project"
                imageClassName="w-full h-40 object-cover rounded-md"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
