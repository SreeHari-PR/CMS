"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
            {/* Logo image */}
            <img
              src="/Logo.png" 
              alt="Reppoo Logo"
              className="w-40 h-10 object-contain"
            />
          </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Innovative health assistant app that leverages artificial
              intelligence to provide personalized wellness recommendations.
            </p>

            <p className="text-sm text-muted-foreground">
              hello@reppoo.com
            </p>
          </div>

          {/* COMPANY */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/early-access">Early Access</Link></li>
              <li><Link href="/404">404</Link></li>
            </ul>
          </div>

          {/* APP */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold">App</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">Download For iOS</Link></li>
              <li><Link href="#">Download For Android</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold">Legal Pages</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <Separator className="my-10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-muted-foreground">
            © Copyright Reppoo
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4 text-black" />
            </Button>
          </div>

        </div>
      </div>
    </footer>
  )
}