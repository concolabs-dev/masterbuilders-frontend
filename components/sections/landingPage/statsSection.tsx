import { useEffect, useState } from "react";

// Change stats here..
const stats = {
  suppliersCount: 10000,
  productsCount: 50000,
  professionalsCount: 5000,
  projectsCount: 1000,
}

// Custom hook for counting animation
const useCountUp = (end: number, duration = 1000, start = 0) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - start) + start)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Ensure we end exactly at the target number
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start, isVisible])

  return { count, setIsVisible }
}

// Custom hook for intersection observer
const useIntersectionObserver = (callback: () => void, options = {}) => {
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
          observer.disconnect()
        }
      },
      { threshold: 0.3, ...options },
    )

    observer.observe(elementRef)
    return () => observer.disconnect()
  }, [elementRef, callback])

  return setElementRef
}

export default function StatsSection() {
    const suppliersCount = useCountUp(stats.suppliersCount, 1200, 0)
    const productsCount = useCountUp(stats.productsCount, 1400, 0)
    const professionalsCount = useCountUp(stats.professionalsCount, 1000, 0)
    const projectsCount = useCountUp(stats.projectsCount, 800, 0)

    const statsRef = useIntersectionObserver(() => {
      suppliersCount.setIsVisible(true)
      productsCount.setIsVisible(true)
      professionalsCount.setIsVisible(true)
      projectsCount.setIsVisible(true)
    })

    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K"
      }
      return num.toLocaleString()
    }

    return (
      <div ref={statsRef} className="py-20 px-4 lg:px-32 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">
                  {suppliersCount.count >= 10000 ? "10K+" : `${formatNumber(suppliersCount.count)}+`}
                </div>
                <div className="text-orange-100">Active Suppliers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {productsCount.count >= 50000 ? "50K+" : `${formatNumber(productsCount.count)}+`}
                </div>
                <div className="text-orange-100">Products Listed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {professionalsCount.count >= 5000 ? "5K+" : `${formatNumber(professionalsCount.count)}+`}
                </div>
                <div className="text-orange-100">Professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {projectsCount.count >= 1000 ? "1K+" : `${formatNumber(projectsCount.count)}+`}
                </div>
                <div className="text-orange-100">Active Projects</div>
              </div>
            </div>
          </div>
      </div>
    )
  }