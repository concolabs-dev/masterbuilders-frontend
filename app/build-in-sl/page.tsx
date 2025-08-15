import Link from "next/link"
import Image from "next/image"
import {
  Building2,
  Globe,
  TrendingUp,
  LandmarkIcon,
  BarChart3,
  Handshake,
  ScrollText,
  LayoutDashboard,
  Shield,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BuildInSL() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/colombo.jpg"
            alt="Sri Lanka Construction"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Gateway to Lucrative Construction Industry in SL</h1>
          <p className="text-xl md:text-3xl font-medium mt-6 mb-8">Build Smart. Build Fast. Build in Sri Lanka.</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
            <Link href="#consultation">Explore Opportunities</Link>
          </Button>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Invest in Sri Lanka?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-orange-100 p-3 rounded-full mb-4">
                    <Globe className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Location</h3>
                  <p className="text-gray-600">
                    Positioned between East and West trade routes, offering unique access to global markets
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">High ROI Potential</h3>
                  <p className="text-gray-600">
                    Exceptional returns in real estate, tourism infrastructure, and commercial developments
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-4">
                    <LandmarkIcon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Supportive Policies</h3>
                  <p className="text-gray-600">
                    Government-backed investment incentives and streamlined approval processes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-amber-100 p-3 rounded-full mb-4">
                    <BarChart3 className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Growing Demand</h3>
                  <p className="text-gray-600">
                    Expanding market for hotels, housing, commercial spaces, and infrastructure projects
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why BuildMarketLK Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Go Through BuildMarketLK?</h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            BuildMarketLK is your all-in-one partner for construction in Sri Lanka. Here's why global investors choose
            us:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-md mr-3">
                  <Building2 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Cost Insights</h3>
              </div>
              <p className="text-gray-600">
                Use our proprietary Construction Price Catalogue to understand exact material, labor, and equipment
                rates in Sri Lanka.
              </p>
            </div>

            <div className="flex flex-col p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-md mr-3">
                  <Handshake className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Trusted Local Partnerships</h3>
              </div>
              <p className="text-gray-600">
                We connect you only with vetted, experienced contractors, architects, and consultants.
              </p>
            </div>

            <div className="flex flex-col p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-md mr-3">
                  <ScrollText className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">End-to-End Service</h3>
              </div>
              <p className="text-gray-600">
                From legal permits to contractor negotiations — we handle it all, so you can focus on ROI.
              </p>
            </div>

            <div className="flex flex-col p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-md mr-3">
                  <LayoutDashboard className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Digital Platform Access</h3>
              </div>
              <p className="text-gray-600">
                Get a personalized dashboard to track your investments, access BOQs, and receive real-time updates.
              </p>
            </div>

            <div className="flex flex-col p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-md mr-3">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Quality + Compliance</h3>
              </div>
              <p className="text-gray-600">
                We ensure your project meets local building regulations and global quality standards.
              </p>
            </div>

            <div className="flex flex-col p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors bg-gradient-to-br from-orange-50 to-white">
              <div className="flex justify-center items-center h-full">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Link href="#consultation">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Book a Free Consultation</h2>
            <p className="text-lg text-gray-600 mb-8">Want to discuss your goals with an expert?</p>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-orange-600 mr-3" />
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Schedule a Call</h3>
                    <p className="text-gray-600">30-minute strategy session</p>
                  </div>
                </div>

                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  <a
                    href="https://calendly.com/buildmarketlk-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Book on Calendly
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <div className="max-w-md mx-auto">
            <p className="font-semibold text-xl mb-4">Build Market Pvt Ltd</p>
            <p className="flex items-center justify-center mb-2">
              <span className="mr-2">📧</span> Email:
              <a href="mailto:info@buildmarketlk.com" className="text-orange-600 ml-1 hover:underline">
                info@buildmarketlk.com
              </a>
            </p>
            <Button className="mt-6 bg-orange-600 hover:bg-orange-700">
              <Link href="/#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}