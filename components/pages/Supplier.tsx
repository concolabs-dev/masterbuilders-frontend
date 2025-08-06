
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Head from 'next/head';
import { getSuppliers, Supplier } from "@/app/api"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading suppliers...</div>}>
      <SuppliersPageContent />
    </Suspense>
  )
}
function SuppliersPageContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [suppliersByLetter, setSuppliersByLetter] = useState<Record<string, Supplier[]>>({})
  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
 const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const fetchAndGroupSuppliers = async () => {
      try {
        const suppliersList = await getSuppliers()
        const grouped: Record<string, Supplier[]> = {}
        suppliersList.forEach((s) => {
          const firstLetter = s.business_name[0]?.toUpperCase() || ""
          if (!grouped[firstLetter]) grouped[firstLetter] = []
          grouped[firstLetter].push(s)
        })
        setSuppliersByLetter(grouped)
      } catch (error) {
        console.error("Error fetching suppliers:", error)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchAndGroupSuppliers()
  }, [])

  const filteredSuppliers = Object.entries(suppliersByLetter).reduce(
    (acc, [letter, list]) => {
      const filtered = list.filter((supplier) =>
        supplier.business_name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      if (filtered.length > 0) acc[letter] = filtered
      return acc
    },
    {} as Record<string, Supplier[]>,
  )

  const visibleSuppliers = selectedLetter
    ? { [selectedLetter]: filteredSuppliers[selectedLetter] ?? [] }
    : filteredSuppliers

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    setSelectedLetter(letter)
  }

  return (
    <>
    {isLoading && <Loading/>}
        {/* <Head>
        <title>Suppliers</title>
        <meta name="description" content="List of all the suppliers of the construction materials in Sri Lanka" />
      </Head> */}
    <div className="container mx-auto py-8 px-4">
      <div className="text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / Suppliers
      </div>

      <h1 className="text-3xl font-bold mb-8">Building Product Suppliers</h1>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search suppliers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setSelectedLetter(null)
          }}
        />
      </div>

      <div className="flex flex-wrap gap-1 mb-8">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            size="sm"
            className="w-8 h-8 p-0"
            disabled={!filteredSuppliers[letter]}
            onClick={() => scrollToLetter(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(visibleSuppliers).map(([letter, list]) => (
          <div key={letter} id={`letter-${letter}`}>
            <h2 className="text-lg font-semibold bg-muted px-4 py-2 rounded-md mb-4">
              {letter}
            </h2>
            <div className="grid gap-2">
              {list.map((supplier) => (
                <Link
                  key={supplier.id}
                  href={`/supplier/${supplier.pid}`}
                  className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                >
                  {supplier.business_name}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(visibleSuppliers).length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No suppliers found matching your search.
          </div>
        )}
      </div>
    </div></>
  )
}