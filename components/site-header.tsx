
'use client';

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useUser } from "@auth0/nextjs-auth0/client"
export function SiteHeader() {
  const {user, error, isLoading} = useUser();
  console.log(user)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full flex-1 md:flex md:max-w-xs items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="h-9 md:w-[200px] lg:w-[300px]" />
          </div>
          {user ? (
            <Button className="hidden md:flex">Dashboard</Button>
          ) : (
            <Button className="hidden md:flex">Get Started</Button>
          )}
       
        </div>
      </div>
    </header>
  )
}

