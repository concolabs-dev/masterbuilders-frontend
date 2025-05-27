import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Terms and Conditions
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-slate-50">
          <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
          <CardDescription>Last updated: May 4, 2025</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-6">
              Welcome to BuildMarketLk. These Terms and Conditions govern your use of our website and registering your
              products from our platform. By accessing and using our website, you agree to comply with these terms.
              Please read them carefully before proceeding with any transactions.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Use of the Website</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                You are responsible for maintaining the confidentiality of your account information, including your
                username and password.
              </li>
              <li>
                You agree to provide accurate and current information during the registration and checkout process.
              </li>
              <li>You may not use our website for any unlawful or unauthorized purposes.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Product Information and Pricing</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                We strive to provide accurate pricing information. However, we do not guarantee the accuracy or
                completeness of such information.
              </li>
              <li>
                By registering on our website, you are making an offer to pay the monthly subscription fee for your
                business page.
              </li>
              <li>We reserve the right to refuse or cancel any registration request.</li>
              <li>
                You agree to provide valid and up-to-date payment information and authorize us to charge the total order
                amount, including applicable taxes and shipping fees, to your chosen payment method.
              </li>
              <li>
                We use trusted third-party payment processors to handle your payment information securely. We do not
                store or have access to your full payment details.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                All content and materials on our website, including but not limited to text, images, logos, and
                graphics, are protected by intellectual property rights and are the property of BuildMarketLK or its
                licensors.
              </li>
              <li>
                You may not use, reproduce, distribute, or modify any content from our website without our prior written
                consent.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                In no event shall BuildMarketLK, its directors, employees, or affiliates be liable for any direct,
                indirect, incidental, special, or consequential damages arising out of or in connection with your use of
                our website.
              </li>
              <li>
                We make no warranties or representations, express or implied, regarding the quality, accuracy, or
                suitability of the products displayed on our website.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Amendments and Termination</h2>
            <p>
              We reserve the right to modify, update, or terminate these Terms and Conditions at any time without prior
              notice. It is your responsibility to review these terms periodically for any changes.
            </p>

            <Separator className="my-8" />

            <h2 className="text-xl font-semibold mt-8 mb-4">Privacy Policy</h2>
            <p className="mb-4">
              At BuildMarketLK, we are committed to protecting the privacy and security of our customers' personal
              information. This Privacy Policy outlines how we collect, use, and safeguard your information when you
              visit or register your business on our website. By using our website, you consent to the practices
              described in this policy.
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">Information We Collect</h3>
            <p className="mb-4">When you visit our website, we may collect certain information about you, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                Personal identification information (such as your name, email address, and phone number) provided
                voluntarily by you during the registration or checkout process.
              </li>
              <li>
                Payment and billing information necessary to process your registrations, including credit card details,
                which are securely handled by trusted third-party payment processors.
              </li>
              <li>
                Browsing information, such as your IP address, browser type, and device information, collected
                automatically using cookies and similar technologies.
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">Use of Information</h3>
            <p className="mb-4">We may use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>To process your registrations.</li>
              <li>
                To communicate with you regarding your business page, provide customer support, and respond to inquiries
                or requests.
              </li>
              <li>To improve our website, products, and services based on your feedback and browsing patterns.</li>
              <li>To detect and prevent fraud, unauthorized activities, and abuse of our website.</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding our Privacy Policy or the handling of your
              personal information, please contact us at{" "}
              <a href="mailto:info@buildmarketlk.com" className="text-primary hover:underline">
                info@buildmarketlk.com
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
