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
          <CardDescription>Your supplier profile has been successfully created</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for joining BuildmarketLK. Our team will review your information and get back to you shortly.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/supplier/dashboard/">
            <Button>Go to Profile</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

