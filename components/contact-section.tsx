"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ReactNode } from "react"

function FadeInWhenVisible({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        </FadeInWhenVisible>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeInWhenVisible delay={0.2}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your Name" />
                </div>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.3}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </FadeInWhenVisible>
            </div>
            <FadeInWhenVisible delay={0.4}>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.5}>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message here..." className="h-32" />
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.6}>
              <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800">
                Send Message
              </Button>
            </FadeInWhenVisible>
          </form>
        </div>
      </div>
    </section>
  )
}

