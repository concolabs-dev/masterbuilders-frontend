import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
interface SupplierItemListProps {
    items: {
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
      }[]
  onEdit: (item: any) => void
  onDelete: (id: string) => void
  admin: boolean
}

export function SupplierItemList({ items, onEdit, onDelete, admin }: SupplierItemListProps) {
  const router = useRouter()

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>unit</TableHead>
            {admin &&
            <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No items found. Add your first item to get started.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}     className={!admin ? "cursor-pointer" : ""}
              onClick={() => {
                if (!admin) {
                  router.push(`/supplier/${item.supplierPid}`)
                }
              }}>
                <TableCell>
                  <div className="relative h-10 w-10 rounded-md overflow-hidden">
                    <Image
                      src={item.imgUrl || "/placeholder.svg?height=40&width=40"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {item.name}
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                </TableCell>
                <TableCell>
                  {item.category}
                  <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                </TableCell>
                <TableCell>Rs. {item.price.toLocaleString()}</TableCell>
                <TableCell>
                   {item.unit}s
                </TableCell>
                {admin && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>)}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

