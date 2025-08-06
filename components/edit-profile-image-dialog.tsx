"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"

interface EditProfileImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImage: string
  onSave: (imageUrl: string) => void
}

export function EditProfileImageDialog({ open, onOpenChange, currentImage, onSave }: EditProfileImageDialogProps) {
  const [image, setImage] = useState(currentImage)

  const handleSave = () => {
    onSave(image)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="py-4">
         <ImageUpload
  value={image}
  onChange={setImage}
  label="Company Logo"
  description="Upload your company logo (square format recommended)"
  dimensions={{ width: 300, height: 300 }}
  enableCrop={true}
  maxFileSize={3}
  quality={90}
  allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
  imageClassName="w-32 h-32 object-cover rounded-xl"
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

