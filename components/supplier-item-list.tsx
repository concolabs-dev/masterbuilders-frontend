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
  displayCurrency: string
}

export function SupplierItemList({
  items,
  onEdit,
  onDelete,
  admin,
  displayCurrency
}: SupplierItemListProps) {
  // …
  console.log(displayCurrency)
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {/* ... */}
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
              <TableRow
                key={item.id}
                className={!admin ? "cursor-pointer" : ""}
                onClick={() => {
                  if (!admin) {
                    // e.g. go to supplier page
                  }
                }}
              >
                <TableCell>
                  {/* image cell */}
                </TableCell>
                <TableCell className="font-medium">
                  {item.name}
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                </TableCell>
                <TableCell>
                  {item.category}
                  <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                </TableCell>
                <TableCell>
                  {displayCurrency} {item.price.toLocaleString()}
                </TableCell>
                <TableCell>{item.unit}s</TableCell>
                {admin && (
                  <TableCell className="text-right">
                    {/* actions */}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
