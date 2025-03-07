// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Plus, Grid, List } from "lucide-react"
// import { SupplierProfile } from "@/components/supplier-profile"
// import { SupplierItemCard } from "@/components/supplier-item-card"
// import { SupplierItemList } from "@/components/supplier-item-list"
// import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client"
// import { getSupplierByEmail, getSupplierById, updateSupplier,deleteSupplier } from "@/app/api"
// // Mock supplier data
// const supplierData = {
//   id: "1",
//   name: "ABC Construction Supplies",
//   email: "contact@abcsupplies.com",
//   telephone: "+94 77 123 4567",
//   address: "123 Main Street, Colombo 05, Sri Lanka",
//   location: { lat: "6.9271", lng: "79.8612" },
//   profileImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FeUk0YmcJxiCmhBMqX8oqDjkv3GDb6.png",
//   coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5GQi5Q4D5LCFChBfhyTYAHrKIC2Q5X.png",
//   description:
//     "Leading provider of high-quality construction materials at competitive prices. We specialize in cement, steel, bricks, and finishing materials.",
// }

// // Mock catalogue items
// const initialItems = [
//   {
//     id: "1",
//     name: "Premium Cement",
//     description: "High-quality cement suitable for all construction needs",
//     category: "RAW MATERIAL",
//     subcategory: "Cement",
//     unit: "50kg bag",
//     price: 1250,
//     stock: 500,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L2OQTXWXG3u8buSbv2GLEph1JMXdtL.png",
//   },
//   {
//     id: "2",
//     name: "Steel Rebar (12mm)",
//     description: "Reinforcement steel bars for concrete structures",
//     category: "RAW MATERIAL",
//     subcategory: "Steel",
//     unit: "rod",
//     price: 2800,
//     stock: 350,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6O9uA1z7fyWWUrxLWAKJdaFxwiHViK.png",
//   },
//   {
//     id: "3",
//     name: "Clay Bricks",
//     description: "Standard size clay bricks for walls and partitions",
//     category: "RAW MATERIAL",
//     subcategory: "Bricks",
//     unit: "piece",
//     price: 45,
//     stock: 10000,
//     image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5GQi5Q4D5LCFChBfhyTYAHrKIC2Q5X.png",
//   },
// ]

// function SupplierDashboardPage() {
//   const [items, setItems] = useState(initialItems)
//   const [selectedItem, setSelectedItem] = useState<null | typeof initialItems[0]>(null)
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [searchQuery, setSearchQuery] = useState("")

//   // Filter items based on search query
//   const filteredItems = items.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.category.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const handleAddItem = (newItem: {
//     name: string;
//     description: string;
//     category: string;
//     subcategory: string;
//     unit: string;
//     price: number;
//     stock: number;
//     image: string;
//   }) => {
//     const itemWithId = {
//       ...newItem,
//       id: (items.length + 1).toString(),
//     }
//     setItems([...items, itemWithId])
//   }

//   const handleUpdateItem = (id: string, updatedItem: any) => {
//     setItems(items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)))
//     setSelectedItem(null)
//   }

//   const handleDeleteItem = (id: string) => {
//     setItems(items.filter((item) => item.id !== id))
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <SupplierProfile supplier={supplierData} />

//       <Tabs defaultValue="catalogue" className="mt-8">
//         <div className="flex justify-between items-center mb-4">
//           <TabsList>
//             <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//             <TabsTrigger value="settings">Settings</TabsTrigger>
//           </TabsList>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setViewMode("grid")}
//               className={viewMode === "grid" ? "bg-secondary" : ""}
//             >
//               <Grid className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setViewMode("list")}
//               className={viewMode === "list" ? "bg-secondary" : ""}
//             >
//               <List className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <TabsContent value="catalogue" className="space-y-4">
//           <div className="flex justify-between items-center">
//             <div className="flex-1 max-w-sm">
//               <Input
//                 placeholder="Search your catalogue..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" /> Add Item
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Add New Item</DialogTitle>
//                   <DialogDescription>Add a new item to your catalogue. Click save when you're done.</DialogDescription>
//                 </DialogHeader>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault()
//                     const formData = new FormData(e.currentTarget)
//                     const newItem = {
//                       name: formData.get("name") as string,
//                       description: formData.get("description") as string,
//                       category: formData.get("category") as string,
//                       subcategory: formData.get("subcategory") as string,
//                       unit: formData.get("unit") as string,
//                       price: Number(formData.get("price")),
//                       stock: Number(formData.get("stock")),
//                       image: formData.get("image") as string,
//                     }
//                     handleAddItem(newItem)
//                     e.currentTarget.reset()
//                   }}
//                 >
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="name">Name</Label>
//                       <Input id="name" name="name" required />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="description">Description</Label>
//                       <Textarea id="description" name="description" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="grid gap-2">
//                         <Label htmlFor="category">Category</Label>
//                         <Input id="category" name="category" required />
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor="subcategory">Subcategory</Label>
//                         <Input id="subcategory" name="subcategory" />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="grid gap-2">
//                         <Label htmlFor="unit">Unit</Label>
//                         <Input id="unit" name="unit" required />
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor="price">Price (Rs.)</Label>
//                         <Input id="price" name="price" type="number" required />
//                       </div>
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="stock">Stock Quantity</Label>
//                       <Input id="stock" name="stock" type="number" required />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="image">Image URL</Label>
//                       <Input id="image" name="image" placeholder="https://example.com/image.jpg" />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button type="submit">Save Item</Button>
//                   </DialogFooter>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>

//           {viewMode === "grid" ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredItems.map((item) => (
//                 <SupplierItemCard
//                   key={item.id}
//                   item={item}
//                   onEdit={() => setSelectedItem(item)}
//                   onDelete={() => handleDeleteItem(item.id)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <SupplierItemList
//               items={filteredItems}
//               onEdit={(item) => setSelectedItem(item)}
//               onDelete={(id) => handleDeleteItem(id)}
//             />
//           )}
//         </TabsContent>

//         <TabsContent value="analytics">
//           <Card>
//             <CardHeader>
//               <CardTitle>Analytics</CardTitle>
//               <CardDescription>View your sales and performance metrics.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">Analytics features coming soon.</p>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="settings">
//           <Card>
//             <CardHeader>
//               <CardTitle>Settings</CardTitle>
//               <CardDescription>Manage your account settings and preferences.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-muted-foreground">Settings features coming soon.</p>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Edit Item Dialog */}
//       <Dialog
//         open={!!selectedItem}
//         onOpenChange={(open) => {
//           if (!open) {
//             setTimeout(() => setSelectedItem(null), 0)
//           }
//         }}
//       >
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit Item</DialogTitle>
//             <DialogDescription>Make changes to your item. Click save when you're done.</DialogDescription>
//           </DialogHeader>
//           {selectedItem && (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault()
//                 const formData = new FormData(e.currentTarget)
//                 const updatedItem = {
//                   name: formData.get("name") as string,
//                   description: formData.get("description") as string,
//                   category: formData.get("category") as string,
//                   subcategory: formData.get("subcategory") as string,
//                   unit: formData.get("unit") as string,
//                   price: Number(formData.get("price")),
//                   stock: Number(formData.get("stock")),
//                   image: formData.get("image") as string,
//                 }
//                 handleUpdateItem(selectedItem.id, updatedItem)
//               }}
//             >
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="edit-name">Name</Label>
//                   <Input id="edit-name" name="name" defaultValue={selectedItem.name} required />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="edit-description">Description</Label>
//                   <Textarea id="edit-description" name="description" defaultValue={selectedItem.description} />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="edit-category">Category</Label>
//                     <Input id="edit-category" name="category" defaultValue={selectedItem.category} required />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="edit-subcategory">Subcategory</Label>
//                     <Input id="edit-subcategory" name="subcategory" defaultValue={selectedItem.subcategory} />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="edit-unit">Unit</Label>
//                     <Input id="edit-unit" name="unit" defaultValue={selectedItem.unit} required />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="edit-price">Price (Rs.)</Label>
//                     <Input id="edit-price" name="price" type="number" defaultValue={selectedItem.price} required />
//                   </div>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="edit-stock">Stock Quantity</Label>
//                   <Input id="edit-stock" name="stock" type="number" defaultValue={selectedItem.stock} required />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="edit-image">Image URL</Label>
//                   <Input id="edit-image" name="image" defaultValue={selectedItem.image} />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit">Save Changes</Button>
//               </DialogFooter>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default withPageAuthRequired(SupplierDashboardPage);
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Grid, List } from "lucide-react"
import { SupplierProfile } from "@/components/supplier-profile"
import { SupplierItemCard } from "@/components/supplier-item-card"
import { SupplierItemList } from "@/components/supplier-item-list"
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client"
import { getSupplierByEmail, getSupplierById, updateSupplier, deleteSupplier } from "@/app/api"
import { Supplier } from "@/app/api" // ensure Supplier interface is exported from your API module

// Mock catalogue items (unchanged)
const initialItems = [
  {
    id: "1",
    name: "Premium Cement",
    description: "High-quality cement suitable for all construction needs",
    category: "RAW MATERIAL",
    subcategory: "Cement",
    unit: "50kg bag",
    price: 1250,
    stock: 500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L2OQTXWXG3u8buSbv2GLEph1JMXdtL.png",
  },
  {
    id: "2",
    name: "Steel Rebar (12mm)",
    description: "Reinforcement steel bars for concrete structures",
    category: "RAW MATERIAL",
    subcategory: "Steel",
    unit: "rod",
    price: 2800,
    stock: 350,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6O9uA1z7fyWWUrxLWAKJdaFxwiHViK.png",
  },
  {
    id: "3",
    name: "Clay Bricks",
    description: "Standard size clay bricks for walls and partitions",
    category: "RAW MATERIAL",
    subcategory: "Bricks",
    unit: "piece",
    price: 45,
    stock: 10000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5GQi5Q4D5LCFChBfhyTYAHrKIC2Q5X.png",
  },
]

function SupplierDashboardPage() {
  const { user, error: userError, isLoading: userLoading } = useUser()
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [supplierLoading, setSupplierLoading] = useState(true)
  const [supplierError, setSupplierError] = useState<Error | null>(null)

  // Fetch supplier data using the user's email.
  useEffect(() => {
    if (user && user.email) {
      getSupplierByEmail(user.email)
        .then((data) => {
          setSupplier(data)
          setSupplierLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching supplier:", err)
          setSupplierError(err)
          setSupplierLoading(false)
        })
    } else {
      setSupplierLoading(false)
    }
  }, [user])
// Map API supplier to SupplierProfileProps shape.
const mapSupplierToProfile = (supplier: {
    id: string
    email: string
    pid: string
    business_name: string
    business_description: string
    telephone: string
    email_given: string
    address: string
    location: { latitude: number; longitude: number }
    profile_pic_url: string
    cover_pic_url: string
  }): {
    id: string
    name: string
    email: string
    telephone: string
    address: string
    location: { lat: string; lng: string }
    profileImage: string
    coverImage: string
    description: string
  } => ({
    id: supplier.id,
    name: supplier.business_name,
    email: supplier.email,
    telephone: supplier.telephone,
    address: supplier.address,
    location: {
      lat: supplier.location.latitude.toString(),
      lng: supplier.location.longitude.toString(),
    },
    profileImage: supplier.profile_pic_url,
    coverImage: supplier.cover_pic_url,
    description: supplier.business_description,
  });
  
  // Catalogue and view state.
  const [items, setItems] = useState(initialItems)
  const [selectedItem, setSelectedItem] = useState<null | typeof initialItems[0]>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter items based on search query.
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddItem = (newItem: {
    name: string
    description: string
    category: string
    subcategory: string
    unit: string
    price: number
    stock: number
    image: string
  }) => {
    const itemWithId = {
      ...newItem,
      id: (items.length + 1).toString(),
    }
    setItems([...items, itemWithId])
  }

  const handleUpdateItem = (id: string, updatedItem: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)))
    setSelectedItem(null)
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (userLoading || supplierLoading) {
    return <div>Loading...</div>
  }

  if (userError || supplierError) {
    return <div>Error loading supplier data.</div>
  }

  if (!supplier) {
    return <div>No supplier found for {user?.email}.</div>
  }

  return (
    <div className="container mx-auto py-10">
      {/* Supplier profile fields are auto-filled from the fetched supplier object */}
      {supplier && <SupplierProfile supplier={mapSupplierToProfile(supplier)} />}

      <Tabs defaultValue="catalogue" className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-secondary" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-secondary" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="catalogue" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="Search your catalogue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>Add a new item to your catalogue. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const newItem = {
                      name: formData.get("name") as string,
                      description: formData.get("description") as string,
                      category: formData.get("category") as string,
                      subcategory: formData.get("subcategory") as string,
                      unit: formData.get("unit") as string,
                      price: Number(formData.get("price")),
                      stock: Number(formData.get("stock")),
                      image: formData.get("image") as string,
                    }
                    handleAddItem(newItem)
                    e.currentTarget.reset()
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Input id="subcategory" name="subcategory" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input id="unit" name="unit" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price (Rs.)</Label>
                        <Input id="price" name="price" type="number" required />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input id="stock" name="stock" type="number" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input id="image" name="image" placeholder="https://example.com/image.jpg" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Item</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <SupplierItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => setSelectedItem(item)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </div>
          ) : (
            <SupplierItemList
              items={filteredItems}
              onEdit={(item) => setSelectedItem(item)}
              onDelete={(id) => handleDeleteItem(id)}
            />
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View your sales and performance metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Item Dialog */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => setSelectedItem(null), 0)
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Make changes to your item. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const updatedItem = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  category: formData.get("category") as string,
                  subcategory: formData.get("subcategory") as string,
                  unit: formData.get("unit") as string,
                  price: Number(formData.get("price")),
                  stock: Number(formData.get("stock")),
                  image: formData.get("image") as string,
                }
                handleUpdateItem(selectedItem.id, updatedItem)
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" name="name" defaultValue={selectedItem.name} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea id="edit-description" name="description" defaultValue={selectedItem.description} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Input id="edit-category" name="category" defaultValue={selectedItem.category} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-subcategory">Subcategory</Label>
                    <Input id="edit-subcategory" name="subcategory" defaultValue={selectedItem.subcategory} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-unit">Unit</Label>
                    <Input id="edit-unit" name="unit" defaultValue={selectedItem.unit} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Price (Rs.)</Label>
                    <Input id="edit-price" name="price" type="number" defaultValue={selectedItem.price} required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Stock Quantity</Label>
                  <Input id="edit-stock" name="stock" type="number" defaultValue={selectedItem.stock} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input id="edit-image" name="image" defaultValue={selectedItem.image} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withPageAuthRequired(SupplierDashboardPage)
