import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Powered by</p>
          <Link
            href="https://concolabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-90"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copy%20of%20CONCOLABS-z0CMXvjJH8p1tfKmL0IHBsrm0ZHfxO.svg"
              alt="Concolabs Logo"
              width={120}
              height={30}
              className="dark:invert"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}

