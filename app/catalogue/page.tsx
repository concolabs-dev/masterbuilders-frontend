
"use client"

import { useEffect, useState } from "react"
import { getMaterialsByCategory, getTypes, searchMaterials, getExchangeRates } from "../api"
import { MaterialCard } from "@/components/material-card"
import { PriceChart } from "@/components/price-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { Item, getItemsByMaterialID } from "@/app/api"
import { SupplierItemList } from "@/components/supplier-item-list"
import { Head } from "next/document"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Loading from "@/components/loading"
interface Material {

  id: string
  Number: string
  Name: string
  Type: string
  Category: {
    Category: string
    Subcategory: string | null
    "Sub subcategory": string | null
  }
  Unit: string
  Prices: [string, number | null][]
}

interface Category {
  name: string
  categories: {
    name: string
    subcategories: {
      name: string
      sub_subcategories: string[]
    }[]
  }[]
}

export default function Catalogue() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [expandedTypes, setExpandedTypes] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [tempsearchQuery, setTempSearchQuery] = useState<string>("")
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // New state for currency conversion:
  const [selectedCurrency, setSelectedCurrency] = useState<string>("LKR")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [materialItems, setMaterialItems] = useState<Item[]>([])

  useEffect(() => {
    setIsLoading(true)
    console.log(selectedMaterial?.Name)
    if (selectedMaterial) {
      getItemsByMaterialID(encodeURIComponent(selectedMaterial.id))
       .then((data) => {setMaterialItems(data);setIsLoading(false)})
        .catch((err) => console.error("Error fetching items by material name:", err))
    }
    console.log(materialItems)
  
  }, [selectedMaterial])
  // Fetch exchange rates from our API (returns major_currencies)
  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const rates = await getExchangeRates()
        setExchangeRates(rates)
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error)
      }
    }
    fetchExchangeRates()
  }, [])

  const handleButtonClick = () => {
    setSearchQuery(tempsearchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(tempsearchQuery)
    }
  }
  const callAPI = async () => {
    try {
      const res = await fetch("/api/test")
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    const fetchCategories = async () => {
      try {
        const data = await getTypes()
        setCategories(data)
        if (data.length > 0 && data[0].categories.length > 0) {
          setSelectedType(data[0].name)
          setSelectedCategory(data[0].categories[0].name)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
    callAPI()
  }, [])

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        if (tempsearchQuery.trim()) {
          // Perform search when query exists
          const data = await searchMaterials(searchQuery, selectedSubcategory || undefined)
          setTempSearchQuery("")
          setMaterials(data)
        } else if (selectedCategory) {
          // Fetch based on category when no search query
          const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
          setMaterials(data)
        }
      } catch (error) {
        console.error("Error fetching materials:", error)
      }
    }
    fetchMaterials()
  }, [selectedCategory, selectedSubcategory, searchQuery])

  // A helper to get the conversion rate (1 for LKR, or lookup from exchangeRates)
  const getConversionRate = () => {
    return selectedCurrency === "LKR" ? 1 : (exchangeRates[selectedCurrency] || 1)
  }

  return (
    <>
    {isLoading && <Loading/>}
         {/* <Head>
    <title>Catalogue</title>
    <meta name="description" content="This is a catalogue of all the construction material items by various suppliers. Price vatriation by with the timeline and the currency conversion ability is also there. " />
  </Head> */}
    <div className="container mx-auto px-4 py-8">
      <Button className="md:hidden bg-slate-900 mb-4" onClick={() => setShowSidebar(!showSidebar)}>
        <Menu className="h-6 w-6" />
        Categories
      </Button>

      {/* Currency selection dropdown */}

      <div className="mb-4 flex items-center gap-2">
        {/* <label htmlFor="currency" className="font-medium">
          Currency:
        </label> */}
 
        {/* <select
          id="currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="LKR">LKR</option>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select> */}
      </div>

      <div className="grid gap-6 md:grid-cols-[400px_1fr]">
        <aside
          className={`space-y-4 bg-slate-900 p-4 rounded-lg text-white md:block ${
            showSidebar ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg font-semibold">Categories</h2>
          {categories.map((type) => (
            <div key={type.name}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:text-white hover:bg-slate-800 ${
                  selectedType === type.name ? "font-bold" : ""
                }`}
                onClick={() => {
                  setSelectedType(type.name)
                  setExpandedTypes((prev) =>
                    prev.includes(type.name) ? prev.filter((t) => t !== type.name) : [...prev, type.name]
                  )
                }}
              >
                {expandedTypes.includes(type.name) ? (
                  <ChevronDown className="mr-2 h-4 w-4" />
                ) : (
                  <ChevronRight className="mr-2 h-4 w-4" />
                )}{" "}
                {type.name}
              </Button>
              {expandedTypes.includes(type.name) && (
                <div className="ml-4">
                  {type.categories.map((category) => (
                    <div key={category.name}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start pl-6 text-slate-300 hover:text-white hover:bg-slate-800 ${
                          selectedCategory === category.name ? "font-bold" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(category.name)
                          setSelectedSubcategory(null)
                          setExpandedCategories((prev) =>
                            prev.includes(category.name)
                              ? prev.filter((c) => c !== category.name)
                              : [...prev, category.name]
                          )
                        }}
                      >
                        {expandedCategories.includes(category.name) ? (
                          <ChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <ChevronRight className="mr-2 h-4 w-4" />
                        )}{" "}
                        {category.name}
                      </Button>
                      {expandedCategories.includes(category.name) &&
                        category.subcategories &&
                        category.subcategories.map((sub) => (
                          <div className="ml-6" key={sub.name}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start pl-8 text-slate-400 hover:text-white hover:bg-slate-800 ${
                                selectedSubcategory === sub.name ? "font-bold" : ""
                              }`}
                              onClick={() => {
                                setSelectedSubcategory(sub.name)
                              }}
                            >
                              {sub.name}
                            </Button>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Cost Catalogue</h1>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search materials..."
              className="max-w-sm"
              value={tempsearchQuery}
              onChange={(e) => setTempSearchQuery(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <Button onClick={handleButtonClick}>Search</Button>
            <Button
              variant="outline"
              onClick={() => {
                setTempSearchQuery("")
                setSearchQuery("")
              }}
            >
              Clear
            </Button>
            <Select onValueChange={(value) => setSelectedCurrency(value)}>
  <SelectTrigger className="w-[180px] bg-primary text-white font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 rounded-lg ">
    <span className="text-white">
      <SelectValue placeholder="Select Currency" />
    </span>
  </SelectTrigger>
  <SelectContent>
    {Object.keys(exchangeRates).map((currency) => (
      <SelectItem key={currency} value={currency}>
        {currency}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materials.length > 0 ? (
              materials.map((material) => {
                const priceLKR = material.Prices.find((p) => p[1])?.[1] || 0
                const conversionRate = getConversionRate()
                const displayedPrice = priceLKR * conversionRate
                return (
                  <MaterialCard
                    key={material.Number}
                    name={material.Name}
                    unit={material.Unit}
                    location="National"
                    rating={4}
                    // price={`${selectedCurrency} ${displayedPrice.toFixed(2)}`}
                    price={displayedPrice}
                    currency_t={selectedCurrency || ""}
                    onClick={() => setSelectedMaterial(material)}
                  />
                )
              })
            ) : (
              <p className="text-gray-500">No materials found</p>
            )}
          </div>
        </div>
      </div>
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMaterial && (
            <div className="p-4 space-y-4 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">{selectedMaterial.Name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-center">
                  {(() => {
                    const latestPriceLKR =
                    selectedMaterial.Prices
                      .slice() // Create a shallow copy to avoid mutating the original array
                      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort by date descending
                      .find((p) => p[1])?.[1] || 0
                    const conversionRate = getConversionRate()
                    const displayedPrice = latestPriceLKR * conversionRate
                    return (
                      <p className="text-gray-700 text-lg">
                        Latest Price:{" "}
                        <span className="text-green-600">
                          {selectedCurrency} {displayedPrice.toFixed(2)}
                        </span>
                      </p>
                    )
                  })()}
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Category:</span> {selectedMaterial.Category.Category}
                  </p>
                </div>
                {selectedMaterial.Category.Subcategory && (
                  <div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Subcategory:</span> {selectedMaterial.Category.Subcategory}
                    </p>
                  </div>
                )}
                {selectedMaterial.Category["Sub subcategory"] && (
                  <div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Sub-Subcategory:</span>{" "}
                      {selectedMaterial.Category["Sub subcategory"]}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Unit:</span> {selectedMaterial.Unit}
                  </p>
                </div>
              </div>

              <PriceChart
                itemName={selectedMaterial.Name}
                prices={selectedMaterial.Prices.map(([date, price]) => {
                  const converted = price ? price * getConversionRate() : 0
                  return { date, price: converted }
                })}
                currency={selectedCurrency}
                onClose={() => setSelectedMaterial(null)}
              />
                        {selectedMaterial && materialItems&& (
            <div className="mt-4">
            <h2 className="text-lg font-semibold">Items</h2>
            <div className="h-64 overflow-auto">
            <SupplierItemList
  items={materialItems.map((item) => {
    const conversionRate = selectedCurrency === "LKR"
      ? 1
      : (exchangeRates[selectedCurrency] || 1)
    const convertedPrice = item.price * conversionRate

    return {
      ...item,
      price: convertedPrice,     // overwrite price with converted
    }
  })}
  onEdit={() => {}}
  onDelete={() => {}}
  admin={false}
  displayCurrency={selectedCurrency}
/>
            </div>
          </div>
          )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div></>
  )
}
