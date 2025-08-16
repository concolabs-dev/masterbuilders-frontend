"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LaunchPage() {
  const [isLaunching, setIsLaunching] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [currentFrame, setCurrentFrame] = useState(0)
  const router = useRouter()

  // Cycle through background frames for animation
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 20) // Use first 20 frames
    }, 100) // Change frame every 100ms

    return () => clearInterval(frameInterval)
  }, [])

  // Handle countdown and redirect
  useEffect(() => {
    if (isLaunching && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isLaunching && countdown === 0) {
      router.push('/')
    }
  }, [isLaunching, countdown, router])

  const handleLaunch = () => {
    setIsLaunching(true)
  }

  const frameNumber = currentFrame.toString().padStart(4, '0')
  const backgroundImage = `/frames-webp/frame_${frameNumber}.webp`

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background animation"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to PNG if WebP fails
            const target = e.target as HTMLImageElement
            target.src = `/frames/frame_${frameNumber}.png`
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {!isLaunching ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <Image
                src="/images/logo.jpeg"
                alt="BuildMarket LK"
                width={120}
                height={120}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
                BuildMarket LK
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Your Gateway to Building in Sri Lanka
              </p>
            </motion.div>

            {/* Launch Button */}
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLaunch}
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 transform hover:shadow-3xl"
            >
              Launch Platform
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Logo during countdown */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/logo.jpeg"
                alt="BuildMarket LK"
                width={100}
                height={100}
                className="rounded-lg shadow-2xl"
              />
            </div>

            {/* Countdown */}
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-8xl md:text-9xl font-bold"
            >
              {countdown}
            </motion.div>

            <p className="text-xl text-gray-200">
              Launching BuildMarket LK...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}