"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type React from "react" // Added import for React

export function MainNav() {
  const pathname = usePathname()

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    if (pathname === "/") {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <div className="mr-4 hidden md:flex">
     <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src="/images/logobm.png"
          alt="Master Builders Logo"
          width={40}
          height={40}
        />
        <span className="hidden font-bold sm:inline-block">BuildMarketLk</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
          Home
        </Link>
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, "about")}
          className="transition-colors hover:text-foreground/80 text-muted-foreground"
        >
          About Us
        </a>
        <a
          href="#services"
          onClick={(e) => scrollToSection(e, "services")}
          className="transition-colors hover:text-foreground/80 text-muted-foreground"
        >
          Services
        </a>
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "contact")}
          className="transition-colors hover:text-foreground/80 text-muted-foreground"
        >
          Contact
        </a>
        <Link href="/catalogue" className="transition-colors hover:text-foreground/80 text-primary">
          Catalogue
        </Link>
        <Link href="/supplier" className="transition-colors hover:text-foreground/80 text-primary">
          Suppliers
        </Link>
     
        <Link href="/professionals" className="transition-colors hover:text-foreground/80 text-primary">
          Professionals
        </Link>
      </nav>
    </div>
  )
}

