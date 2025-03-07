"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label: string
  description?: string
  imageClassName?: string
}

export function ImageUpload({
  value,
  onChange,
  label,
  description,
  imageClassName = "w-full h-40 object-cover",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)
    const res = await fetch('/api/s3-upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error('Failed to upload file');
    }
    console.log(res)
    const { url } = await res.json();
    return url; // Public S3 URL
  }
  
  
  // This is a mock function - in a real app, you would upload to your storage
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      console.log('Uploaded file URL:', url);
      onChange(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative">
          <Image
            src={value || "/placeholder.svg"}
            alt="Uploaded image"
            width={400}
            height={300}
            className={imageClassName}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border rounded-md p-4 border-dashed flex flex-col items-center justify-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">{label}</p>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <Button
            type="button"
            variant="secondary"
            disabled={isUploading}
            className="mt-2"
            onClick={() => document.getElementById(`upload-${label}`)?.click()}
          >
            {isUploading ? "Uploading..." : "Select Image"}
          </Button>
          <input
            id={`upload-${label}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </div>
      )}
    </div>
  )
}

