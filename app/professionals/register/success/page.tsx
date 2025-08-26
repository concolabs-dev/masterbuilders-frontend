import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container max-w-md py-20">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Registration Complete!</CardTitle>
          <CardDescription>Your professional company profile has been successfully created</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for BuildmarketLK. Our team will review your information and get back to you shortly.
            Once approved, your company will be listed in our professionals showcase.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
          <Link href="/professionals/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
