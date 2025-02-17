
// // "use client"

// // import { useEffect, useState } from "react"
// // import { getMaterialsByCategory, getTypes, searchMaterials, createMaterial, updateMaterial, deleteMaterial } from "../api"
// // import { MaterialCard } from "@/components/material-card"
// // import { PriceChart } from "@/components/price-chart"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter
// // } from "@/components/ui/dialog"
// // import { ChevronDown, ChevronRight, Menu } from "lucide-react"

// // // Types
// // export interface Material {
// //   ID: string
// //   Number: string
// //   Name: string
// //   Type: string
// //   Category: {
// //     Category: string
// //     Subcategory: string | null
// //     "Sub subcategory": string | null
// //   }
// //   Qty: number
// //   Unit: string
// //   Prices: [string, number | null][]
// //   Source: string | null
// // }

// // export interface Category {
// //   name: string
// //   categories: {
// //     name: string
// //     subcategories: {
// //       name: string
// //       sub_subcategories: string[]
// //     }[]
// //   }[]
// // }

// // export default function Catalogue() {
// //   const [materials, setMaterials] = useState<Material[]>([])
// //   const [categories, setCategories] = useState<Category[]>([])
// //   const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
// //   const [expandedTypes, setExpandedTypes] = useState<string[]>([])
// //   const [expandedCategories, setExpandedCategories] = useState<string[]>([])
// //   const [selectedType, setSelectedType] = useState<string | null>(null)
// //   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
// //   const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [tempsearchQuery, setTempSearchQuery] = useState("")
// //   const [showSidebar, setShowSidebar] = useState(false)

// //   // Admin edit state
// //   const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
// //   const [editDialogOpen, setEditDialogOpen] = useState(false)
// //   const [editName, setEditName] = useState("")
// //   const [editUnit, setEditUnit] = useState("")
// //   const [editType, setEditType] = useState("")
// //   const [editCategory, setEditCategory] = useState("")
// //   const [editSubcategory, setEditSubcategory] = useState("")
// //   const [editSubSubcategory, setEditSubSubcategory] = useState("")
// //   const [editPrices, setEditPrices] = useState<[string, number | null][]>([])

// //   const handleButtonClick = () => {
// //     setSearchQuery(tempsearchQuery)
// //   }

// //   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Enter") {
// //       setSearchQuery(tempsearchQuery)
// //     }
// //   }

// //   // Fetch types (includes top-level name + categories + subcategories)
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const data = await getTypes()
// //         setCategories(data)
// //         if (data.length && data[0].categories.length) {
// //           setSelectedType(data[0].name)
// //           setSelectedCategory(data[0].categories[0].name)
// //         }
// //       } catch (error) {
// //         console.error("Error fetching categories:", error)
// //       }
// //     }
// //     fetchCategories()
// //   }, [])

// //   // Fetch materials based on search or category
// //   useEffect(() => {
// //     const fetchMaterials = async () => {
// //       try {
// //         if (tempsearchQuery.trim()) {
// //           const data = await searchMaterials(searchQuery, selectedSubcategory || undefined)
// //           setTempSearchQuery("")
// //           setMaterials(data)
// //         } else if (selectedCategory) {
// //           const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
// //           setMaterials(data)
// //         }
// //       } catch (error) {
// //         console.error("Error fetching materials:", error)
// //       }
// //     }
// //     fetchMaterials()
// //   }, [selectedCategory, selectedSubcategory, searchQuery])

// //   // Open edit dialog and populate states
// //   const openEditDialog = (material: Material) => {
// //     setEditingMaterial(material)
// //     setEditName(material.Name)
// //     setEditUnit(material.Unit)
// //     setEditType(material.Type || "")
// //     setEditCategory(material.Category.Category || "")
// //     setEditSubcategory(material.Category.Subcategory || "")
// //     setEditSubSubcategory(material.Category["Sub subcategory"] || "")
// //     setEditPrices(material.Prices)
// //     setEditDialogOpen(true)
// //   }

// //   const closeEditDialog = () => {
// //     setEditDialogOpen(false)
// //     setEditingMaterial(null)
// //   }

// //   // Change handlers for the chained selects
// //   const handleTypeChange = (value: string) => {
// //     setEditType(value)
// //     // Reset subsequent
// //     setEditCategory("")
// //     setEditSubcategory("")
// //     setEditSubSubcategory("")
// //   }

// //   const handleCategoryChange = (value: string) => {
// //     setEditCategory(value)
// //     setEditSubcategory("")
// //     setEditSubSubcategory("")
// //   }

// //   const handleSubcategoryChange = (value: string) => {
// //     setEditSubcategory(value)
// //     setEditSubSubcategory("")
// //   }

// //   const handleEditSave = async () => {
// //     if (!editingMaterial) return
// //     try {
// //       await updateMaterial(editingMaterial.Number, {
// //         Name: editName,
// //         Unit: editUnit,
// //         Type: editType,
// //         Category: {
// //           Category: editCategory,
// //           Subcategory: editSubcategory,
// //           "Sub subcategory": editSubSubcategory
// //         },
// //         Prices: editPrices
// //       })
// //       if (selectedCategory) {
// //         const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
// //         setMaterials(data)
// //       }
// //     } catch (error) {
// //       console.error("Error updating material:", error)
// //     }
// //     closeEditDialog()
// //   }

// //   // Add a new month to all materials
// //   const addNewMonthToAllMaterials = async () => {
// //     const newMonth = new Date()
// //     newMonth.setMonth(newMonth.getMonth() + 1)
// //     newMonth.setDate(1)
// //     const newMonthString = newMonth.toISOString().split("T")[0] + " 00:00:00"

// //     const updatedMaterials = materials.map((material) => ({
// //       ...material,
// //       Prices: [...material.Prices, [newMonthString, null] as [string, number | null]]
// //     }))

// //     try {
// //       await Promise.all(updatedMaterials.map((material) => updateMaterial(material.Number, { Prices: material.Prices })))
// //       setMaterials(updatedMaterials)
// //     } catch (error) {
// //       console.error("Error adding new month to materials:", error)
// //     }
// //   }

// //   // Helpers to get the current relevant lists for the selects
// //   const currentType = categories.find(t => t.name === editType)
// //   const currentCat = currentType?.categories?.find(c => c.name === editCategory)
// //   const currentSub = currentCat?.subcategories?.find(s => s.name === editSubcategory)

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <Button className="md:hidden bg-slate-900 mb-4" onClick={() => setShowSidebar(!showSidebar)}>
// //         <Menu className="h-6 w-6" />
// //         Categories
// //       </Button>
// //       <div className="grid gap-6 md:grid-cols-[400px_1fr]">
// //         <aside className={`space-y-4 bg-slate-900 p-4 rounded-lg text-white md:block ${showSidebar ? "block" : "hidden"}`}>
// //           <h2 className="text-lg font-semibold">Categories</h2>
// //           {categories.map((type) => (
// //             <div key={type.name}>
// //               <Button
// //                 variant="ghost"
// //                 className={`w-full justify-start text-white hover:text-white hover:bg-slate-800 ${selectedType === type.name ? "font-bold" : ""}`}
// //                 onClick={() => {
// //                   setSelectedType(type.name)
// //                   setExpandedTypes((prev) =>
// //                     prev.includes(type.name) ? prev.filter((t) => t !== type.name) : [...prev, type.name]
// //                   )
// //                 }}
// //               >
// //                 {expandedTypes.includes(type.name) ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
// //                 {type.name}
// //               </Button>
// //               {expandedTypes.includes(type.name) && (
// //                 <div className="ml-4">
// //                   {type.categories.map((cat) => (
// //                     <div key={cat.name}>
// //                       <Button
// //                         variant="ghost"
// //                         className={`w-full justify-start pl-6 text-slate-300 hover:text-white hover:bg-slate-800 ${
// //                           selectedCategory === cat.name ? "font-bold" : ""
// //                         }`}
// //                         onClick={() => {
// //                           setSelectedCategory(cat.name)
// //                           setSelectedSubcategory(null)
// //                           setExpandedCategories((prev) =>
// //                             prev.includes(cat.name) ? prev.filter((c) => c !== cat.name) : [...prev, cat.name]
// //                           )
// //                         }}
// //                       >
// //                         {expandedCategories.includes(cat.name) ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
// //                         {cat.name}
// //                       </Button>
// //                       {expandedCategories.includes(cat.name) && cat.subcategories && (
// //                         <div className="ml-6">
// //                           {cat.subcategories.map((sub) => (
// //                             <Button
// //                               key={sub.name}
// //                               variant="ghost"
// //                               className={`w-full justify-start pl-8 text-slate-400 hover:text-white hover:bg-slate-800 ${
// //                                 selectedSubcategory === sub.name ? "font-bold" : ""
// //                               }`}
// //                               onClick={() => {
// //                                 setSelectedSubcategory(sub.name)
// //                               }}
// //                             >
// //                               {sub.name}
// //                             </Button>
// //                           ))}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </aside>
// //         <div className="space-y-6">
// //           <h1 className="text-3xl font-bold">Cost Catalogue (Admin)</h1>
// //           <div className="flex items-center gap-4">
// //             <Input
// //               placeholder="Search materials..."
// //               className="max-w-sm"
// //               value={tempsearchQuery}
// //               onChange={(e) => setTempSearchQuery(e.target.value)}
// //               onKeyUp={handleKeyPress}
// //             />
// //             <Button onClick={handleButtonClick}>Search</Button>
// //             <Button variant="outline" onClick={() => { setTempSearchQuery(""); setSearchQuery(""); }}>
// //               Clear
// //             </Button>
// //             <Button variant="outline" onClick={addNewMonthToAllMaterials}>
// //               Add New Month to All Materials
// //             </Button>
// //           </div>
// //           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //             {materials.length > 0 ? (
// //               materials.map((material) => (
// //                 <div key={material.Number} className="relative">
// //                   <MaterialCard
// //                     name={material.Name}
// //                     unit={material.Unit}
// //                     location="National"
// //                     rating={4}
// //                     price={material.Prices.find((p) => p[1])?.[1] || 0}
// //                     onClick={() => setSelectedMaterial(material)}
// //                   />
// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     className="absolute top-2 right-2"
// //                     onClick={() => openEditDialog(material)}
// //                   >
// //                     Edit
// //                   </Button>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-gray-500">No materials found</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* View Material Dialog */}
// //       <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
// //         <DialogContent className="max-w-2xl">
// //           {selectedMaterial && (
// //             <div className="p-4 space-y-4 bg-white rounded-lg">
// //               <h2 className="text-2xl font-bold text-center mb-4">{selectedMaterial.Name}</h2>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="col-span-2 text-center">
// //                   <p className="text-gray-700 text-lg">
// //                     Latest Price: <span className="text-green-600">${selectedMaterial.Prices.find((p) => p[1])?.[1]?.toFixed(2) || 0}</span>
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-gray-600"><span className="font-semibold">Category:</span> {selectedMaterial.Category.Category}</p>
// //                 </div>
// //                 {selectedMaterial.Category.Subcategory && (
// //                   <div>
// //                     <p className="text-gray-600"><span className="font-semibold">Subcategory:</span> {selectedMaterial.Category.Subcategory}</p>
// //                   </div>
// //                 )}
// //                 {selectedMaterial.Category["Sub subcategory"] && (
// //                   <div>
// //                     <p className="text-gray-600">
// //                       <span className="font-semibold">Sub-Subcategory:</span> {selectedMaterial.Category["Sub subcategory"]}
// //                     </p>
// //                   </div>
// //                 )}
// //                 <div>
// //                   <p className="text-gray-600"><span className="font-semibold">Unit:</span> {selectedMaterial.Unit}</p>
// //                 </div>
// //               </div>
// //               <PriceChart
// //                 itemName={selectedMaterial.Name}
// //                 prices={selectedMaterial.Prices.map(([date, price]) => ({ date, price }))}
// //                 onClose={() => setSelectedMaterial(null)}
// //               />
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>

// //       {/* Edit Material Dialog */}
// //       <Dialog open={editDialogOpen} onOpenChange={closeEditDialog}>
// //         <DialogContent className="max-w-xl">
// //           <DialogHeader>
// //             <DialogTitle>Edit Material</DialogTitle>
// //           </DialogHeader>
// //           <div className="space-y-4 mt-4">
// //             <Input
// //               placeholder="Material Name"
// //               value={editName}
// //               onChange={(e) => setEditName(e.target.value)}
// //             />
// //             <Input
// //               placeholder="Unit"
// //               value={editUnit}
// //               onChange={(e) => setEditUnit(e.target.value)}
// //             />

// //             {/* Select for Type */}
// //             <div>
// //               <label className="block text-sm font-medium">Type</label>
// //               <select
// //                 className="w-full border p-2 mt-1"
// //                 value={editType}
// //                 onChange={(e) => handleTypeChange(e.target.value)}
// //               >
// //                 <option value="">-- Select Type --</option>
// //                 {categories.map((t) => (
// //                   <option key={t.name} value={t.name}>
// //                     {t.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Select for Category */}
// //             <div>
// //               <label className="block text-sm font-medium">Category</label>
// //               <select
// //                 className="w-full border p-2 mt-1"
// //                 value={editCategory}
// //                 onChange={(e) => handleCategoryChange(e.target.value)}
// //                 disabled={!editType}
// //               >
// //                 <option value="">-- Select Category --</option>
// //                 {currentType?.categories.map((cat) => (
// //                   <option key={cat.name} value={cat.name}>
// //                     {cat.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Select for Subcategory */}
// //             <div>
// //               <label className="block text-sm font-medium">Subcategory</label>
// //               <select
// //                 className="w-full border p-2 mt-1"
// //                 value={editSubcategory}
// //                 onChange={(e) => handleSubcategoryChange(e.target.value)}
// //                 disabled={!editCategory}
// //               >
// //                 <option value="">-- Select Subcategory --</option>
// //                 {currentCat?.subcategories && currentCat?.subcategories.map((sub) => (
// //                   <option key={sub.name} value={sub.name}>
// //                     {sub.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Select for Sub-Subcategory */}
// //             <div>
// //               <label className="block text-sm font-medium">Sub-Subcategory</label>
// //               <select
// //                 className="w-full border p-2 mt-1"
// //                 value={editSubSubcategory}
// //                 onChange={(e) => setEditSubSubcategory(e.target.value)}
// //                 disabled={!editSubcategory}
// //               >
// //                 <option value="">-- Select Sub-Subcategory --</option>
// //                 {currentSub?.sub_subcategories && currentSub?.sub_subcategories.map((item) => (
// //                   <option key={item} value={item}>
// //                     {item}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Section to edit prices */}
// //             <div>
// //               <label className="block text-sm font-medium">Prices</label>
// //               {editPrices.map((price, index) => (
// //                 <div key={index} className="flex gap-2 mt-2">
// //                   <Input
// //                     type="text"
// //                     value={price[0]}
// //                     readOnly
// //                     className="w-1/2"
// //                   />
// //                   <Input
// //                     type="number"
// //                     value={price[1] ?? ""}
// //                     onChange={(e) => {
// //                       const newPrices = [...editPrices]
// //                       newPrices[index][1] = e.target.value ? parseFloat(e.target.value) : null
// //                       setEditPrices(newPrices)
// //                     }}
// //                     className="w-1/2"
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <DialogFooter>
// //             <Button variant="outline" onClick={closeEditDialog}>
// //               Cancel
// //             </Button>
// //             <Button onClick={handleEditSave}>
// //               Save
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   )
// // }
// "use client"

// import { useEffect, useState } from "react"
// import { getMaterialsByCategory, getTypes, searchMaterials, createMaterial, updateMaterial, deleteMaterial , getMaterials} from "../api"
// import { MaterialCard } from "@/components/material-card"
// import { PriceChart } from "@/components/price-chart"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter
// } from "@/components/ui/dialog"
// import { ChevronDown, ChevronRight, Menu } from "lucide-react"

// // Types
// export interface Material {
//   ID: string
//   Number: string
//   Name: string
//   Type: string
//   Category: {
//     Category: string
//     Subcategory: string | null
//     "Sub subcategory": string | null
//   }
//   Qty: number
//   Unit: string
//   Prices: [string, number | null][]
//   Source: string | null
// }

// export interface Category {
//   name: string
//   categories: {
//     name: string
//     subcategories: {
//       name: string
//       sub_subcategories: string[]
//     }[]
//   }[]
// }

// export default function Catalogue() {
//   const [materials, setMaterials] = useState<Material[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
//   const [expandedTypes, setExpandedTypes] = useState<string[]>([])
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([])
//   const [selectedType, setSelectedType] = useState<string | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [tempsearchQuery, setTempSearchQuery] = useState("")
//   const [showSidebar, setShowSidebar] = useState(false)

//   // Admin edit state
//   const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
//   const [editDialogOpen, setEditDialogOpen] = useState(false)
//   const [editName, setEditName] = useState("")
//   const [editUnit, setEditUnit] = useState("")
//   const [editType, setEditType] = useState("")
//   const [editCategory, setEditCategory] = useState("")
//   const [editSubcategory, setEditSubcategory] = useState("")
//   const [editSubSubcategory, setEditSubSubcategory] = useState("")
//   const [editPrices, setEditPrices] = useState<[string, number | null][]>([])

//   const handleButtonClick = () => {
//     setSearchQuery(tempsearchQuery)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       setSearchQuery(tempsearchQuery)
//     }
//   }

//   // Fetch types (includes top-level name + categories + subcategories)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getTypes()
//         setCategories(data)
//         if (data.length && data[0].categories.length) {
//           setSelectedType(data[0].name)
//           setSelectedCategory(data[0].categories[0].name)
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error)
//       }
//     }
//     fetchCategories()
//   }, [])

//   // Fetch materials based on search or category
//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         if (tempsearchQuery.trim()) {
//           const data = await searchMaterials(searchQuery, selectedSubcategory || undefined)
//           setTempSearchQuery("")
//           setMaterials(data)
//         } else if (selectedCategory) {
//           const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
//           setMaterials(data)
//         }
//       } catch (error) {
//         console.error("Error fetching materials:", error)
//       }
//     }
//     fetchMaterials()
//   }, [selectedCategory, selectedSubcategory, searchQuery])

//   // Open edit dialog and populate states
//   const openEditDialog = (material: Material) => {
//     setEditingMaterial(material)
//     setEditName(material.Name)
//     setEditUnit(material.Unit)
//     setEditType(material.Type || "")
//     setEditCategory(material.Category.Category || "")
//     setEditSubcategory(material.Category.Subcategory || "")
//     setEditSubSubcategory(material.Category["Sub subcategory"] || "")
//     setEditPrices(material.Prices)
//     setEditDialogOpen(true)
//   }

//   const closeEditDialog = () => {
//     setEditDialogOpen(false)
//     setEditingMaterial(null)
//   }

//   // Change handlers for the chained selects
//   const handleTypeChange = (value: string) => {
//     setEditType(value)
//     // Reset subsequent
//     setEditCategory("")
//     setEditSubcategory("")
//     setEditSubSubcategory("")
//   }

//   const handleCategoryChange = (value: string) => {
//     setEditCategory(value)
//     setEditSubcategory("")
//     setEditSubSubcategory("")
//   }

//   const handleSubcategoryChange = (value: string) => {
//     setEditSubcategory(value)
//     setEditSubSubcategory("")
//   }

//   const handleEditSave = async () => {
//     if (!editingMaterial) return
//     try {
//       await updateMaterial(editingMaterial.Number, {
//         Name: editName,
//         Unit: editUnit,
//         Type: editType,
//         Category: {
//           Category: editCategory,
//           Subcategory: editSubcategory,
//           "Sub subcategory": editSubSubcategory
//         },
//         Prices: editPrices
//       })
//       if (selectedCategory) {
//         const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
//         setMaterials(data)
//       }
//     } catch (error) {
//       console.error("Error updating material:", error)
//     }
//     closeEditDialog()
//   }

//   // Add a new month to all materials
//   const addNewMonthToAllMaterials = async () => {
//     const newMonth = new Date()
//     newMonth.setMonth(newMonth.getMonth())
//     newMonth.setDate(1)
//     const newMonthString = newMonth.toISOString().split("T")[0] + " 00:00:00"

//     try {
//       const allMaterials = await getMaterials()
//       const updatedMaterials = allMaterials.map((material) => {
//         // Check if the new month already exists in the Prices array
//         const monthExists = material.Prices.some(([date]) => date === newMonthString)
//         if (monthExists) {
//           throw new Error(`Month ${newMonthString} already exists for material ${material.Name}`)
//         }
//         return {
//           ...material,
//           Prices: [...material.Prices, [newMonthString, null] as [string, number | null]]
//         }
//       })
//       await Promise.all(updatedMaterials.map((material) => updateMaterial(material.Number, { Prices: material.Prices })))
//       setMaterials(updatedMaterials)
//     } catch (error) {
//       console.error("Error adding new month to materials:", error)
//     }
//   }

//   // Helpers to get the current relevant lists for the selects
//   const currentType = categories.find(t => t.name === editType)
//   const currentCat = currentType?.categories?.find(c => c.name === editCategory)
//   const currentSub = currentCat?.subcategories?.find(s => s.name === editSubcategory)

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Button className="md:hidden bg-slate-900 mb-4" onClick={() => setShowSidebar(!showSidebar)}>
//         <Menu className="h-6 w-6" />
//         Categories
//       </Button>
//       <div className="grid gap-6 md:grid-cols-[400px_1fr]">
//         <aside className={`space-y-4 bg-slate-900 p-4 rounded-lg text-white md:block ${showSidebar ? "block" : "hidden"}`}>
//           <h2 className="text-lg font-semibold">Categories</h2>
//           {categories.map((type) => (
//             <div key={type.name}>
//               <Button
//                 variant="ghost"
//                 className={`w-full justify-start text-white hover:text-white hover:bg-slate-800 ${selectedType === type.name ? "font-bold" : ""}`}
//                 onClick={() => {
//                   setSelectedType(type.name)
//                   setExpandedTypes((prev) =>
//                     prev.includes(type.name) ? prev.filter((t) => t !== type.name) : [...prev, type.name]
//                   )
//                 }}
//               >
//                 {expandedTypes.includes(type.name) ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
//                 {type.name}
//               </Button>
//               {expandedTypes.includes(type.name) && (
//                 <div className="ml-4">
//                   {type.categories.map((cat) => (
//                     <div key={cat.name}>
//                       <Button
//                         variant="ghost"
//                         className={`w-full justify-start pl-6 text-slate-300 hover:text-white hover:bg-slate-800 ${
//                           selectedCategory === cat.name ? "font-bold" : ""
//                         }`}
//                         onClick={() => {
//                           setSelectedCategory(cat.name)
//                           setSelectedSubcategory(null)
//                           setExpandedCategories((prev) =>
//                             prev.includes(cat.name) ? prev.filter((c) => c !== cat.name) : [...prev, cat.name]
//                           )
//                         }}
//                       >
//                         {expandedCategories.includes(cat.name) ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
//                         {cat.name}
//                       </Button>
//                       {expandedCategories.includes(cat.name) && cat.subcategories && (
//                         <div className="ml-6">
//                           {cat.subcategories.map((sub) => (
//                             <Button
//                               key={sub.name}
//                               variant="ghost"
//                               className={`w-full justify-start pl-8 text-slate-400 hover:text-white hover:bg-slate-800 ${
//                                 selectedSubcategory === sub.name ? "font-bold" : ""
//                               }`}
//                               onClick={() => {
//                                 setSelectedSubcategory(sub.name)
//                               }}
//                             >
//                               {sub.name}
//                             </Button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </aside>
//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold">Cost Catalogue (Admin)</h1>
//           <div className="flex items-center gap-4">
//             <Input
//               placeholder="Search materials..."
//               className="max-w-sm"
//               value={tempsearchQuery}
//               onChange={(e) => setTempSearchQuery(e.target.value)}
//               onKeyUp={handleKeyPress}
//             />
//             <Button onClick={handleButtonClick}>Search</Button>
//             <Button variant="outline" onClick={() => { setTempSearchQuery(""); setSearchQuery(""); }}>
//               Clear
//             </Button>
//             <Button variant="outline" onClick={addNewMonthToAllMaterials}>
//               Add New Month to All Materials
//             </Button>
//           </div>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {materials.length > 0 ? (
//               materials.map((material) => (
//                 <div key={material.Number} className="relative">
//                   <MaterialCard
//                     name={material.Name}
//                     unit={material.Unit}
//                     location="National"
//                     rating={4}
//                     price={material.Prices.find((p) => p[1])?.[1] || 0}
//                     onClick={() => setSelectedMaterial(material)}
//                   />
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="absolute top-2 right-2"
//                     onClick={() => openEditDialog(material)}
//                   >
//                     Edit
//                   </Button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No materials found</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* View Material Dialog */}
//       <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
//         <DialogContent className="max-w-2xl">
//           {selectedMaterial && (
//             <div className="p-4 space-y-4 bg-white rounded-lg">
//               <h2 className="text-2xl font-bold text-center mb-4">{selectedMaterial.Name}</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="col-span-2 text-center">
//                   <p className="text-gray-700 text-lg">
//                     Latest Price: <span className="text-green-600">${selectedMaterial.Prices.find((p) => p[1])?.[1]?.toFixed(2) || 0}</span>
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600"><span className="font-semibold">Category:</span> {selectedMaterial.Category.Category}</p>
//                 </div>
//                 {selectedMaterial.Category.Subcategory && (
//                   <div>
//                     <p className="text-gray-600"><span className="font-semibold">Subcategory:</span> {selectedMaterial.Category.Subcategory}</p>
//                   </div>
//                 )}
//                 {selectedMaterial.Category["Sub subcategory"] && (
//                   <div>
//                     <p className="text-gray-600">
//                       <span className="font-semibold">Sub-Subcategory:</span> {selectedMaterial.Category["Sub subcategory"]}
//                     </p>
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-gray-600"><span className="font-semibold">Unit:</span> {selectedMaterial.Unit}</p>
//                 </div>
//               </div>
//               <PriceChart
//                 itemName={selectedMaterial.Name}
//                 prices={selectedMaterial.Prices.map(([date, price]) => ({ date, price }))}
//                 onClose={() => setSelectedMaterial(null)}
//               />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Edit Material Dialog */}
//       <Dialog open={editDialogOpen} onOpenChange={closeEditDialog}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle>Edit Material</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 mt-4">
//             <Input
//               placeholder="Material Name"
//               value={editName}
//               onChange={(e) => setEditName(e.target.value)}
//             />
//             <Input
//               placeholder="Unit"
//               value={editUnit}
//               onChange={(e) => setEditUnit(e.target.value)}
//             />

//             {/* Select for Type */}
//             <div>
//               <label className="block text-sm font-medium">Type</label>
//               <select
//                 className="w-full border p-2 mt-1"
//                 value={editType}
//                 onChange={(e) => handleTypeChange(e.target.value)}
//               >
//                 <option value="">-- Select Type --</option>
//                 {categories.map((t) => (
//                   <option key={t.name} value={t.name}>
//                     {t.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Select for Category */}
//             <div>
//               <label className="block text-sm font-medium">Category</label>
//               <select
//                 className="w-full border p-2 mt-1"
//                 value={editCategory}
//                 onChange={(e) => handleCategoryChange(e.target.value)}
//                 disabled={!editType}
//               >
//                 <option value="">-- Select Category --</option>
//                 {currentType?.categories.map((cat) => (
//                   <option key={cat.name} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Select for Subcategory */}
//             <div>
//               <label className="block text-sm font-medium">Subcategory</label>
//               <select
//                 className="w-full border p-2 mt-1"
//                 value={editSubcategory}
//                 onChange={(e) => handleSubcategoryChange(e.target.value)}
//                 disabled={!editCategory}
//               >
//                 <option value="">-- Select Subcategory --</option>
//                 {currentCat?.subcategories && currentCat?.subcategories.map((sub) => (
//                   <option key={sub.name} value={sub.name}>
//                     {sub.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Select for Sub-Subcategory */}
//             <div>
//               <label className="block text-sm font-medium">Sub-Subcategory</label>
//               <select
//                 className="w-full border p-2 mt-1"
//                 value={editSubSubcategory}
//                 onChange={(e) => setEditSubSubcategory(e.target.value)}
//                 disabled={!editSubcategory}
//               >
//                 <option value="">-- Select Sub-Subcategory --</option>
//                 {currentSub?.sub_subcategories && currentSub?.sub_subcategories.map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Section to edit prices */}
//             <div className="max-h-64 overflow-y-auto">
//               <label className="block text-sm font-medium">Prices</label>
//               {editPrices.map((price, index) => (
//                 <div key={index} className="flex gap-2 mt-2">
//                   <Input
//                     type="text"
//                     value={price[0]}
//                     readOnly
//                     className="w-1/2"
//                   />
//                   <Input
//                     type="number"
//                     value={price[1] ?? ""}
//                     onChange={(e) => {
//                       const newPrices = [...editPrices]
//                       newPrices[index][1] = e.target.value ? parseFloat(e.target.value) : null
//                       setEditPrices(newPrices)
//                     }}
//                     className="w-1/2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={closeEditDialog}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditSave}>
//               Save
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import {
  getMaterialsByCategory,
  getTypes,
  searchMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterials,
} from "../api"
import { MaterialCard } from "@/components/material-card"
import { PriceChart } from "@/components/price-chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"

export interface Material {
  ID: string
  Number: string
  Name: string
  Type: string
  Category: {
    Category: string
    Subcategory: string | null
    "Sub subcategory": string | null
  }
  Qty: number
  Unit: string
  Prices: [string, number | null][]
  Source: string | null
}

export interface Category {
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
  const [searchQuery, setSearchQuery] = useState("")
  const [tempsearchQuery, setTempSearchQuery] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)

  // Admin edit state
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editName, setEditName] = useState("")
  const [editUnit, setEditUnit] = useState("")
  const [editType, setEditType] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editSubcategory, setEditSubcategory] = useState("")
  const [editSubSubcategory, setEditSubSubcategory] = useState("")
  const [editPrices, setEditPrices] = useState<[string, number | null][]>([])

  // Create material dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createName, setCreateName] = useState("")
  const [createUnit, setCreateUnit] = useState("")
  const [createType, setCreateType] = useState("")
  const [createCat, setCreateCat] = useState("")
  const [createSubcat, setCreateSubcat] = useState("")
  const [createSubSubcat, setCreateSubSubcat] = useState("")

  const handleButtonClick = () => {
    setSearchQuery(tempsearchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(tempsearchQuery)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getTypes()
        setCategories(data)
        if (data.length && data[0].categories.length) {
          setSelectedType(data[0].name)
          setSelectedCategory(data[0].categories[0].name)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        if (tempsearchQuery.trim()) {
          const data = await searchMaterials(searchQuery, selectedSubcategory || undefined)
          setTempSearchQuery("")
          setMaterials(data)
        } else if (selectedCategory) {
          const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
          setMaterials(data)
        }
      } catch (error) {
        console.error("Error fetching materials:", error)
      }
    }
    fetchMaterials()
  }, [selectedCategory, selectedSubcategory, searchQuery])

  const openEditDialog = (material: Material) => {
    setEditingMaterial(material)
    setEditName(material.Name)
    setEditUnit(material.Unit)
    setEditType(material.Type || "")
    setEditCategory(material.Category.Category || "")
    setEditSubcategory(material.Category.Subcategory || "")
    setEditSubSubcategory(material.Category["Sub subcategory"] || "")
    setEditPrices(material.Prices)
    setEditDialogOpen(true)
  }

  const closeEditDialog = () => {
    setEditDialogOpen(false)
    setEditingMaterial(null)
  }

  // Create
  const openCreateDialog = () => {
    setCreateName("")
    setCreateUnit("")
    setCreateType("")
    setCreateCat("")
    setCreateSubcat("")
    setCreateSubSubcat("")
    setCreateDialogOpen(true)
  }

  const closeCreateDialog = () => {
    setCreateDialogOpen(false)
  }

  const handleCreateMaterial = async () => {
    try {
        const newMonth = new Date()
        newMonth.setMonth(newMonth.getMonth())
        newMonth.setDate(1)
        const newMonthString = newMonth.toISOString().split("T")[0] + " 00:00:00"
        
        await createMaterial({
          Name: createName,
          Unit: createUnit,
          Type: createType,
          Category: {
            Category: createCat,
            Subcategory: createSubcat || null,
            "Sub subcategory": createSubSubcat || null,
          },
          Prices: [[newMonthString, null]] as [string, number | null][],
          ID: "",
          Qty: 0,
          Source: null,
        })
      // refetch
      const data = await getMaterialsByCategory(createCat)
      setMaterials(data)
    } catch (error) {
      console.error("Error creating material:", error)
    }
    closeCreateDialog()
  }

  // Edits
  const handleTypeChange = (value: string) => {
    setEditType(value)
    setEditCategory("")
    setEditSubcategory("")
    setEditSubSubcategory("")
  }
  const handleCategoryChange = (value: string) => {
    setEditCategory(value)
    setEditSubcategory("")
    setEditSubSubcategory("")
  }
  const handleSubcategoryChange = (value: string) => {
    setEditSubcategory(value)
    setEditSubSubcategory("")
  }

  const handleEditSave = async () => {
    if (!editingMaterial) return
    try {
      await updateMaterial(editingMaterial.Number, {
        Name: editName,
        Unit: editUnit,
        Type: editType,
        Category: {
          Category: editCategory,
          Subcategory: editSubcategory,
          "Sub subcategory": editSubSubcategory,
        },
        Prices: editPrices,
      })
      if (selectedCategory) {
        const data = await getMaterialsByCategory(selectedCategory, selectedSubcategory || undefined)
        setMaterials(data)
      }
    } catch (error) {
      console.error("Error updating material:", error)
    }
    closeEditDialog()
  }

  const addNewMonthToAllMaterials = async () => {
    const newMonth = new Date()
    newMonth.setMonth(newMonth.getMonth())
    newMonth.setDate(1)
    const newMonthString = newMonth.toISOString().split("T")[0] + " 00:00:00"

    try {
      const allMaterials = await getMaterials()
      const updatedMaterials = allMaterials.map((material) => {
        const monthExists = material.Prices.some(([date]) => date === newMonthString)
        if (monthExists) {
          throw new Error(`Month ${newMonthString} already exists for material ${material.Name}`)
        }
        return {
          ...material,
          Prices: [...material.Prices, [newMonthString, null] as [string, number | null]],
        }
      })
      await Promise.all(
        updatedMaterials.map((material) =>
          updateMaterial(material.Number, { Prices: material.Prices })
        )
      )
      setMaterials(updatedMaterials)
    } catch (error) {
      console.error("Error adding new month to materials:", error)
    }
  }

  const currentType = categories.find((t) => t.name === editType)
  const currentCat = currentType?.categories?.find((c) => c.name === editCategory)
  const currentSub = currentCat?.subcategories?.find((s) => s.name === editSubcategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button className="md:hidden bg-slate-900 mb-4" onClick={() => setShowSidebar(!showSidebar)}>
        <Menu className="h-6 w-6" />
        Categories
      </Button>
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
                )}
                {type.name}
              </Button>
              {expandedTypes.includes(type.name) && (
                <div className="ml-4">
                  {type.categories.map((cat) => (
                    <div key={cat.name}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start pl-6 text-slate-300 hover:text-white hover:bg-slate-800 ${
                          selectedCategory === cat.name ? "font-bold" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(cat.name)
                          setSelectedSubcategory(null)
                          setExpandedCategories((prev) =>
                            prev.includes(cat.name) ? prev.filter((c) => c !== cat.name) : [...prev, cat.name]
                          )
                        }}
                      >
                        {expandedCategories.includes(cat.name) ? (
                          <ChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <ChevronRight className="mr-2 h-4 w-4" />
                        )}
                        {cat.name}
                      </Button>
                      {expandedCategories.includes(cat.name) && cat.subcategories && (
                        <div className="ml-6">
                          {cat.subcategories.map((sub) => (
                            <Button
                              key={sub.name}
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
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Cost Catalogue (Admin)</h1>
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
            <Button variant="outline" onClick={addNewMonthToAllMaterials}>
              Add New Month to All Materials
            </Button>
            {/* New button to open the create dialog */}
            <Button variant="outline" onClick={openCreateDialog}>
              Add Material
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materials.length > 0 ? (
              materials.map((material) => (
                <div key={material.Number} className="relative">
                  <MaterialCard
                    name={material.Name}
                    unit={material.Unit}
                    location="National"
                    rating={4}
                    price={material.Prices.find((p) => p[1])?.[1] || 0}
                    onClick={() => setSelectedMaterial(material)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => openEditDialog(material)}
                  >
                    Edit
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No materials found</p>
            )}
          </div>
        </div>
      </div>

      {/* View Material Dialog */}
      <Dialog open={!!selectedMaterial} onOpenChange={() => setSelectedMaterial(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMaterial && (
            <div className="p-4 space-y-4 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">{selectedMaterial.Name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-center">
                  <p className="text-gray-700 text-lg">
                    Latest Price:{" "}
                    <span className="text-green-600">
                      $
                      {selectedMaterial.Prices.find((p) => p[1])?.[1]?.toFixed(2) ||
                        0}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedMaterial.Category.Category}
                  </p>
                </div>
                {selectedMaterial.Category.Subcategory && (
                  <div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Subcategory:</span>{" "}
                      {selectedMaterial.Category.Subcategory}
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
                    <span className="font-semibold">Unit:</span>{" "}
                    {selectedMaterial.Unit}
                  </p>
                </div>
              </div>
              <PriceChart
                itemName={selectedMaterial.Name}
                prices={selectedMaterial.Prices.map(([date, price]) => ({
                  date,
                  price,
                }))}
                onClose={() => setSelectedMaterial(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Material Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={closeEditDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Material Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              placeholder="Unit"
              value={editUnit}
              onChange={(e) => setEditUnit(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                className="w-full border p-2 mt-1"
                value={editType}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                {categories.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="w-full border p-2 mt-1"
                value={editCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={!editType}
              >
                <option value="">-- Select Category --</option>
                {currentType?.categories && currentType?.categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Subcategory</label>
              <select
                className="w-full border p-2 mt-1"
                value={editSubcategory}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
                disabled={!editCategory}
              >
                <option value="">-- Select Subcategory --</option>
                {currentCat?.subcategories && currentCat?.subcategories.map((sub) => (
                  <option key={sub.name} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Sub-Subcategory</label>
              <select
                className="w-full border p-2 mt-1"
                value={editSubSubcategory}
                onChange={(e) => setEditSubSubcategory(e.target.value)}
                disabled={!editSubcategory}
              >
                <option value="">-- Select Sub-Subcategory --</option>
                {currentSub?.sub_subcategories && currentSub?.sub_subcategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <label className="block text-sm font-medium">Prices</label>
              {editPrices.map((price, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={price[0]}
                    readOnly
                    className="w-1/2"
                  />
                  <Input
                    type="number"
                    value={price[1] ?? ""}
                    onChange={(e) => {
                      const newPrices = [...editPrices]
                      newPrices[index][1] = e.target.value
                        ? parseFloat(e.target.value)
                        : null
                      setEditPrices(newPrices)
                    }}
                    className="w-1/2"
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEditDialog}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Material Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={closeCreateDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Material Name"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
            <Input
              placeholder="Unit"
              value={createUnit}
              onChange={(e) => setCreateUnit(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                className="w-full border p-2 mt-1"
                value={createType}
                onChange={(e) => setCreateType(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                {categories.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              {/* Filter categories based on createType */}
              {createType ? (
                <select
                  className="w-full border p-2 mt-1"
                  value={createCat}
                  onChange={(e) => setCreateCat(e.target.value)}
                >
                  <option value="">-- Select Category --</option>
                  {categories
                    .find((ctg) => ctg.name === createType)
                    ?.categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              ) : (
                <select className="w-full border p-2 mt-1" disabled>
                  <option>-- Select Type First --</option>
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Subcategory</label>
              {createCat ? (
                <select
                  className="w-full border p-2 mt-1"
                  value={createSubcat}
                  onChange={(e) => setCreateSubcat(e.target.value)}
                >
                  <option value="">-- Select Subcategory --</option>
                  {categories
                    .find((t) => t.name === createType)
                    ?.categories.find((c) => c.name === createCat)?.subcategories && categories
                    .find((t) => t.name === createType)
                    ?.categories.find((c) => c.name === createCat)
                    ?.subcategories.map((sub) => (
                      <option key={sub.name} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              ) : (
                <select className="w-full border p-2 mt-1" disabled>
                  <option>-- Select Category First --</option>
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Sub-Subcategory</label>
              {createSubcat ? (
                <select
                  className="w-full border p-2 mt-1"
                  value={createSubSubcat}
                  onChange={(e) => setCreateSubSubcat(e.target.value)}
                >
                  <option value="">-- Select Sub-Subcategory --</option>
                  {categories
                    .find((t) => t.name === createType)
                    ?.categories.find((c) => c.name === createCat)
                    ?.subcategories.find((s) => s.name === createSubcat)
                    ?.sub_subcategories && categories
                    .find((t) => t.name === createType)
                    ?.categories.find((c) => c.name === createCat)
                    ?.subcategories.find((s) => s.name === createSubcat)
                    ?.sub_subcategories.map((subsub) => (
                      <option key={subsub} value={subsub}>
                        {subsub}
                      </option>
                    ))}
                </select>
              ) : (
                <select className="w-full border p-2 mt-1" disabled>
                  <option>-- Select Subcategory First --</option>
                </select>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeCreateDialog}>
              Cancel
            </Button>
            <Button onClick={handleCreateMaterial}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}