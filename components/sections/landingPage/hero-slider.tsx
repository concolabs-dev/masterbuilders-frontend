"use client"
// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"

// const slides = [
//   {
//     id: 1,
//     title: "Thinking of Building?",
//     subtitle: "Know the Real Costs First.",
//     description:
//       "Check today's material and labor prices. Real-time pricing. Verified suppliers. Trusted professionals.",
//     cta: "Start Exploring Now",
//     ctaLink: "/catalogue",
//     background: "from-slate-900 via-slate-800 to-slate-900",
//     backgroundImage: "/images/catalogue2.jpg",
//   },
//   {
//     id: 2,
//     title: "Your Trusted Gateway to",
//     subtitle: "Building in Sri Lanka",
//     description:
//       "Connect with verified professionals and access real-time market rates to make informed investment decisions. Benefit from transparent pricing, local expertise, and end-to-end project support. Build smarter with data-driven insights and trusted partnerships.",
//     cta: "Start Exploring Now",
//     ctaLink: "/build-in-sl",
//     background: "from-blue-900 via-blue-800 to-slate-900",
//     backgroundImage: "/images/colombo.jpg",
//   },
//   {
//     id: 3,
//     title: "Reach Global Clients.",
//     subtitle: "Get Recognized.",
//     description: "Showcase your portfolio, get CIOB-verified, and attract international construction projects.",
//     cta: "Join the Network",
//     ctaLink: "/register",
//     background: "from-purple-900 via-purple-800 to-slate-900",
//     backgroundImage: "/images/supplier.jpg",
//   },
//   {
//     id: 4,
//     title: "Put Your Products",
//     subtitle: "in the Spotlight.",
//     description:
//       "Showcase your product range, highlight quality, and get featured as a top supplier in Sri Lanka's digital marketplace.",
//     cta: "List Your Products Today",
//     ctaLink: "/register",
//     background: "from-orange-900 via-orange-800 to-slate-900",
//     backgroundImage: "/images/professional.jpg",
//   },
// ]

// export function HeroSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)

//   useEffect(() => {
//     if (!isAutoPlaying) return

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
//   }

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index)
//   }

//   return (
//     <div
//       className="relative w-full h-[95vh] overflow-hidden"
//       onMouseEnter={() => setIsAutoPlaying(false)}
//       onMouseLeave={() => setIsAutoPlaying(true)}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//           className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].background}`}
//         >
//           {/* Background Image */}
//           <div
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
//             style={{
//               backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
//               backgroundPosition: "right center",
//             }}
//           />

//           {/* Additional Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

//           {/* Diagonal Design Element */}
//           <div className="absolute inset-0">
//             <div className="absolute top-0 right-0 w-1/2 h-full">
//               <div className="relative w-full h-full overflow-hidden">
//                 <div className="absolute inset-0 bg-white/5 transform skew-x-12 origin-top-right scale-110" />
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent transform skew-x-12 origin-top-right scale-110" />
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//               >
//                 <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
//                   {slides[currentSlide].title}
//                 </h1>
//                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
//                   {slides[currentSlide].subtitle}
//                 </h2>
//               </motion.div>

//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.6 }}
//                 className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed"
//               >
//                 {slides[currentSlide].description}
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <Link href={slides[currentSlide].ctaLink}>
//                   <Button size="lg" className=" hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
//                     {slides[currentSlide].cta}
//                   </Button>
//                 </Link>
//                 <Link href="#about">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="border-white text-text-slate-800 hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
//                   >
//                     Learn More
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </div>

//           {/* Scroll Down Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.6 }}
//             className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
//           >
//             <div className="flex flex-col items-center text-white/70">
//               <span className="text-sm mb-2 tracking-wider uppercase">Scroll Down</span>
//               <ChevronDown className="w-6 h-6 animate-bounce" />
//             </div>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
//       >
//         <ChevronLeft className="w-6 h-6 text-white" />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
//       >
//         <ChevronRight className="w-6 h-6 text-white" />
//       </button>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-8 right-8 z-20 flex space-x-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-200 ${
//               index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Slide Counter */}
//       {/* <div className="absolute top-8 right-8 z-20 text-white/70 text-sm">
//         <span className="font-semibold">{String(currentSlide + 1).padStart(2, "0")}</span>
//         <span className="mx-2">/</span>
//         <span>{String(slides.length).padStart(2, "0")}</span>
//       </div> */}
//     </div>
//   )
// }

import useTypewriter from "@/hooks/useTypewriter"
import { useEffect, useState } from "react"
import { Badge } from "../../ui/badge"
import Link from "next/link"
import { link } from "fs"

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3)
      }, 4000)
      return () => clearInterval(timer)
    }, [])

  const heroTitles = [
    {
      title:"Smarter Prices.",
      actionButtonLabel:"Explore Catalogue",
      link:"/catalogue"
    },
    {
      title:"Reliable Suppliers.",
      actionButtonLabel:"Find Suppliers",
      link:"/suppliers"
    },
    {
      title:"Verified Experts.",
      actionButtonLabel:"Find Experts",
      link:"/professionals/showcase"
    },
    {
      title:"On-Site Insights.",
      actionButtonLabel:"Get Insights",
      link:"/insights"
    },
    {
      title:"Powerful Tools.",
      actionButtonLabel:"Explore Tools",
      link:"/tools"
    },
    {
      title:"Local Projects.",
      actionButtonLabel:"View Projects",
      link:"/build-in-sl"
    }
  ]

  const { displayText, showCursor } = useTypewriter(heroTitles[currentSlide].title, 60)

  return(
    <section className="relative h-[90vh] overflow-hidden flex flex-col justify-center w-full">
      <div className="px-4 lg:px-32 flex flex-col items-center lg:items-start">
        <Badge className="mb-2 hidden sm:inline-block">Sri Lanka's Premier Construction Platform</Badge>
        <span className="block animate-slide-in-up text-lg md:text-3xl lg:text-4xl font-bold leading-tight ">Your Construction Starts with</span>
        <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {displayText}
          <span
            className={`inline-block md:inline w-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
          >
            |
          </span>
        </span>
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={heroTitles[currentSlide].link} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            {heroTitles[currentSlide].actionButtonLabel}
          </Link>
          <Link href="/about" className="bg-white text-slate-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-gray-100">
            Learn More
          </Link>
        </div>
      </div>
      {/* Scroll btn */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center text-white/80 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mb-2 relative">
            <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          </div>
          <span className="text-sm font-medium">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}