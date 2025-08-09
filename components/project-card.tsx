"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, MapPin, Calendar, Star, StarOff } from "lucide-react"
import { ImageWithFallback } from "./ui/ImageWithFallback"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    type: string
    location: string
    year: string
    description: string
    images: string[]
    featured: boolean
  }
  onEdit: () => void
  onDelete: () => void
  onToggleFeature: () => void
}

export function ProjectCard({ project, onEdit, onDelete, onToggleFeature }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <ImageWithFallback
          src={project.images[0] }
          alt={project.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white"
            onClick={onToggleFeature}
            title={project.featured ? "Remove from featured" : "Mark as featured"}
          >
            {project.featured ? <Star className="h-4 w-4 fill-white" /> : <StarOff className="h-4 w-4" />}
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <Badge variant="secondary" className="mb-2">
              {project.type}
            </Badge>
            <h3 className="font-bold text-lg">{project.name}</h3>
          </div>
        </div>
      </div>
      <CardContent className="flex-1 pt-4">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{project.location}</span>
          <span className="mx-2">•</span>
          <Calendar className="h-4 w-4 mr-1" />
          <span>{project.year}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{project.images.length} Photos</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
