"use client"

import { Ruler, Users, FileSpreadsheet, DollarSign, Globe, Zap, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { HeroSlider } from "@/components/sections/landingPage/hero-slider"
import { ReactNode } from "react";
import FeaturesSection from "@/components/sections/landingPage/featuresSection"
import StatsSection from "@/components/sections/landingPage/statsSection"
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible"
import CtaSection from "@/components/sections/landingPage/ctaSection"
import ContactForm from "@/components/sections/landingPage/contactForm"
import AboutUsSection from "@/components/sections/landingPage/aboutUsSection"

const services = [
  {
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    title: "Real-Time Construction Rates",
    description: "Get access to accurate, up-to-date construction rates in Sri Lanka. Our platform provides real-time pricing for materials, labor, and equipment, ensuring professionals make data-driven decisions with confidence.",
  },
  {
    icon: <Ruler className="h-12 w-12 text-primary" />,
    title: "Automated Estimations (Coming Soon!)",
    description:
      "Simply enter your building requirements, and our system will automatically generate cost estimates based on real-time data. Save time and streamline your project planning with AI-powered precision.",
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Connecting Global Investors to Sri Lanka",
    description: "We act as a gateway for foreign investors looking to enter Sri Lanka's construction industry. From infrastructure to real estate, we provide expert insights, local connections, and the resources needed for seamless investment.",
  },
  {
    icon: <FileSpreadsheet className="h-12 w-12 text-primary" />,
    title: "Cost Guide to Construction In Sri Lanka",
    description: "We're committed to creating value in construction by making essential resources easily accessible and affordable for every builder, investor, and homeowner.",
  },
]

function SlideIn({ children, direction = "left" }: { children: ReactNode, direction?: "left" | "right" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -100 : 100 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSlider />
        
        <FeaturesSection />

        {/* <StatsSection /> */}

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 lg:px-32 bg-white">
          <div className="container mx-auto px-4">
            <FadeInWhenVisible>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose BuildMarketLk?</h2>
                <p className="md:text-xl text-gray-600 max-w-3xl mx-auto">
                  We're revolutionizing the construction industry in Sri Lanka with transparency, reliability, and
                  innovation.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Verified & Trusted</h3>
                  <p className="text-gray-600">
                    All suppliers and professionals are thoroughly verified to ensure quality and reliability.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Get instant updates on prices, availability, and market trends to make informed decisions.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Platform</h3>
                  <p className="text-gray-600">
                    Everything you need for construction projects in one convenient, easy-to-use platform.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* About Us */}
        <AboutUsSection />

        {/* Contact Form */}
        <ContactForm />

        {/* CTA section */}
        <CtaSection />
      </main>
    </div>
  )
}