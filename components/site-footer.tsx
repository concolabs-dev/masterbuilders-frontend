import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted md:bg-background">
      <div className="container py-4 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-sm font-medium">Build Market LK</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your trusted source for comprehensive construction pricing and supplier connections.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="https://concolabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-90"
              >
                <Image
                  src="/images/concolabs.svg"
                  alt="Concolabs Logo"
                  width={60}
                  height={10}
                  className="dark:invert"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links - hidden on mobile */}
          <div className="space-y-3 hidden md:block">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-muted-foreground hover:text-foreground">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/supplier" className="text-muted-foreground hover:text-foreground">
                  Suppliers
                </Link>
              </li>
              <li>
                <Link href="/supplier/onboarding" className="text-muted-foreground hover:text-foreground">
                  Become a Supplier
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - hidden on mobile */}
          <div className="space-y-3 hidden md:block">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-muted-foreground hover:text-foreground">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#privacy-policy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#cookies" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - kept on mobile but compact */}
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li className="text-muted-foreground">4, 1/2 Bambalapitiya Dr, Colombo 00400</li>
              <li>
                <a href="mailto:info@buildmarketlk.com" className="text-muted-foreground hover:text-foreground">
                  info@buildmarketlk.com
                </a>
              </li>
              <li>
                <a href="tel:+94720400929" className="text-muted-foreground hover:text-foreground">
                  +94 72 040 0929
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} BuildMarketlk. All rights reserved.
          </p>
          <p className="hidden md:block text-sm text-muted-foreground mt-2 md:mt-0">
            Designed and Developed by{" "}
            <Link href="https://concolabs.com" className="hover:text-foreground">
              Concolabs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}