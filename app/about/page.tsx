import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Master Space Builders</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Master Space Builders Pvt Ltd was founded with a vision to revolutionize the construction industry. As a
            forward-thinking construction solutions provider, we've dedicated ourselves to delivering quality,
            cost-effective resources to professionals, investors, and companies in the construction sector.
          </p>
          <p>
            Our journey began with a simple idea: to bridge the gap between suppliers and builders, making construction
            processes more efficient and cost-friendly. Today, we're proud to be at the forefront of innovation in the
            industry, known for our transparency, reliability, and commitment to excellence.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 -rotate-6 rounded-3xl" />
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6O9uA1z7fyWWUrxLWAKJdaFxwiHViK.png"
            alt="Team meeting"
            width={500}
            height={300}
            className="relative rounded-2xl object-cover"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          At Master Space Builders, our mission is to empower construction projects worldwide by offering a reliable,
          detailed pricing catalog that makes resource allocation simple and efficient. We believe in building a future
          where quality construction resources are accessible, transparent, and economically feasible for all.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-slate-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Transparency</h3>
          <p>
            We believe in open communication and clear pricing structures, ensuring our clients always know what they're
            getting.
          </p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Innovation</h3>
          <p>We're constantly exploring new technologies and methodologies to improve the construction industry.</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Reliability</h3>
          <p>Our clients can count on us for accurate information and dependable service, every time.</p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Build the Future with Us?</h2>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  )
}

