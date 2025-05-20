import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Building, Truck, ArrowRight, Ruler, HardHat } from "lucide-react"

export default function RegisterSelectionPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Register
      </div>

      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Join BuildMarket</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose how you want to participate in our platform. Whether you're supplying materials or offering
          professional services, we have the right solution for you.
        </p>
      </div>

      {/* Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Supplier Card */}
        <Card className="flex flex-col h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
          <div className="relative h-48 w-full">
            <Image
              src="/images/professional.jpg"
              alt="Construction materials supplier"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              For Material Suppliers
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              Register as a Supplier
            </CardTitle>
            <CardDescription>
              For businesses that supply construction materials, equipment, or other products
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <h3 className="font-medium mb-4">As a registered supplier, you can:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Showcase your products and materials to potential buyers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Manage your catalog with detailed product information and pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Receive inquiries directly from contractors and project owners</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Access analytics on your most viewed and requested products</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Link href="/onboarding" className="w-full">
              <Button className="w-full group">
                Register as a Supplier
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Professional Card */}
        <Card className="flex flex-col h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
          <div className="relative h-48 w-full">
            <Image
              src="/images/supplier.jpg"
              alt="Construction professionals"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              For Service Providers
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              Register as a Professional
            </CardTitle>
            <CardDescription>
              For architects, contractors, quantity surveyors, and other construction professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <h3 className="font-medium mb-4">As a registered professional, you can:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Showcase your portfolio of projects and expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Highlight your services, specializations, and certifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Connect with potential clients looking for your specific expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Build your reputation through client reviews and featured projects</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-6">
            <Link href="/professionals/register" className="w-full">
              <Button className="w-full group">
                Register as a Professional
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      
      
      

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Is registration free?</h3>
            <p className="text-muted-foreground">
              Yes, basic registration is completely free. We also offer premium features for enhanced visibility.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">How long does approval take?</h3>
            <p className="text-muted-foreground">
              Most registrations are approved within 24-48 hours after our team verifies your information.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Can I register as both?</h3>
            <p className="text-muted-foreground">
              Yes, you can register separate profiles if your business offers both products and professional services.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">What information do I need to register?</h3>
            <p className="text-muted-foreground">
              You'll need your business details, contact information, and images showcasing your products or projects.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join our platform today and connect with thousands of potential clients and partners in the construction
          industry.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/onboarding/supplier">
            <Button size="lg">Register as a Supplier</Button>
          </Link>
          <Link href="/professionals/register">
            <Button size="lg" variant="outline">
              Register as a Professional
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
