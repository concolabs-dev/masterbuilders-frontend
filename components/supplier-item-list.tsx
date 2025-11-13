

import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getSupplierByPID } from "@/app/api"
import { ImageWithFallback } from "./ui/ImageWithFallback"
import { Supplier } from "@/types"

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
  const router = useRouter()
  const [supplierNames, setSupplierNames] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchSupplierNames = async () => {
      const names: { [key: string]: string } = {}
      for (const item of items) {
        if (!names[item.supplierPid]) {
          try {
            const supplier: Supplier = await getSupplierByPID(item.supplierPid)
            names[item.supplierPid] = supplier.business_name
          } catch (error) {
            console.error("Error fetching supplier name:", error)
          }
        }
      }
      setSupplierNames(names)
    }

    fetchSupplierNames()
  }, [items])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            {!admin && <TableHead>Supplier</TableHead>}
            {admin && <TableHead>Category</TableHead>}
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            {admin && <TableHead className="text-right">Actions</TableHead>}
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
              <TableRow
                key={item.id}
                className={!admin ? "cursor-pointer" : ""}
                onClick={() => {
                  if (!admin) {
                    router.push(`/supplier/${item.supplierPid}`)
                  }
                }}
              >
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
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                </TableCell>
                {!admin && (
                  <TableCell>
                    {supplierNames[item.supplierPid] || "Loading..."}
                  </TableCell>
                )}
                {admin && (
                  <TableCell>
                    {item.category}
                    <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                  </TableCell>
                )}
                <TableCell>
                  {displayCurrency} {item.price.toLocaleString()}
                </TableCell>
                <TableCell>{item.unit}s</TableCell>
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