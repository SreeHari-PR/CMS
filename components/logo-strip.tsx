"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
]

export default function LogoStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: -totalWidth,
      duration: 25,
      ease: "linear",
      repeat: -1,
    })
  }, [])

  return (
    <section className="w-full overflow-hidden bg-white py-10">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-16 px-10"
      >
        {/* Original logos */}
        {logos.map((src, index) => (
          <Logo key={index} src={src} />
        ))}

        {/* Duplicate logos for seamless loop */}
        {logos.map((src, index) => (
          <Logo key={`dup-${index}`} src={src} />
        ))}
      </div>
    </section>
  )
}

function Logo({ src }: { src: string }) {
  return (
    <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition">
      <img
        src={src}
        alt="Brand logo"
        className="h-10 w-auto object-contain grayscale hover:grayscale-0"
        loading="lazy"
      />
    </div>
  )
}
