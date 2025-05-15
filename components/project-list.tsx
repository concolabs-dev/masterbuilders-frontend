"use client"

import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Star, StarOff } from "lucide-react"

interface ProjectListProps {
  projects: {
    id: string
    name: string
    type: string
    location: string
    year: string
    description: string
    images: string[]
    featured: boolean
  }[]
  onEdit: (project: any) => void
  onDelete: (id: string) => void
  onToggleFeature: (id: string) => void
}

export function ProjectList({ projects, onEdit, onDelete, onToggleFeature }: ProjectListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No projects found. Add your first project to showcase your work.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="relative h-10 w-10 rounded-md overflow-hidden">
                    <Image
                      src={project.images[0] || "/placeholder.svg?height=40&width=40"}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {project.name}
                    {project.featured && <Star className="h-4 w-4 fill-primary text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{project.type}</Badge>
                </TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{project.year}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleFeature(project.id)}
                      title={project.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      {project.featured ? (
                        <Star className="h-4 w-4 fill-primary text-primary" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => onDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
