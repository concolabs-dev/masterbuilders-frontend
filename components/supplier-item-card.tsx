import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface SupplierItemCardProps {
  item: {
    id: string
    name: string
    description: string
    supplierPid: string
    materialId: string
    type: string
    category: string
    subcategory: string
    unit: string
    price: number
    imgUrl: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function SupplierItemCard({ item, onEdit, onDelete }: SupplierItemCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col  h-full">
      <div className="relative h-48 w-full">
        <Image
          src={item.imgUrl || "/placeholder.svg?height=200&width=300"}
          alt={item.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <div className="text-xs font-medium bg-primary/90 text-primary-foreground rounded-full px-2 py-1 inline-block mb-2">
              {item.category} • {item.subcategory}
            </div>
            <h3 className="font-bold text-lg">{item.name}</h3>
          </div>
        </div>
      </div>
      <CardContent className="flex-1 pt-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold">Rs. {item.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Stock</p>
            <p className="font-medium">
              {item.unit}s
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

