'use client';
import { Modal, ModalBody, ModalContent, ModalFooter } from '@/components/ui/animated-modal';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bell, BookOpen, CheckCircle, DollarSign, GitCompare, Handshake, HardHat, LineChart, Link, Map, Package, ParkingMeter, Phone, Pin, ShieldCheck, Tag, Truck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ListOfServices = [
  { 
    label: "Prices",
    link: "/catalogue",
    title: "Track Prices Like a Pro",
    body:"Stay ahead with real-time price updates across suppliers and currencies.",
    list:
      <div className="py-8 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center mx-auto">
        <div className="flex  items-center justify-center">
          <DollarSign className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Multi-currency View
          </span>
        </div>
        <div className="flex items-center justify-center">
          <LineChart className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Monthly Trends
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Tag className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Lowest Rates
          </span>
        </div>
        <div className="flex items-center justify-center">
          <GitCompare className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Price Comparison
          </span>
        </div>
      </div>,
    cta: "View Catalogue"
  },

  {
    label: "Projects",
    link: "/build-in-sl",
    title: "Find Interesting Projects",
    body:"Discover current construction projects by leading builders and institutes.",
    list:
      <div className="py-8 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center mx-auto">
        <div className="flex  items-center justify-center">
          <ShieldCheck className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
             Verified Builders
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Handshake className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Trusted Partners
          </span>
        </div>
        <div className="flex items-center justify-center">
          <ParkingMeter className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Valuable Insights
          </span>
        </div>
      </div>,
    cta: "See Projects"
  },
  {
    label: "Products",
    link: "/catalogue",
    title: "Explore Catalogue to Find Best Deals",
    body:"Access an extensive catalog of building materials at competitive prices.",
    list:
      <div className="py-8 px-4 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center mx-auto">
        <div className="flex  items-center justify-center">
          <Package className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            New Arrivals
          </span>
        </div>
        <div className="flex items-center justify-center">
          <DollarSign className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Lowest Prices
          </span>
        </div>
        <div className="flex items-center justify-center">
          <BookOpen className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
             Supplier Catalogs
          </span>
        </div>
        <div className="flex items-center justify-center">
          <CheckCircle className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Verified Listings
          </span>
        </div>
      </div>,
    cta: "View Catalogue"
  },
  { 
    label: "People",
    link: "/supplier",
    title: "Network with Suppliers & More",
    body:"Connect with everyone in the construction industry - from suppliers to all other stakeholders in one platform.",
    list:
      <div className="py-8 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center mx-auto">
        <div className="flex  items-center justify-center">
          <Truck className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Suppliers & Vendors
          </span>
        </div>
        <div className="flex items-center justify-center">
          <HardHat className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Proffessionals
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Phone className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Direct Contact
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Link className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Easy Connections
          </span>
        </div>
      </div>,
    cta: "Connect Now"
   },
  { 
    label: "Professionals",
    link: "/professionals/showcase",
    title: "Find the Right Professionals",
    body:"Search and choose from a wide range of construction professionals suitable for your specific project needs.",
    list:
      <div className="py-8 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center mx-auto">
        <div className="flex  items-center justify-center">
          <HardHat className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Verified Professionals
          </span>
        </div>
        <div className="flex items-center justify-center">
          <ShieldCheck className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Quality Assurance
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Phone className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Direct Contact
          </span>
        </div>
      </div>,
    cta: "Find Professionals"  
   },
  { 
    label: "Places",
    link: "/#",
    title: "Stay Informed, Stay Ahead",
    body:"Stay updated with the latest construction industry news, events, and relevant information in your area.",
    list:
      <div className="py-8 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center mx-auto">
        <div className="flex  items-center justify-center">
          <Pin className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Regional Updates
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Bell className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Project Alerts
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Map className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Area Highlights
          </span>
        </div>
      </div>,
    cta: "Discover Places"
   },
]

const ListOfLandingPageCards = [
  {
    title: "Looking to Buy or Build a House?",
    body: "Get matched with builders, suppliers & live prices.",
    points: [
      "Track real-time material prices",
      "Find trusted builders across Sri Lanka",
      "Discover great deals effortlessly",
    ],
    cta: "Explore Catalogue",
    link: "/catalogue",
  },
  {
    title: "Are You a Supplier?",
    body: "Sell smarter with visibility & insights.",
    points: [
      "List your product catalogue",
      "Compare prices across the market",
      "Connect with real-time demand",
    ],
    cta: "Showcase Products",
    link: "/supplier",
  },
  {
    title: "Are You a Builder?",
    body: "Tap into Sri Lanka's growing construction network.",
    points: [
      "Display past & current work",
      "Connect with suppliers & investors",
      "Get discovered by clients",
    ],
    cta: "Get Started",
    link: "/register",
  },
  {
    title: "Construction Professional?",
    body: "Find the right opportunities and visibility.",
    points: [
      "Appear in our expert directory",
      "Access new projects & trends",
      "Connect with key stakeholders",
    ],
    cta: "Join the Network",
    link: "/professionals/showcase",
  },
  {
    title: "Investor Interested in Sri Lanka?",
    body: "Explore the booming construction opportunities.",
    points: [
      "Access high-potential projects",
      "Compare builders, pricing & data",
      "Make smarter investment decisions",
    ],
    cta: "Explore Projects",
    link: "//build-in-sl",
  },
  {
    title: "Are You a Service Provider?",
    body: "Connect with builders and grow your business.",
    points: [
      "Promote services like legal, rentals, finance",
      "Reach a wide construction audience",
      "Get discovered by project owners",
    ],
    cta: "List Your Services",
    link: "/register",
  },
  {
    title: "Are You a Subcontractor?",
    body: "Find projects and get hired for your skills.",
    points: [
      "Access ready-to-start construction projects",
      "Connect with contractors & builders",
      "Showcase your expertise & past work",
    ],
    cta: "Find Work",
    link: "/register",
  },
];


export function HeroSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [selectedService, setSelectedService] = useState<typeof ListOfServices[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [webpSupported, setWebpSupported] = useState<boolean | null>(null)
  const [imageSrc, setImageSrc] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Transform scroll progress to image index
  const imageIndex = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Total number of frames
  const TOTAL_FRAMES = 100
// Replace the WebP detection useEffect with this improved version:
useEffect(() => {
  const checkWebPSupport = () => {
    // Method 1: Try to load a small WebP image
    const webpTestImage = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    
    const img = new Image();
    img.onload = () => {
      // If the image loads successfully, WebP is supported
      setWebpSupported(true);
      console.log('WebP supported: true (image load test)');
    };
    img.onerror = () => {
      // If the image fails to load, WebP is not supported
      setWebpSupported(false);
      console.log('WebP supported: false (image load test)');
    };
    img.src = webpTestImage;
  };
  
  checkWebPSupport();
}, []);

  // Generate image URL with WebP support
  const generateImageUrl = (index: number) => {
    const frameNumber = index.toString().padStart(4, '0');
    
    // Use WebP if supported, otherwise fallback to PNG
    if (webpSupported) {
      return `/frames-webp/frame_${frameNumber}.webp`;
    }
    
    return `/frames/frame_${frameNumber}.png`;
  }

  // Update image source when index changes
  useEffect(() => {
    if (webpSupported !== null) {
      setImageSrc(generateImageUrl(currentImageIndex));
    }
  }, [currentImageIndex, webpSupported]);

  // Preload all images with WebP support
  useEffect(() => {
    if (webpSupported === null) return; // Wait for WebP detection
    
    const preloadImages = async () => {
      const imagePromises = []
      let loadedCount = 0
      let errorCount = 0
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const url = generateImageUrl(i)
        const promise = new Promise<void>((resolve) => {
          const img = new window.Image()
          img.src = url
          img.onload = () => {
            loadedCount++
            setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
            resolve()
          }
          img.onerror = () => {
            errorCount++
            console.warn(`Failed to load frame ${i}:`, url)
            // Try fallback to PNG if WebP fails
            if (webpSupported && url.includes('.webp')) {
              const fallbackUrl = `/frames/frame_${i.toString().padStart(4, '0')}.png`;
              const fallbackImg = new window.Image();
              fallbackImg.src = fallbackUrl;
              fallbackImg.onload = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                resolve();
              };
              fallbackImg.onerror = () => resolve();
            } else {
              resolve()
            }
          }
        })
        imagePromises.push(promise)
      }
      
      try {
        await Promise.all(imagePromises)
        console.log(`Loading complete: ${loadedCount}/${TOTAL_FRAMES} loaded, ${errorCount} errors`)
        console.log(`Using ${webpSupported ? 'WebP' : 'PNG'} format`)
        setLoadingProgress(100)
        setIsLoading(false)
      } catch (error) {
        console.error("Error preloading images:", error)
        setLoadingProgress(100)
        setIsLoading(false)
      }
    }
    
    preloadImages()
  }, [webpSupported])

  useEffect(() => {
    const unsubscribe = imageIndex.onChange((latest) => {
      setCurrentImageIndex(Math.floor(latest))
    })
    return unsubscribe
  }, [imageIndex])

  const handleServiceClick = (service: typeof ListOfServices[0]) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  // Handle image load error with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    
    // If WebP failed, try PNG fallback
    if (webpSupported && img.src.includes('.webp')) {
      const pngUrl = `/frames/frame_${currentImageIndex.toString().padStart(4, '0')}.png`;
      img.src = pngUrl;
      console.log(`WebP failed, falling back to PNG: ${pngUrl}`);
    } else {
      // Final fallback to placeholder
      img.src = "/placeholder.svg";
      console.log('All image formats failed, using placeholder');
    }
  }

  // opacity to fade out text after 25 frames
  let opacity = 1;
  if (currentImageIndex >= 10 && currentImageIndex <= 25) {
    opacity = 1 - (currentImageIndex - 10) / (25 - 10); // linear fade
  } else if (currentImageIndex > 25) {
    opacity = 0;
  }

  return (
    <section ref={containerRef} className="relative min-h-[300vh] z-[50] bg-gray-50">
      {/* loading screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black text-gray-50 flex flex-col items-center justify-center z-50">
          <style>{`body { overflow: hidden !important; }`}</style>
          <div className='relative w-full h-full'>
            <h2 className='absolute bottom-2 right-2 text-9xl font-bold'>{loadingProgress}</h2>
            <p className='absolute bottom-20 right-2 text-sm opacity-70'>
              Loading {webpSupported ? 'WebP' : 'PNG'} frames...
            </p>
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-screen">
          <motion.div
            className="overflow-hidden w-full h-full rounded-b-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={`Animation frame ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
              style={{
                // Ensure smooth transitions between frames
                transition: 'opacity 0.1s ease-in-out'
              }}
            />
          </motion.div>

          {/* model */}
          <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <ModalBody>
              <ModalContent>
                <div className=''>
                  <div className='text-center'>
                    <h2 className="text-2xl font-bold mb-2">{selectedService?.title}</h2>
                    <p>{selectedService?.body}</p>
                  </div>
                  <div>
                    {selectedService?.list}
                  </div>
                  <Button
                    className='w-full'
                    onClick={() => window.location.href = selectedService?.link || "#"}
                    >
                    {selectedService?.cta}
                  </Button>
                </div>
                </ModalContent>
            </ModalBody>
          </Modal>

          {/* text Content */}
          <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 text-center
            ${currentImageIndex > 25 ? 'invisible' : 'visible'}
            `}
            style={{ opacity }}
            >
            <div className='text-white'>
              <h1 className="text-4xl md:text-6xl font-extrabold">BuildMarketLK</h1>
              <p className="text-gray-50 md:tracking-widest uppercase text-xs md:text-sm">Your Trusted Gateway to Building in Sri Lanka</p>
              
              {/* horizontal moving services */}
              <div className="relative md:max-w-2xl mx-auto text-xs md:text-base">
                {/* Container with mask for fade effects */}
                <div
                  className="overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }}
                >
                  
                  {/* Scrolling services */}
                  <div className="flex animate-scroll-left ">
                    {/* First set of services */}
                    <div className="flex items-center md:space-x-8 md:min-w-max">
                      {ListOfServices.map((service, index) => (
                          <button
                            key={index}
                            className='hover:bg-gray-900/25 px-4 py-1 rounded-full'
                            onClick={() => handleServiceClick(service)}
                          >
                            {service.label}
                          </button>
                      ))}
                    </div>

                    {/* Duplicate set for seamless loop */}
                    <div className="flex items-center md:space-x-8 md:min-w-max md:ml-10">
                      {ListOfServices.map((service, index) => (
                          <button
                            key={index}
                            className='hover:bg-gray-900/25 px-4 py-1 rounded-full'
                            onClick={() => handleServiceClick(service)}
                          >
                            {service.label}
                          </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glass Cards for 3 main sections */}
          <div className={`absolute top-0 left-0 w-full h-screen lg:p-20 md:p-8 p-2 transition-opacity duration-200 ease-in-out
            ${currentImageIndex > 25 ? 'opacity-100' : 'opacity-0'}
            
            `}
            >
              <div className='h-full items-center justify-center flex flex-col'>
                {/* Animated card grid with fade effect */}
                {
                  // Calculate which set of 3 cards to show based on currentImageIndex
                  (() => {
                    const cardsPerPage = 3;
                    const NoOfFramesACardIsShown = 15; // 15 frames per card
                    const page = Math.abs(Math.floor((currentImageIndex - 25) / NoOfFramesACardIsShown)); // -25 to start from the start. Math.abs() prevents error from negative indexes
                    const start = page * cardsPerPage;
                    const visibleCards = ListOfLandingPageCards.slice(start, start + cardsPerPage);

                    return (
                      <motion.div
                        // unique key per card set
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`grid gap-4 p-4 ${
                          visibleCards.length === 1
                            ? 'grid-cols-1 place-items-center'
                          : visibleCards.length === 2
                            ? 'grid-cols-1 md:grid-cols-2 place-items-center'
                            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}
                      >
                        {visibleCards.map((card, index) => (
                          <GlassCard key={start + index}>
                            <div className='flex flex-col justify-between text-xs md:text-sm'>
                              <h3 className="text-sm md:text-lg font-bold">{card.title}</h3>
                              <p className='py-2'>{card.body}</p>
                              <ul className="list-disc pl-5">
                                {card.points.map((point, i) => (
                                  <li key={i}>{point}</li>
                                ))}
                              </ul>
                              <Button className="mt-4 w-full" onClick={() => window.location.href = card.link}>
                                {card.cta}
                              </Button>
                            </div>
                          </GlassCard>
                        ))}
                      </motion.div>
                    );
                  })()
                }
              </div>
          </div>

          {/* scroll down icon */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 text-white animate-bounce
            ${currentImageIndex > 1 ? 'bottom-8' : 'bottom-16'}
            `}>
            <div className='w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-white/20'>
              <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}