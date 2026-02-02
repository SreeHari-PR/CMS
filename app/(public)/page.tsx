"use client"

import React, { useEffect, useRef, useState } from "react"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer"
import LaunchOfferCTA from "@/components/launch-offer-cta"
import LogoStrip from "@/components/logo-strip"

type Testimonial = { name: string; role: string; text: string }
type FAQ = { question: string; answer: string }

export default function LandingPage() {
  const router = useRouter()
  const [content, setContent] = useState<any>(null)

  const heroTitle = useRef<HTMLHeadingElement | null>(null)
  const heroSubtitle = useRef<HTMLParagraphElement | null>(null)
  const heroImage = useRef<HTMLDivElement | null>(null)

  /* Lenis smooth scroll */
  useEffect(() => {
    let rafId: number
    const lenis = new Lenis({ smoothWheel: true })

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
    return () => cancelAnimationFrame(rafId)
  }, [])

  /* Fetch CMS content */
  useEffect(() => {
    fetch("/api/content/get")
      .then((r) => r.json())
      .then(setContent)
  }, [])

  /* GSAP animations */
  useEffect(() => {
    if (!content) return

    const tl = gsap.timeline()
    tl.from(heroTitle.current, { y: 40, opacity: 0, duration: 0.8 })
    tl.from(heroSubtitle.current, { y: 20, opacity: 0, duration: 0.6 }, "-=.4")
    tl.from(heroImage.current, { x: 60, opacity: 0, duration: 0.9 }, "-=.6")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(e.target, { y: 0, opacity: 1, duration: 0.8 })
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll("[data-animate]").forEach((el) => {
      gsap.set(el, { y: 30, opacity: 0 })
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [content])

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo image */}
            <img
              src="/Logo.png"
              alt="Reppoo Logo"
              className="w-48 h-12 object-contain"
            />
          </div>

          <Button size="lg" variant="outline" className="rounded-full font-bold" onClick={() => router.push('/admin/login')}>
            Admin login
          </Button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="min-h-screen max-w-7xl mx-auto px-6 pt-28 space-y-28">
        {/* HERO */}
        <section className="relative flex flex-col items-center text-center py-20 px-4 md:px-20">
          {/* Hero image */}
          <div className="relative w-full max-w-6xl mx-auto">
            <div
              ref={heroImage}
              className="relative w-full rounded-3xl overflow-hidden"
            >
              <img
                src={content?.hero?.image || "/hero-bg.png"}
                alt="Hero"
                className="w-full h-auto object-contain"
                onError={(e) => (e.currentTarget.src = "/hero-bg.png")}
              />

            </div>
          </div>



          {/* Hero title */}
          <h1 ref={heroTitle} className="text-4xl md:text-5xl font-bold leading-tight mb-4 mt-10">
            {content?.hero?.title || "Your AI Health Coach"}
          </h1>

          {/* Subtitle */}
          <p ref={heroSubtitle} className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
            {content?.hero?.subtitle || "Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs."}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <img src="/avatar1.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white -mr-2" />
              <img src="/avatar2.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white -mr-2" />
              <img src="/avatar3.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              <span className="text-sm font-medium ml-3">59,182 Happy Users</span>
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex gap-4 mb-12">
            <Button size="lg" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black font-bold">
              <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
              Download
            </Button>
            <Button size="lg" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black font-bold">
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              Download
            </Button>
          </div>


        </section>

        <LogoStrip />

        {/* ABOUT */}
        <section data-animate className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-4xl font-semibold leading-tight mb-6">
                {content?.about?.heading || "Maximizing Your Health Potential Together"}
              </h2>

              <p className="text-primary font-medium mb-2">
                Smart Nutrition Planning
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                {content?.about?.text ||
                  "Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized."}
              </p>

              <Button variant="outline" className="rounded-full px-6 font-bold">
                Read More
              </Button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/about-image.png"
                alt="Health dashboard preview"
                className="w-full max-w-md rounded-2xl shadow-lg"
              />
            </div>

          </div>
        </section>



        {/* TESTIMONIALS */}
        <section data-animate className="py-20">
          <div className="max-w-5xl mx-auto text-center space-y-12">

            {/* Heading */}
            <div className="space-y-3">
              <h3 className="text-4xl font-semibold">
                Our Users Feel the Transformation
              </h3>
              <p className="text-muted-foreground">
                Real stories from people empowered by personalized wellness
              </p>
            </div>

            {/* State */}
            {(() => {
              const [activeIndex, setActiveIndex] = useState(0)
              const testimonials = content?.testimonials || []

              if (!testimonials.length) {
                return (
                  <p className="text-center text-muted-foreground">
                    No testimonials available
                  </p>
                )
              }

              const active = testimonials[activeIndex]

              return (
                <>
                  {/* Carousel */}
                  <div className="relative flex items-center justify-center">

                    {/* Left Arrow */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setActiveIndex(
                          activeIndex === 0
                            ? testimonials.length - 1
                            : activeIndex - 1
                        )
                      }
                      className="absolute -left-14 rounded-full"
                    >
                      <ChevronLeft />
                    </Button>

                    {/* Card */}
                    <Card className="w-full max-w-2xl rounded-2xl shadow-lg">
                      <CardContent className="p-10 space-y-6">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          “{active.text}”
                        </p>

                        <div className="flex flex-col items-center pt-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#FFBC99]" />
                            <div>
                              <div className="font-semibold leading-tight">
                                {active.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {active.role}
                              </div>
                            </div>
                          </div>
                        </div>


                      </CardContent>
                    </Card>

                    {/* Right Arrow */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setActiveIndex(
                          activeIndex === testimonials.length - 1
                            ? 0
                            : activeIndex + 1
                        )
                      }
                      className="absolute -right-14 rounded-full"
                    >
                      <ChevronRight />
                    </Button>
                  </div>

                  {/* User Tabs */}
                  <div className="flex justify-center gap-4 pt-6">
                    {testimonials.map((t: any, i: any) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition
                  ${i === activeIndex
                            ? "bg-muted shadow-sm"
                            : "opacity-60 hover:opacity-100"
                          }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#FFBC99]" />
                        <div className="text-left">
                          <div className="text-sm font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.role}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )
            })()}
          </div>
        </section>


        {/* FAQ */}
        <section data-animate className="max-w-4xl mx-auto py-20 mb-10">
          {/* Heading */}
          <div className="text-center mb-14">
            <h3 className="text-4xl font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get answers to common questions about our AI health assistant app
            </p>
          </div>

          <Accordion type="single" collapsible className="border-t">
            {content?.faq?.length ? (
              content.faq.map((f: FAQ, i: number) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b"
                >
                  <AccordionTrigger
                    className="
              py-6 text-left text-2xl font-extrabold
              hover:no-underline
              data-[state=open]:text-blue-600
            "
                  >
                    {f.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed text-lg">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-10">
                No FAQs available
              </p>
            )}
          </Accordion>
        </section>

      </main>
      <LaunchOfferCTA />
      <Footer />
    </>
  )
}