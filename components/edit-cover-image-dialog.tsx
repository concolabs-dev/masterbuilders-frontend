"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"

interface EditCoverImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImage: string
  onSave: (imageUrl: string) => void
}

export function EditCoverImageDialog({ open, onOpenChange, currentImage, onSave }: EditCoverImageDialogProps) {
  const [image, setImage] = useState(currentImage)

  const handleSave = () => {
    onSave(image)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Cover Photo</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ImageUpload
            value={image}
            onChange={setImage}
            label="Upload cover photo"
            description="This will be displayed at the top of your supplier profile"
            imageClassName="w-full h-40 object-cover rounded-md"
          />
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

