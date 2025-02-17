"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Ruler, Hammer, Truck, Users, FileSpreadsheet } from "lucide-react"

const services = [
  {
    icon: <Building2 className="h-12 w-12 text-primary" />,
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

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
      }}
    >
      <Card>
        <CardHeader>
          <div className="mb-2">{service.icon}</div>
          <CardTitle>{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{service.description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <p className="text-xl mb-12">
        At Master Space Builders, we offer a comprehensive range of services to meet all your construction needs. From
        project management to material procurement, we've got you covered.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  )
}

