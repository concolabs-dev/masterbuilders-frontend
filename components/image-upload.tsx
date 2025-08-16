"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X, Crop, RotateCw, ZoomIn, ZoomOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface ImageDimensions {
  width: number
  height: number
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label: string
  description?: string
  imageClassName?: string
  dimensions?: ImageDimensions
  enableCrop?: boolean
  maxFileSize?: number // in MB
  quality?: number // WebP quality (0-100)
  allowedFormats?: string[]
  aspectRatio?: number // width/height ratio for crop area
}

export function ImageUpload({
  value,
  onChange,
  label,
  description,
  imageClassName = "w-full h-40 object-cover",
  dimensions = { width: 800, height: 600 },
  enableCrop = false,
  maxFileSize = 5,
  quality = 80,
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  aspectRatio = dimensions.width / dimensions.height,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cropPreview, setCropPreview] = useState<string>("")
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cropContainerRef = useRef<HTMLDivElement>(null)

  // Calculate crop area based on aspect ratio
  const calculateCropArea = useCallback((containerWidth: number, containerHeight: number) => {
    let cropWidth, cropHeight;
    
    if (aspectRatio) {
      // Use provided aspect ratio
      if (containerWidth / containerHeight > aspectRatio) {
        cropHeight = Math.min(containerHeight * 0.8, 300);
        cropWidth = cropHeight * aspectRatio;
      } else {
        cropWidth = Math.min(containerWidth * 0.8, 300);
        cropHeight = cropWidth / aspectRatio;
      }
    } else {
      // Use target dimensions aspect ratio
      const targetAspectRatio = dimensions.width / dimensions.height;
      if (containerWidth / containerHeight > targetAspectRatio) {
        cropHeight = Math.min(containerHeight * 0.8, 300);
        cropWidth = cropHeight * targetAspectRatio;
      } else {
        cropWidth = Math.min(containerWidth * 0.8, 300);
        cropHeight = cropWidth / targetAspectRatio;
      }
    }

    return {
      x: (containerWidth - cropWidth) / 2,
      y: (containerHeight - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
    };
  }, [aspectRatio, dimensions]);

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!allowedFormats.includes(file.type)) {
      return `Invalid file format. Allowed formats: ${allowedFormats.map(f => f.split('/')[1]).join(', ')}`
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size too large. Maximum size: ${maxFileSize}MB`
    }
    
    return null
  }

  // Convert image to WebP with crop
const convertToWebP = (
  file: File,
  targetDimensions: ImageDimensions,
  cropData: CropArea,
  imageElement: HTMLImageElement,
  containerElement: HTMLDivElement
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    // Target canvas
    canvas.width = targetDimensions.width
    canvas.height = targetDimensions.height
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const containerRect = containerElement.getBoundingClientRect()
    const imageRect = imageElement.getBoundingClientRect()

    // Compute the displayed image area inside the <img> (object-contain + zoom)
    const naturalW = imageElement.naturalWidth
    const naturalH = imageElement.naturalHeight
    const naturalAR = naturalW / naturalH
    const boxW = imageRect.width
    const boxH = imageRect.height

    let displayedW: number
    let displayedH: number
    if (boxW / boxH > naturalAR) {
      // Height-bound
      displayedH = boxH
      displayedW = boxH * naturalAR
    } else {
      // Width-bound
      displayedW = boxW
      displayedH = boxW / naturalAR
    }

    // The displayed image is centered within the imageRect
    const displayedLeft = imageRect.left + (boxW - displayedW) / 2
    const displayedTop = imageRect.top + (boxH - displayedH) / 2

    // Map crop from container-space to displayed-image space, then to natural space
    const cropLeftAbs = containerRect.left + cropData.x
    const cropTopAbs = containerRect.top + cropData.y

    // Scale factors from displayed pixels to natural pixels
    const scaleX = naturalW / displayedW
    const scaleY = naturalH / displayedH

    let srcX = (cropLeftAbs - displayedLeft) * scaleX
    let srcY = (cropTopAbs - displayedTop) * scaleY
    let srcW = cropData.width * scaleX
    let srcH = cropData.height * scaleY

    // Intersect with natural image bounds to avoid clipping-induced stretching
    if (srcX < 0) {
      srcW += srcX
      srcX = 0
    }
    if (srcY < 0) {
      srcH += srcY
      srcY = 0
    }
    if (srcX + srcW > naturalW) {
      srcW = naturalW - srcX
    }
    if (srcY + srcH > naturalH) {
      srcH = naturalH - srcY
    }
    if (srcW <= 0 || srcH <= 0) {
      reject(new Error('Crop is outside the image bounds'))
      return
    }

    // Preserve aspect ratio in destination (letterbox into target canvas)
    const scale = Math.min(canvas.width / srcW, canvas.height / srcH)
    const destW = srcW * scale
    const destH = srcH * scale
    const destX = (canvas.width - destW) / 2
    const destY = (canvas.height - destH) / 2

    // Rotation is ignored during export for now (preview-only)
    ctx.drawImage(
      imageElement,
      Math.round(srcX),
      Math.round(srcY),
      Math.round(srcW),
      Math.round(srcH),
      Math.round(destX),
      Math.round(destY),
      Math.round(destW),
      Math.round(destH)
    )

    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to convert image'))),
      'image/webp',
      quality / 100
    )
  })
}
  // Upload file to S3
  async function uploadFile(file: Blob): Promise<string> {
    const formData = new FormData()
    formData.append('file', file, 'image.webp')
    
    const res = await fetch('/api/s3-upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Failed to upload file: ${errorText}`)
    }

    const { url } = await res.json()
    return url
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return
    }

    setSelectedFile(file)
    setZoom(1)
    setRotation(0)

    if (enableCrop) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCropPreview(e.target.result as string)
          setShowCropDialog(true)
          // Reset crop area when new image loads
          setTimeout(() => {
            if (cropContainerRef.current) {
              const rect = cropContainerRef.current.getBoundingClientRect()
              setCropArea(calculateCropArea(rect.width, rect.height))
            }
          }, 100)
        }
      }
      reader.readAsDataURL(file)
    } else {
      processAndUpload(file)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Process and upload image
  const processAndUpload = async (file: File, cropData?: CropArea) => {
  setIsUploading(true)
  try {
    let webpBlob: Blob

    if (cropData && imageRef.current && cropContainerRef.current) {
      webpBlob = await convertToWebP(file, dimensions, cropData, imageRef.current, cropContainerRef.current)
    } else {
      // Convert without cropping: preserve aspect ratio (contain)
      webpBlob = await new Promise((resolve, reject) => {
        const img = new window.Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        img.onload = () => {
          canvas.width = dimensions.width
          canvas.height = dimensions.height
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
          const drawW = img.naturalWidth * scale
          const drawH = img.naturalHeight * scale
          const drawX = (canvas.width - drawW) / 2
          const drawY = (canvas.height - drawH) / 2

          ctx.drawImage(img, drawX, drawY, drawW, drawH)

          canvas.toBlob((blob) => {
            if (blob) resolve(blob)
            else reject(new Error('Failed to convert image'))
          }, 'image/webp', quality / 100)
        }

        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = URL.createObjectURL(file)
      })
    }

    const url = await uploadFile(webpBlob)
    onChange(url)
  } catch (error) {
    console.error('Upload failed:', error)
    alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  } finally {
    setIsUploading(false)
  }
}

  // Handle mouse down on crop area
  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault()
    setDragStart({ x: e.clientX, y: e.clientY })
    
    if (action === 'drag') {
      setIsDragging(true)
    } else {
      setIsResizing(true)
    }
  }

  // Handle mouse move
 const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cropContainerRef.current) return

    const containerRect = cropContainerRef.current.getBoundingClientRect()
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    if (isDragging) {
      setCropArea(prev => ({
        ...prev,
        x: Math.max(0, Math.min(prev.x + deltaX, containerRect.width - prev.width)),
        y: Math.max(0, Math.min(prev.y + deltaY, containerRect.height - prev.height)),
      }))
      setDragStart({ x: e.clientX, y: e.clientY })
    }

    if (isResizing) {
      setCropArea(prev => {
        const newWidth = Math.max(50, prev.width + deltaX)
        const newHeight = aspectRatio ? newWidth / aspectRatio : Math.max(50, prev.height + deltaY)
        return {
          ...prev,
          width: Math.min(newWidth, containerRect.width - prev.x),
          height: Math.min(newHeight, containerRect.height - prev.y),
        }
      })
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }, [isDragging, isResizing, dragStart, aspectRatio])

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  // Add event listeners
  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  // Handle crop and upload
  const handleCropAndUpload = () => {
    if (selectedFile) {
      processAndUpload(selectedFile, cropArea)
      setShowCropDialog(false)
      setSelectedFile(null)
      setCropPreview("")
    }
  }

  // Skip cropping and upload
  const handleSkipCrop = () => {
    if (selectedFile) {
      processAndUpload(selectedFile)
      setShowCropDialog(false)
      setSelectedFile(null)
      setCropPreview("")
    }
  }

  const placeholderDataUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTMwSDcwVjEwMEgxMDBWMTMwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTMwIDEwMEgxNjBWMTMwSDEzMFYxMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo="

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative">
          <Image
            src={value}
            alt="Uploaded image"
            width={dimensions.width}
            height={dimensions.height}
            className={imageClassName}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.error('Image load error:', e)
              const target = e.target as HTMLImageElement
              target.src = placeholderDataUrl
            }}
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
            <div className="text-xs text-muted-foreground mt-1">
              <p>Max size: {maxFileSize}MB</p>
              <p>Formats: {allowedFormats.map(f => f.split('/')[1]).join(', ')}</p>
              {dimensions && <p>Output: {dimensions.width}x{dimensions.height}px (WebP)</p>}
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            disabled={isUploading}
            className="mt-2"
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? "Processing..." : "Select Image"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedFormats.join(',')}
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </div>
      )}

      {/* Enhanced Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5" />
              Crop Image
            </DialogTitle>
            <DialogDescription>
              Drag to reposition and use the handles to resize the crop area. Your image will be resized to {dimensions.width}x{dimensions.height}px.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ZoomOut className="h-4 w-4" />
                <Slider
                  value={[zoom]}
                  onValueChange={(value) => setZoom(value[0])}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-24"
                />
                <ZoomIn className="h-4 w-4" />
                <span className="text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRotation(prev => (prev + 90) % 360)}
              >
                <RotateCw className="h-4 w-4 mr-1" />
                Rotate
              </Button>
            </div>

            {/* Crop Area */}
            {cropPreview && (
              <div className="flex justify-center">
                <div 
                  ref={cropContainerRef}
                  className="relative bg-black rounded-lg overflow-hidden"
                  style={{ width: '600px', height: '400px' }}
                >
                  {/* Image */}
                  <img
                    ref={imageRef}
                    src={cropPreview}
                    alt="Crop preview"
                    className="absolute inset-0 w-full h-full object-contain select-none"
                    style={{ 
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: 'center'
                    }}
                    draggable={false}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50" />
                  
                  {/* Crop Selection */}
                  <div
                    className="absolute bg-transparent border-2 border-white shadow-lg cursor-move"
                    style={{
                      left: cropArea.x,
                      top: cropArea.y,
                      width: cropArea.width,
                      height: cropArea.height,
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'drag')}
                  >
                    {/* Corner handles */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-300 cursor-nw-resize" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-300 cursor-ne-resize" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-300 cursor-sw-resize" />
                    <div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-300 cursor-se-resize"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleMouseDown(e, 'resize')
                      }}
                    />
                    
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-white border-opacity-30" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleSkipCrop} disabled={isUploading}>
              Skip Crop
            </Button>
            <Button onClick={handleCropAndUpload} disabled={isUploading}>
              {isUploading ? "Processing..." : "Crop & Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}