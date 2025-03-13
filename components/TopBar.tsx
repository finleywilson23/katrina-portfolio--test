"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

interface TopBarProps {
  availability: "available" | "limited" | "unavailable"
}

export default function TopBar({ availability }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
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

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: aboutSection, offsetY: 50 },
      })
    }
  }

  return (
    <header className="sticky top-0 z-[1000] w-full bg-[#f5f5f3]/90 backdrop-blur-sm border-b border-black/10 px-4 md:px-8 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium inter">Riga, Latvia</span>
          <span className="text-sm font-light hidden md:inline inter">(GMT+3)</span>
          <span className="text-sm inter">{currentTime}</span>
        </div>

        <a href="#about" onClick={scrollToAbout} className="flex items-center space-x-2 link-hover px-3 py-1">
          <div className={`h-2 w-2 rounded-full ${getAvailabilityColor()}`} />
          <span className="text-sm inter">Available to work</span>
        </a>
      </div>
    </header>
  )
}

