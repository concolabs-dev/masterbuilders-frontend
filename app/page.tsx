"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Ruler, Hammer, Truck, Users, FileSpreadsheet, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ContactSection } from "@/components/contact-section"
import { TaglineCarousel } from "@/components/tagline-carousel"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
    description: "We act as a gateway for foreign investors looking to enter Sri Lanka’s construction industry. From infrastructure to real estate, we provide expert insights, local connections, and the resources needed for seamless investment.",
  },
  {
    icon: <FileSpreadsheet className="h-12 w-12 text-primary" />,
    title: "Construction Trade Hub (Coming Soon!)",
    description: "A one-stop digital marketplace for construction materials, tools, and equipment in Sri Lanka. Easily buy, sell, and compare prices while connecting with trusted suppliers and contractors—all in one convenient platform.",
  },
]

import { ReactNode } from "react";

function FadeInWhenVisible({ children }: { children: ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <TaglineCarousel />
                  <p className="max-w-[600px] text-slate-300 md:text-xl">
                    We're committed to creating value in construction by making essential resources easily accessible
                    and affordable for every builder, investor, and homeowner.
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link href="/catalogue">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      View Catalogue
                    </Button>
                  </Link>
                  <Link href="#about">
                  <Button size="lg" variant="outline" className="w-full text-black min-[400px]:w-auto">
                    Learn More
                  </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5GQi5Q4D5LCFChBfhyTYAHrKIC2Q5X.png"
                  alt="Construction professionals reviewing building blueprints while wearing safety gear"
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8">About Us</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <SlideIn>
                <div>
                  <p className="mb-4">
                    Master Space Builders Pvt Ltd was founded with a vision to revolutionize the construction industry.
                    As a forward-thinking construction solutions provider, we've dedicated ourselves to delivering
                    quality, cost-effective resources to professionals, investors, and companies in the construction
                    sector.
                  </p>
                  <p className="mb-4">
                    Our journey began with a simple idea: to bridge the gap between suppliers and builders, making
                    construction processes more efficient and cost-friendly. Today, we're proud to be at the forefront
                    of innovation in the industry, known for our transparency, reliability, and commitment to
                    excellence.
                  </p>
                  <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                  <p>
                    Our vision is to empower construction projects worldwide by offering a reliable, detailed pricing
                    catalog that makes resource allocation simple and efficient. We believe in building a future where
                    quality construction resources are accessible, transparent, and economically feasible for all.
                  </p>
                </div>
              </SlideIn>
              <SlideIn direction="right">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 -rotate-6 rounded-3xl" />
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L2OQTXWXG3u8buSbv2GLEph1JMXdtL.png"
                    alt="Construction tools including hard hat, blueprints, and various tools"
                    width={500}
                    height={300}
                    className="relative rounded-2xl object-cover"
                  />
                </div>
              </SlideIn>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <FadeInWhenVisible>
              <h2 className="text-3xl font-bold mb-8">Our Services</h2>
            </FadeInWhenVisible>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <FadeInWhenVisible key={index}>
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div className="mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                      <p className="text-slate-300">{service.description}</p>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </section>

        <FadeInWhenVisible>
          <ContactSection />
        </FadeInWhenVisible>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl font-bold mb-4">Ready to explore our catalogue?</h2>
              <p className="text-xl mb-8 text-slate-300">
                Find the best prices for construction materials and services.
              </p>
              <Link href="/catalogue">
                <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                  View Full Catalogue
                </Button>
              </Link>
            </FadeInWhenVisible>
          </div>
        </section>
      </main>
    </div>
  )
}
