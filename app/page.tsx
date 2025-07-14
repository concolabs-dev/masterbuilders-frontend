"use client"

import { Ruler, Users, FileSpreadsheet, DollarSign, Globe, Zap, Shield } from "lucide-react"
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
import FeaturesSection from "@/components/sections/landingPage/featuresSection"
import StatsSection from "@/components/sections/landingPage/statsSection"
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible"
import CtaSection from "@/components/sections/landingPage/ctaSection"
import ContactForm from "@/components/sections/landingPage/contactForm"
import AboutUsSection from "@/components/sections/landingPage/aboutUsSection"


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
        
        <FeaturesSection />

        <StatsSection />

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

        {/* <section
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
        </section> */}

        {/* About Us */}
        <AboutUsSection />

        {/* <ContactSection /> */}
        <ContactForm />

        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
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
        </section> */}

        {/* new CTA section */}
        <CtaSection />
      </main>
    </div>
  )
}
