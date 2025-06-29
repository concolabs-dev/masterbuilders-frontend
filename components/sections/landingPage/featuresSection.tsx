import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible"
import { link } from "fs"
import {
  TrendingUp,
  Building2,
  Package,
  Users,
  HardHat,
  MapPin,
} from "lucide-react"
import Link from "next/link"

const features = [
    {
      icon: TrendingUp,
      title: "Prices",
      description:
        "Track monthly price fluctuations, view prices in multiple currencies, and compare suppliers with our comprehensive catalog.",
      color: "bg-blue-500",
      link: "/catalogue",
    },
    {
      icon: Building2,
      title: "Projects",
      description:
        "Explore ongoing projects by professional institutes and builders. Perfect for foreign investors looking to invest in Sri Lanka.",
      color: "bg-green-500",
      link: "/build-in-sl",
    },
    {
      icon: Package,
      title: "Products",
      description:
        "Discover new products from suppliers, browse detailed catalogs, and find the lowest prices in Sri Lanka.",
      color: "bg-purple-500",
      link: "/catalogue",
    },
    {
      icon: Users,
      title: "People",
      description:
        "Connect with everyone in the construction industry - from builders to all other stakeholders in one platform.",
      color: "bg-orange-500",
      link: "/suppliers",
    },
    {
      icon: HardHat,
      title: "Professionals",
      description:
        "Search and choose from a wide range of construction professionals suitable for your specific project needs.",
      color: "bg-red-500",
      link: "/professionals/showcase",
    },
    {
      icon: MapPin,
      title: "Places",
      description:
        "Stay updated with the latest construction industry news, events, and relevant information in your area.",
      color: "bg-teal-500",
      link: "/news",
    },
  ]

export default function FeaturesSection() {
    return (
        <section className="py-20 px-4 lg:px-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Everything Construction in One Place</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From real-time pricing to professional networks, BuildMarketLK is your comprehensive platform for all
                construction needs in Sri Lanka.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FadeInWhenVisible key={index}>
                <Link href={feature.link}>
                  <Card
                      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                  >
                      <CardHeader>
                      <div
                          className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                          <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                      <CardDescription className="text-gray-600 text-base leading-relaxed">
                          {feature.description}
                      </CardDescription>
                      </CardContent>
                  </Card>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    )
}