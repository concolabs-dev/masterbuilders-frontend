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
import { HeroSlider } from "@/components/sections/landingPage/hero-slider"
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
    title: "Cost Guide to Construction In Sri Lanka",
    description: "We're committed to creating value in construction by making essential resources easily accessible and affordable for every builder, investor, and homeowner.",
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
        <HeroSlider />
        

        <section
  id="about"
  className="w-full py-12 md:py-24 lg:py-32 bg-cover bg-center relative"
  style={{ backgroundImage: "url('/images/cover2.jpg')" }} // Replace with your background image path
>
<div className="absolute inset-0 bg-white/100"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <FadeInWhenVisible>
              <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Platform</h2>
            </FadeInWhenVisible>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/images/catalogue.jpg"
                      alt="Construction suppliers"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">Catalogue</h3>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <p className="text-slate-600 mb-4">
                    Find the best prices for construction materials and services.
                    </p>
                    <div className="mt-auto">
                      <Link href="/catalogue">
                        <Button variant="outline" className="w-full">
                          Explore Catalogue
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/images/professional.jpg"
                      alt="Construction suppliers"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">Browse Suppliers</h3>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <p className="text-slate-600 mb-4">
                      Find trusted suppliers for all your construction needs, from building materials to equipment
                      rentals and specialized services.
                    </p>
                    <div className="mt-auto">
                      <Link href="/supplier">
                        <Button variant="outline" className="w-full">
                          Explore Suppliers
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/images/supplier.jpg"
                      alt="Construction professionals"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">Browse Professionals</h3>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <p className="text-slate-600 mb-4">
                      Connect with verified contractors, architects, and quantity surveyors to bring your construction
                      projects to life.
                    </p>
                    <div className="mt-auto">
                      <Link href="/professionals/showcase">
                        <Button variant="outline" className="w-full">
                          Find Professionals
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src="/images/colombo.jpg"
                      alt="Build in Sri Lanka"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">Build in Sri Lanka</h3>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <p className="text-slate-600 mb-4">
                      Discover investment opportunities in Sri Lanka's growing construction industry with our
                      comprehensive guidance and support.
                    </p>
                    <div className="mt-auto">
                      <Link href="/build-in-sl">
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>
        <section
  id="about"
  className="w-full py-12 md:py-24 lg:py-32 bg-cover bg-center relative"
  style={{ backgroundImage: "url('/images/cover1.jpg')" }} // Replace with your background image path
>
<div className="absolute inset-0 bg-white/95"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
            <SlideIn>
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <p className="text-lg">
                  BuildMarketLK is a pioneering joint venture formed by three industry leaders: the Ceylon Institute of
                  Builders (CIOB), VFORM Consultants, and Concolabs. Together, we are reshaping Sri Lanka's construction
                  landscape by creating a transparent, efficient, and technology-driven marketplace for construction
                  materials and services.
                </p>
              </div>
            </SlideIn>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="bg-slate-100 p-6 flex items-center justify-center h-48">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Image
                        src="/images/ciob.jpg"
                        alt="CIOB Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">Ceylon Institute of Builders</h3>
                    <p className="text-slate-600">
                      Sri Lanka's oldest professional body for builders, brings decades of institutional knowledge,
                      policy advocacy, and a commitment to elevating industry standards.
                    </p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="bg-slate-100 p-6 flex items-center justify-center h-48">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Image
                        src="/images/vform.jpeg"
                        alt="VFORM Consultants Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">VFORM Consultants</h3>
                    <p className="text-slate-600">
                      A quantity surveying firm, contributes deep expertise in cost management and project estimation,
                      ensuring accuracy and financial efficiency across the platform.
                    </p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
                        <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="bg-slate-100 p-6 flex items-center justify-center h-48">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Image
                        src="/images/qserve.jpeg"
                        alt="qserve Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">Qserve</h3>
                    <p className="text-slate-600">
                      A chartered quantity surveying and project management consultancy, founded in Sri Lanka in 1994, pioneering professional cost planning, contract administration, value engineering, and dispute-resolutions.
                    </p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                  <div className="bg-slate-100 p-6 flex items-center justify-center h-48">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Image
                        src="/images/concolabs.svg"
                        alt="Concolabs Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">Concolabs</h3>
                    <p className="text-slate-600">
                      A construction technology company, powers the platform with cutting-edge digital tools, enabling
                      real-time pricing, automated estimations, and seamless supplier integration.
                    </p>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            </div>

            <SlideIn direction="right">
              <div className="bg-slate-100 p-8 rounded-2xl shadow-lg" >
                <h3 className="text-2xl text-center font-semibold mb-4">Our Vision</h3>
                <p className="text-lg">
                  Our vision is to empower construction projects worldwide by offering a reliable, detailed pricing
                  catalog that makes resource allocation simple and efficient. We believe in building a future where
                  quality construction resources are accessible, transparent, and economically feasible for all.
                </p>
              </div>
            </SlideIn>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-white">
          <div className="container px-4 md:px-6 text-center">
            <FadeInWhenVisible>
              <h2 className="text-3xl font-bold mb-4 text-black">Are you a supplier or a professional?</h2>
              <p className="text-xl  mb-8 text-slate-900">
                Join us and boost your business visibility and reach a wider audience.
              </p>
              <Link href="/register">
                <Button size="lg"  className=" text-white hover:text-slate-100">
                  Register
                </Button>
              </Link>
            </FadeInWhenVisible>
          </div>
        </section>
      </main>
    </div>
  )
}
