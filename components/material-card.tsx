import { Card } from "@/components/ui/card"
import { Currency, Star } from "lucide-react"

interface MaterialCardProps {
  name: string
  unit: string
  location: string
  rating: number
  price: number
  currency_t: string
  onClick?: () => void
}

export function MaterialCard({ name, unit, location, rating, price, currency_t, onClick }: MaterialCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <div className="text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-2">
              {/* <span>Unit: {unit}</span> */}
              {/* <span>•</span> */}
              {/* <span>Location: {location}</span> */}
            </div>
            {/* <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                />
              ))}
            </div> */}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Price</div>
          <div className="font-semibold"> {currency_t+" "+Number(price).toFixed(2)} </div>
          <span className="text-gray-700 text-sm">/{unit}</span>

        </div>
      </div>
    </Card>
  )
}

