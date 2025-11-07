// "use client"
// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import { SupplierProfile } from "@/components/supplier-profile"
// import { SupplierItemCard } from "@/components/supplier-item-card"
// import { SupplierItemList } from "@/components/supplier-item-list"
// import { getSupplierById, getItemsBySupplier } from "@/app/api"
// import type { Supplier, Item } from "@/app/api"
// import { Button } from "@/components/ui/button"
// import { Grid, List } from "lucide-react"

// export default function PublicSupplierPage() {
//   const { supplierId } = useParams<{ supplierId: string }>()
//   const [supplier, setSupplier] = useState<Supplier | null>(null)
//   const [items, setItems] = useState<Item[]>([])
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

//   // Fetch supplier info
//   useEffect(() => {
//     if (supplierId) {
//       getSupplierById(supplierId)
//         .then((data) => setSupplier(data))
//         .catch((err) => console.error("Error fetching supplier:", err))
//     }
//   }, [supplierId])

//   // Fetch items for this supplier
//   useEffect(() => {
//     if (supplier && supplier.pid) {
//       getItemsBySupplier(supplier.pid)
//         .then((data) => setItems(data))
//         .catch((err) => console.error("Error fetching supplier items:", err))
//     }
//   }, [supplier])

//   if (!supplier) {
//     return <div className="container mx-auto py-10">Loading supplier...</div>
//   }

//   // Map to supplierProfile shape
//   const profileData = {
//     id: supplier.id,
//     name: supplier.business_name,
//     email: supplier.email,
//     telephone: supplier.telephone,
//     address: supplier.address,
//     location: {
//       lat: supplier.location.latitude.toString(),
//       lng: supplier.location.longitude.toString(),
//     },
//     profileImage: supplier.profile_pic_url,
//     coverImage: supplier.cover_pic_url,
//     description: supplier.business_description,
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <SupplierProfile supplier={profileData} admin={false} />
//       <div className="mt-8 flex items-center gap-2">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setViewMode("grid")}
//           className={viewMode === "grid" ? "bg-secondary" : ""}
//         >
//           <Grid className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setViewMode("list")}
//           className={viewMode === "list" ? "bg-secondary" : ""}
//         >
//           <List className="h-4 w-4" />
//         </Button>
//       </div>
//       <div className="mt-4">
//         {viewMode === "grid" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {items.map((item) => (
//               <SupplierItemCard
//                 key={item.id}
//                 item={item}
//                 onEdit={() => console.log(`Edit item ${item.id}`)}
//                 onDelete={() => console.log(`Delete item ${item.id}`)}
//                 admin={false}
//               />
//             ))}
//           </div>
//         ) : (
//           <SupplierItemList
//             items={items}
//             onEdit={(id) => console.log(`Edit item ${id}`)}
//             onDelete={(id) => console.log(`Delete item ${id}`)}
//             admin={false}
//           />
//         )}
//       </div>
//     </div>
//   )
// }
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import { SupplierProfile } from "@/components/supplier-profile";
import { SupplierItemCard } from "@/components/supplier-item-card";
import { SupplierItemList } from "@/components/supplier-item-list";
import { getSupplierByPID, getItemsBySupplier, getTypes, getExchangeRates } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, List, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CategorySidebar from "@/components/categorySidebar"
import { Suspense } from "react"
import Loading from "@/components/loading"
import { Category, Item, Supplier } from "@/types";

function PublicSupplierPage() {
  const { supplierId } = useParams<{ supplierId: string }>()
  const [supplier, setSupplier] = useState<Supplier | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [types, setTypes] = useState<Category[]>([])
  const [selectedType, setSelectedType] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState("LKR")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
    const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchRates() {
      try {
        const rates = await getExchangeRates();
        setExchangeRates(rates);
      } catch (err) {
        console.error("Failed to fetch exchange rates:", err);
      }
    }
    fetchRates();
  }, []);
  const conversionRate =
    selectedCurrency === "LKR" ? 1 : exchangeRates[selectedCurrency] || 1;
  // Fetch supplier info
  useEffect(() => {
    setIsLoading(true)
    if (supplierId) {
      getSupplierByPID(supplierId)
        .then((data) => setSupplier(data))
        .catch((err) => console.error("Error fetching supplier:", err))
        .finally(() => setIsLoading(false))
    }
  }, [supplierId]);

  // Fetch items for this supplier
  useEffect(() => {
    if (supplier && supplier.pid) {
      getItemsBySupplier(supplier.pid)
        .then((data) => setItems(data))
        .catch((err) => console.error("Error fetching supplier items:", err));
    }
  }, [supplier]);

  // Fetch available types
  useEffect(() => {
    getTypes()
      .then((data) => setTypes(data))
      .catch((err) => console.error("Error fetching types:", err));
  }, []);

  // Filter items by search query and type/category/subcategory
  const filteredItems =
    items &&
    items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        !selectedType ||
        item.type?.toLowerCase() === selectedType.toLowerCase();

      const matchesCategory =
        !selectedCategory ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSubcategory =
        !selectedSubcategory ||
        item.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();

      return (
        matchesSearch && matchesType && matchesCategory && matchesSubcategory
      );
    });

  if (!supplier) {
    return <div className="container mx-auto py-10">Loading supplier...</div>;
  }

  const profileData = {
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
  };
  const convertedItems =
    filteredItems &&
    filteredItems.map((item) => ({
      ...item,
      price:
        typeof item.price === "number"
          ? item.price * conversionRate
          : item.price,
    }));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isLoading && <Loading/>}
    <div className="container mx-auto py-10">
      <SupplierProfile supplier={profileData} admin={false} />
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <CategorySidebar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
          />
        </div>
        <div className="md:w-3/4">
      
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
            <Select onValueChange={(value) => setSelectedCurrency(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select Currency" />
  </SelectTrigger>
  <SelectContent>
  {Object.keys(exchangeRates).map((currency) => (
            <SelectItem key={currency} value={currency}>
              {currency}
            </SelectItem>
          ))}

  </SelectContent>
</Select>
      {/* ...render items with price * getConversionRate() */}
    </div>
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
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems && convertedItems.map((item) => (
                <SupplierItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => console.log(`Edit item ${item.id}`)}
                  onDelete={() => console.log(`Delete item ${item.id}`)}
                  admin={false}
                  displayCurrency={selectedCurrency}
                />
              ))}
            </div>
          ) : (
            filteredItems && 
            <SupplierItemList
            items={convertedItems}
            onEdit={(id) => console.log(`Edit item ${id}`)}
            onDelete={(id) => console.log(`Delete item ${id}`)}
            admin={false}
            displayCurrency={selectedCurrency}
          />
            
          )}
        </div>
      </div>
    </div>
    </Suspense>
  );
}

export default PublicSupplierPage
