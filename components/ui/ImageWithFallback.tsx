"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

interface ImageWithFallbackProps {
  src: string | null | undefined
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  fallbackSrc?: string
  showIcon?: boolean
  iconSize?: number
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes,
  priority = false,
  fallbackSrc,
  showIcon = true,
  iconSize = 48
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Default placeholder based on dimensions or fill
  const getDefaultPlaceholder = () => {
    if (width && height) {
      return `data:image/svg+xml;base64,${btoa(`
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="${width}" height="${height}" fill="#F3F4F6"/>
          <rect x="${width/2 - 24}" y="${height/2 - 24}" width="48" height="48" fill="#9CA3AF" rx="4"/>
          <path d="M${width/2 - 12} ${height/2 - 4}h8v8h-8v-8zm12 0h8v8h-8v-8z" fill="#F3F4F6"/>
        </svg>
      `)}`
    }
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#F3F4F6"/>
        <rect x="176" y="126" width="48" height="48" fill="#9CA3AF" rx="4"/>
        <path d="M188 142h8v8h-8v-8zm12 0h8v8h-8v-8z" fill="#F3F4F6"/>
      </svg>
    `)}`
  }

  const imageSrc = src || fallbackSrc || getDefaultPlaceholder()

  // If no src provided and no fallback, show icon placeholder
  if (!src && !fallbackSrc && showIcon) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <ImageOff size={iconSize} className="text-gray-400" />
      </div>
    )
  }

  // If there's an error and no fallback, show icon placeholder
  if (hasError && !fallbackSrc && showIcon) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <ImageOff size={iconSize} className="text-gray-400" />
      </div>
    )
  }

  return (
    <div className="relative">
      <Image
        src={hasError ? (fallbackSrc || getDefaultPlaceholder()) : imageSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}>
          <div className="animate-pulse">
            <div className="bg-gray-300 rounded" style={{ width: iconSize, height: iconSize }} />
          </div>
        </div>
      )}
    </div>
  )
}