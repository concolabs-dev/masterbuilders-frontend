import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Edit } from "lucide-react"

interface SupplierProfileProps {
  supplier: {
    id: string
    name: string
    email: string
    telephone: string
    address: string
    location: { lat: string; lng: string }
    profileImage: string
    coverImage: string
    description: string
  }
}


  

export function SupplierProfile({ supplier }: SupplierProfileProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src={supplier.coverImage || "/placeholder.svg"}
       
          alt={`${supplier.name} cover`}
          fill
          className="object-cover"
        />
        <Button size="sm" variant="ghost" className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white">
          <Edit className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
      </div>
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16">
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background overflow-hidden bg-background">
            <Image
              src={supplier.profileImage || "/placeholder.svg"}
              alt={supplier.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 pt-10 md:pt-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{supplier.name}</h1>
                <p className="text-muted-foreground mt-1">{supplier.description}</p>
              </div>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {supplier.address}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                {supplier.telephone}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                {supplier.email}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

