
'use client';

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useState, KeyboardEvent } from "react";
export function SiteHeader() {
  const {user, error, isLoading} = useUser();
  console.log(user)
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/supplier?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center">

        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full flex-1 md:flex md:max-w-xs items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 md:w-[200px] lg:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        {/* <Button onClick={handleSearch} className="hidden md:flex">Search</Button> */}
          </div>
          {user ? (
            <Button className="hidden md:flex" onClick={()=>{router.push("/supplier/dashboard/")}} >Dashboard</Button>
          ) : (
            <Button className="hidden md:flex" onClick={()=>{router.push("/register/")}}> Get Started</Button>
          )}
       
        </div>
      </div>
    </header>
  )
}

