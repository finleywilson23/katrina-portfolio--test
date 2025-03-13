"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

interface FooterProps {
  availability: "available" | "limited" | "unavailable"
  onPukeClick: () => void
}

export default function Footer({ availability, onPukeClick }: FooterProps) {
  const [currentYear, setCurrentYear] = useState<number>(2023)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const getAvailabilityColor = () => {
    switch (availability) {
      case "available":
        return "bg-green-500"
      case "limited":
        return "bg-orange-500"
      case "unavailable":
        return "bg-red-500"
      default:
        return "bg-green-500"
    }
  }

  const getAvailabilityText = () => {
    switch (availability) {
      case "available":
        return "Available for work"
      case "limited":
        return "Limited availability"
      case "unavailable":
        return "Not available"
      default:
        return "Available for work"
    }
  }

  return (
    <footer className="py-16 px-4 md:px-8 lg:px-16 border-t border-black/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none instrument-serif italic cursor-pointer">
            <span
              onClick={onPukeClick}
              className="hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none pointer-events-auto relative z-40"
            >
              Puķe
            </span>
          </h2>
          <p className="text-xl md:text-2xl mt-8 ml-1 inter">[ˈput͡ʃe]</p>
        </div>

        {/* Mobile layout: social icons at top, copyright at bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social icons - on mobile they appear first and aligned left */}
          <div className="flex justify-start space-x-4 order-1 md:order-3 md:justify-end">
            <Link href="https://linkedin.com" target="_blank" className="p-2">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="p-2">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>

          {/* Availability status - in the middle on desktop */}
          <div className="flex items-center justify-start md:justify-center order-2">
            <div className="flex items-center space-x-3">
              <div className={`h-2 w-2 rounded-full ${getAvailabilityColor()}`} />
              <span className="inter">{getAvailabilityText()}</span>
            </div>
          </div>

          {/* Copyright - on mobile it appears last */}
          <div className="text-left order-3 md:order-1">
            <p className="text-sm inter">© {currentYear} Katrīna Puķe.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

