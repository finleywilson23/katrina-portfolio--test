"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

interface HeroSectionProps {
  onPukeClick: () => void
}

export default function HeroSection({ onPukeClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault()
    const worksSection = document.getElementById("works")
    if (worksSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: worksSection, offsetY: 50 },
      })
    }
  }

  // Handle Puķe click
  useEffect(() => {
    const handlePukeClick = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      onPukeClick()
    }

    const pukeElements = document.querySelectorAll(".puke-text")
    pukeElements.forEach((element) => {
      element.addEventListener("click", handlePukeClick)
    })

    return () => {
      pukeElements.forEach((element) => {
        element.removeEventListener("click", handlePukeClick)
      })
    }
  }, [onPukeClick])

  return (
    <section className="min-h-screen py-32 md:py-48 overflow-hidden bg-gray-100 flex flex-col justify-center">
      <div className="w-full">
        <div ref={containerRef} className="relative w-full overflow-hidden py-8 marquee-container">
          {/* Simple CSS-based marquee that works reliably */}
          <div className="marquee-content">
            {/* First set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif italic">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif italic">Portfolio</span>
            </div>

            {/* Second set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif italic pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif">Portfolio</span>
            </div>

            {/* Third set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif italic">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif italic">Portfolio</span>
            </div>

            {/* Fourth set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif italic pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif">Portfolio</span>
            </div>
          </div>

          {/* Duplicate for seamless looping */}
          <div className="marquee-content" aria-hidden="true">
            {/* First set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif italic">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif italic">Portfolio</span>
            </div>

            {/* Second set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif italic pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif">Portfolio</span>
            </div>

            {/* Third set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif italic">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif italic">Portfolio</span>
            </div>

            {/* Fourth set */}
            <div className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold mr-8">
              <span className="instrument-serif">Katrīna</span>
              <span className="mx-2"></span>
              <span
                className="puke-text cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 transition-all duration-300 select-none instrument-serif italic pointer-events-auto z-40 relative"
                role="button"
                tabIndex={0}
                aria-label="Click to spawn flower"
              >
                Puķe
              </span>
              <span className="mx-2"></span>
              <span className="instrument-serif">Portfolio</span>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <a
            href="#works"
            onClick={scrollToWorks}
            className="text-2xl font-normal flex items-center space-x-4 hover:bg-gray-200 rounded-lg p-4 transition-all duration-300 inter"
          >
            <span>Discover my work</span>
            <svg width="40" height="40" viewBox="0 0 105 99" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M56.5375 55.135C49.0299 55.135 41.5222 55.135 34.0146 55.135C26.5169 55.135 22.2614 51.1989 15.209 51.1989C5.10686 51.1989 -5.51341 36.5891 8.43024 31.5187C20.2691 27.2136 37.8256 30.4641 40.9027 44.3108C41.0481 44.9654 48.3569 53.9517 47.1347 52.7296C42.4164 48.0113 38.8253 42.706 38.8253 35.4547C38.8253 30.2052 36.1747 2.38573 42.7613 1.99828C56.8945 1.16692 59.167 14.2739 56.4282 26.5986C55.2585 31.8622 55.2255 38.4067 53.0388 43.3268C49.2276 51.9022 50.4663 57.1885 56.1002 45.2948C62.0072 32.8244 77.3526 31.5187 90.978 31.5187C110.852 31.5187 103.651 50.1652 91.962 56.0096C79.6097 62.1858 64.4609 53.8258 52.6015 53.1669C40.2034 52.4782 34.4752 63.5881 25.0491 69.3485C17.8199 73.7663 1.92208 96.4635 18.161 96.4635C23.4597 96.4635 30.2104 97.6851 34.8892 94.9328C40.4443 91.6651 43.5464 80.9751 47.5721 75.7992C51.5249 70.7171 52.6015 65.8561 52.6015 59.071C52.6015 51.6419 52.6015 66.5386 52.6015 68.9111C52.6015 71.7004 50.9347 87.6935 53.6948 88.4821C59.6793 90.1919 66.3777 88.1823 66.3777 81.7033C66.3777 75.624 66.0276 70.8517 60.4736 67.3805C58.8055 66.3379 51.2324 58.3008 50.6334 57.103"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

