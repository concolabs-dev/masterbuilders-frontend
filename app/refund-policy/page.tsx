import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Refund Policy
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-slate-50">
          <CardTitle className="text-3xl font-bold">Refund Policy</CardTitle>
          <CardDescription>Last updated: May 4, 2025</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-6">
              Thank you for shopping at Buildmarketlk. We value your satisfaction and strive to provide you with
              the best online shopping experience possible. If, for any reason, you are not completely satisfied with
              your purchase, we are here to help.
            </p>

            <Alert className="mb-8 border-primary/20 bg-primary/10">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary">For Business Registrations</AlertTitle>
              <AlertDescription>
                We do not accept refunds on the monthly subscription fee for business registrations. However, you can
                cancel your account anytime through your business page.
              </AlertDescription>
            </Alert>

            <h2 className="text-xl font-semibold mt-8 mb-4">Returns</h2>
            <p className="mb-6">
              We accept returns within 14 days from the date of purchase. To be eligible for a return, your item must be
              unused and in the same condition that you received it. It must also be in the original packaging.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Refunds</h2>
            <p className="mb-6">
              Once we receive your return and inspect the item, we will notify you of the status of your refund. If your
              return is approved, we will initiate a refund to your original method of payment. Please note that the
              refund amount will exclude any shipping charges incurred during the initial purchase.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Exchanges</h2>
            <p className="mb-6">
              If you would like to exchange your item for a different size, color, or style, please contact our customer
              support team within 14 days of receiving your order. We will provide you with further instructions on how
              to proceed with the exchange.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Non-Returnable Items</h2>
            <p className="mb-4">Certain items are non-returnable and non-refundable. These include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Personalized or custom-made items</li>
              <li>Perishable goods</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Damaged or Defective Items</h2>
            <p className="mb-6">
              In the unfortunate event that your item arrives damaged or defective, please contact us immediately. We
              will arrange for a replacement or issue a refund, depending on your preference and product availability.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Return Shipping</h2>
            <p className="mb-6">
              You will be responsible for paying the shipping costs for returning your item unless the return is due to
              our error (e.g., wrong item shipped, defective product). In such cases, we will provide you with a prepaid
              shipping label.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Processing Time</h2>
            <p className="mb-6">
              Refunds and exchanges will be processed within 5 business days after we receive your returned item. Please
              note that it may take additional time for the refund to appear in your account, depending on your payment
              provider.
            </p>

            <Separator className="my-8" />

            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions or concerns regarding our refund policy, please contact our customer support
              team. We are here to assist you and ensure your shopping experience with us is enjoyable and hassle-free.
            </p>

            <div className="bg-slate-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-medium mb-3">Customer Support</h3>
              <p className="mb-2">
                Email:{" "}
                <a href="mailto:support@masterbuilders.lk" className="text-primary hover:underline">
                  support@masterbuilders.lk
                </a>
              </p>
              <p className="mb-2">Phone: +94 77 123 4567</p>
              <p className="mb-2">Hours: Monday to Friday, 9:00 AM to 5:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
