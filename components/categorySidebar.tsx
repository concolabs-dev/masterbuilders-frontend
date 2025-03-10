"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { getTypes } from "@/app/api" // adjust the import path as needed

interface Category {
  name: string
  categories: {
    name: string
    subcategories?: { name: string }[]
  }[]
}

interface CategorySidebarProps {
  selectedType: string
  setSelectedType: (type: string) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedSubcategory: string | null
  setSelectedSubcategory: (sub: string | null) => void
}

export default function CategorySidebar({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}: CategorySidebarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [expandedTypes, setExpandedTypes] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getTypes()
        setCategories(data)
        // Removed auto-selection of first type/category
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div>
      <Button
        className="md:hidden bg-slate-900 mb-4"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu className="h-6 w-6" />
        Categories
      </Button>
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
                  prev.includes(type.name)
                    ? prev.filter((t) => t !== type.name)
                    : [...prev, type.name]
                )
                // Reset category/subcategory on type change
                setSelectedCategory("")
                setSelectedSubcategory(null)
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
    </div>
  )
}