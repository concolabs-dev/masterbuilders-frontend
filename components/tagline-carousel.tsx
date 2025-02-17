"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const taglines = [
  "Are material prices too high?",
  "Investment viability a common hurdle.",
  "For an investor-friendly industry.",
  "Partnering into reasonable cost and more projects.",
]

export function TaglineCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length)
    }, 5000) // Change tagline every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-32 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center w-full px-4"
        >
          {taglines[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

