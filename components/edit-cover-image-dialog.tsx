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
  label="Cover Image"
  description="Upload a cover image for your company profile"
  dimensions={{ width: 1200, height: 400 }}
  enableCrop={true}
  maxFileSize={8}
  quality={85}
  allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
  imageClassName="w-full h-40 object-cover rounded-xl"
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

