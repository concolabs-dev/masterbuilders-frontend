"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Group, Home, List, Menu, User, Users, Building2 } from "lucide-react"
import Image from "next/image"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden">
      <Link
        href="/catalogue"
        className={`flex flex-col items-center justify-center px-4 py-2 ${
          pathname === "/catalogue" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <List className="h-6 w-6" />
        <span className="text-xs">Catalogue</span>
      </Link>
      
      <Link
        href="/professionals"
        className={`flex flex-col items-center justify-center px-4 py-2 ${
          pathname === "/professionals" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Users className="h-6 w-6" />
        <span className="text-xs">Professionals</span>
      </Link>
      
      {/* Logo in the center */}
      <Link
        href="/"
        className={`flex flex-col items-center justify-center px-4 py-2 ${
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Image
          src="/images/logo.jpeg"
          alt="BuildMarket LK"
          width={50}
          height={60}
          className="object-contain"
        />
      </Link>
      
      <Link 
        href="/supplier" 
        className={`flex flex-col items-center justify-center px-4 py-2 ${
          pathname === "/supplier" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <div className="relative">
          <Group className="h-6 w-6" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
        </div>
        <span className="text-xs">Suppliers</span>
      </Link>
      
      <Link 
        href="/projects" 
        className={`flex flex-col items-center justify-center px-4 py-2 ${
          pathname === "/projects" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <div className="relative">
          <Building2 className="h-6 w-6" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
        </div>
        <span className="text-xs">Projects</span>
      </Link>
    </nav>
  )
}