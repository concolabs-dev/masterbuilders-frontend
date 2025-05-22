import { useEffect, useState } from "react"
import {
  getPaymentRecords,
  getSupplierByPPID,
  getItemsBySupplier,
  updatePaymentRecord,
  type PaymentRecord,
  type Supplier,
  type Item
} from "@/app/api"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SupplierProfile } from "@/components/supplier-profile"
import { SupplierItemList } from "@/components/supplier-item-list"

interface SupplierWithRecord {
  supplier: Supplier
  record: PaymentRecord
}

function AdminSuppliersTab() {
  const [approvedList, setApprovedList] = useState<SupplierWithRecord[]>([])
  const [notApprovedList, setNotApprovedList] = useState<SupplierWithRecord[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [supplierItems, setSupplierItems] = useState<Item[]>([])

  const fetchSuppliers = async () => {
    try {
      const paymentRecords = await getPaymentRecords()
      const approved: SupplierWithRecord[] = []
      const notApproved: SupplierWithRecord[] = []
      for (const record of paymentRecords) {
         let supplier: Supplier
        try {
           supplier = await getSupplierByPPID(record.Supplierpid)
        } catch (error) {
          console.error("Error fetching supplier by PPID:", error)
          continue
          
        }
        if (record.Approved) {
          approved.push({ supplier, record })
        } else {
          notApproved.push({ supplier, record })
        }
      }
      setApprovedList(approved)
      setNotApprovedList(notApproved)
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    }
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const toggleApproval = async (recordId: string, newStatus: boolean) => {
    try {
      await updatePaymentRecord(recordId, { Approved: newStatus })
      fetchSuppliers()
    } catch (error) {
      console.error("Error updating approval:", error)
    }
  }

  const handleViewProfile = async (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    try {
      if (supplier.pid) {
        const items = await getItemsBySupplier(supplier.pid)
        setSupplierItems(items)
      }
    } catch (error) {
      console.error("Error fetching supplier items:", error)
    }
    setDialogOpen(true)
  }

  const renderTable = (list: SupplierWithRecord[], approved: boolean) => (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="p-2 text-left">Business Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Telephone</th>
          <th className="p-2 text-left"></th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ supplier, record }) => (
          <tr key={supplier.id} className="border-b">
            <td className="p-2">{supplier.business_name}</td>
            <td className="p-2">{supplier.email}</td>
            <td className="p-2">{supplier.telephone}</td>
            <td className="p-2 flex gap-2">
              <Button variant="outline" onClick={() => toggleApproval(record.id, !approved)}>
                {approved ? "Revoke" : "Approve"}
              </Button>
              <Button variant="outline" onClick={() => handleViewProfile(supplier)}>
                View Profile
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <>
      <Tabs defaultValue="approved">
        <TabsList>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="notApproved">Not Approved</TabsTrigger>
        </TabsList>
        <TabsContent value="approved">
          <h2 className="text-xl font-semibold mb-4">Approved Suppliers</h2>
          {renderTable(approvedList, true)}
        </TabsContent>
        <TabsContent value="notApproved">
          <h2 className="text-xl font-semibold mb-4">Not Approved Suppliers</h2>
          {renderTable(notApprovedList, false)}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent>
          {selectedSupplier && (
            <>
              <SupplierProfile
                supplier={{
                  id: selectedSupplier.id,
                  name: selectedSupplier.business_name,
                  email: selectedSupplier.email,
                  telephone: selectedSupplier.telephone,
                  address: selectedSupplier.address,
                  location: {
                    lat: selectedSupplier.location.latitude.toString(),
                    lng: selectedSupplier.location.longitude.toString(),
                  },
                  profileImage: selectedSupplier.profile_pic_url,
                  coverImage: selectedSupplier.cover_pic_url,
                  description: selectedSupplier.business_description,
                }}
                admin={false}
              />
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Items</h3>
                {supplierItems && 
                <SupplierItemList items={supplierItems} onEdit={() => {}} onDelete={() => {}} admin={false} displayCurrency="Rs." />}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AdminSuppliersTab
