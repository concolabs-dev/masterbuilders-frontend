import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HardHat, Building, Ruler, Search, CheckCircle, ArrowRight } from "lucide-react"

export default function ProfessionalsHub() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Professionals Hub
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Professionals Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          At BuildMarketLK, we bridge the gap between suppliers, builders, and investors. Our Professionals Hub is
          designed to connect you with verified Contractors, Architects, and Quantity Surveyors, ensuring your projects
          are executed with expertise and precision.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/professionals/showcase">
            <Button size="lg">
              Browse Professionals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/professionals/register">
            <Button size="lg" variant="outline">
              Register as a Professional
            </Button>
          </Link>
        </div>
      </div>

      {/* Professionals Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Contractors Card */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <HardHat className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span>👷</span> Contractors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Services Offered:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Residential and commercial construction</li>
                <li>• Renovations and extensions</li>
                <li>• Project management and supervision</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Why Choose Our Contractors:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Vetted for quality and reliability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Transparent pricing and timelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Compliance with local building regulations</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/professionals/showcase?type=Contractor" className="w-full">
              <Button className="w-full">Explore Contractors</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Architects Card */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span>🏛️</span> Architects
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Services Offered:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Conceptual and detailed design</li>
                <li>• Planning and regulatory approvals</li>
                <li>• Sustainable and innovative solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Why Choose Our Architects:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Creative designs tailored to your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Experience across various project types</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Collaboration with other professionals for seamless execution</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/professionals/showcase?type=Architect" className="w-full">
              <Button className="w-full">Explore Architects</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Quantity Surveyors Card */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Ruler className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span>📐</span> Quantity Surveyors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Services Offered:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Cost estimation and budgeting</li>
                <li>• Tendering and procurement advice</li>
                <li>• Contract administration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Why Choose Our Quantity Surveyors:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Accurate and transparent cost management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Risk assessment and value engineering</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Support throughout the project lifecycle</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/professionals/showcase?type=Quantity%20Surveyor" className="w-full">
              <Button className="w-full">Explore Quantity Surveyors</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          <span>🔍 How It Works</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
              1
            </div>
            <h3 className="text-lg font-medium mb-2">Browse</h3>
            <p className="text-muted-foreground">Explore profiles of professionals by category and expertise.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
              2
            </div>
            <h3 className="text-lg font-medium mb-2">Connect</h3>
            <p className="text-muted-foreground">Reach out directly through our platform to discuss your project.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
              3
            </div>
            <h3 className="text-lg font-medium mb-2">Collaborate</h3>
            <p className="text-muted-foreground">Work together to bring your construction vision to life.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Professional?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you're planning a new build, renovation, or need expert advice on costs, our network of professionals
          is ready to help.
        </p>
        <Link href="/professionals/showcase">
          <Button size="lg">Browse All Professionals</Button>
        </Link>
      </div>
    </div>
  )
}
