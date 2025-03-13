"use client"

import { useEffect, useState, useRef } from "react"
import TopBar from "@/components/TopBar"
import HeroSection from "@/components/HeroSection"
import PortfolioSection from "@/components/PortfolioSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import SvgSpawner from "@/components/SvgSpawner"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { DndContext } from "@dnd-kit/core"
import SectionSeparator from "@/components/SectionSeparator"
import Preloader from "@/components/Preloader"
import { ModalProvider, useModal } from "@/components/ModalProvider"

function MainContent() {
  const [svgElements, setSvgElements] = useState<
    { id: number; x: number; y: number; type: number; isRemoving?: boolean }[]
  >([])
  const [availability, setAvailability] = useState<"available" | "limited" | "unavailable">("available")
  const [isMobile, setIsMobile] = useState(false)
  const [isRearranging, setIsRearranging] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const SVG_LIMIT = 25
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { showLimitPopup, isLimitPopupOpen, isClearingFlowers } = useModal()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Handle SVG rearrangement on window resize
  useEffect(() => {
    const handleResize = () => {
      // Only rearrange if there are SVGs
      if (svgElements.length === 0) return

      // Store previous dimensions to detect actual resize vs mobile scroll
      const prevWidth = window.innerWidth
      const prevHeight = window.innerHeight

      // Debounce the resize event
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = setTimeout(() => {
        // Check if this is a genuine resize or just a mobile scroll-triggered viewport change
        const currentWidth = window.innerWidth
        const currentHeight = window.innerHeight
        const isRealResize = prevWidth !== currentWidth || Math.abs(prevHeight - currentHeight) > 100 // Allow small height changes without triggering

        // Only show preloader and rearrange for genuine resize events
        if (isRealResize) {
          // Show preloader
          setIsRearranging(true)

          // Wait a bit to let the preloader appear
          setTimeout(() => {
            // Rearrange SVGs to fit in the new viewport
            setSvgElements((prev) => {
              return prev.map((svg) => {
                const viewportWidth = window.innerWidth
                const viewportHeight = window.innerHeight
                const scrollY = window.scrollY

                // Add padding to ensure SVGs stay within visible area
                const padding = isMobile ? 20 : 30

                // Get SVG dimensions based on type and scale
                const scale = isMobile ? 0.7 : 1
                let svgWidth, svgHeight

                switch (svg.type) {
                  case 1:
                    svgWidth = 71 * scale
                    svgHeight = 66 * scale
                    break
                  case 2:
                    svgWidth = 97 * scale
                    svgHeight = 82 * scale
                    break
                  case 3:
                  default:
                    svgWidth = 105 * scale
                    svgHeight = 99 * scale
                }

                // Calculate new position within viewport accounting for SVG size
                const x = Math.max(padding, Math.min(svg.x, viewportWidth - padding - svgWidth / 2))

                const y = Math.max(
                  scrollY + padding,
                  Math.min(svg.y, scrollY + viewportHeight - padding - svgHeight / 2),
                )

                return { ...svg, x, y }
              })
            })

            // Hide preloader after a short delay
            setTimeout(() => {
              setIsRearranging(false)
            }, 500)
          }, 300)
        }
      }, 300)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [svgElements.length, isMobile])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "p") {
        spawnSvg()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Improved SVG spawning function
  const spawnSvg = () => {
    setSvgElements((prev) => {
      // Check if we've reached the limit
      if (prev.length >= SVG_LIMIT) {
        showLimitPopup(clearSvgs)
        return prev
      }

      // Calculate a better position that's always visible
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Add padding to ensure SVGs stay within visible area
      const padding = isMobile ? 20 : 30

      // Generate random SVG type
      const type = Math.floor(Math.random() * 3) + 1

      // Get SVG dimensions based on type and scale - using smaller scale
      const scale = isMobile ? 0.5 : 0.7
      let svgWidth, svgHeight

      switch (type) {
        case 1:
          svgWidth = 71 * scale
          svgHeight = 66 * scale
          break
        case 2:
          svgWidth = 97 * scale
          svgHeight = 82 * scale
          break
        case 3:
        default:
          svgWidth = 105 * scale
          svgHeight = 99 * scale
      }

      // Calculate spawn area accounting for SVG size
      const spawnAreaWidth = viewportWidth - padding * 2 - svgWidth
      const spawnAreaHeight = viewportHeight - padding * 2 - svgHeight

      // Generate random position within spawn area
      const x = padding + Math.random() * spawnAreaWidth
      const y = window.scrollY + padding + Math.random() * spawnAreaHeight

      return [...prev, { id: Date.now(), x, y, type }]
    })
  }

  const clearSvgs = () => {
    setSvgElements((prev) => prev.map((svg) => ({ ...svg, isRemoving: true })))
  }

  const removeSvg = (id: number) => {
    setSvgElements((prev) => prev.filter((svg) => svg.id !== id))
  }

  return (
    <main className="relative min-h-screen bg-[#f5f5f3] text-black">
      {/* Preloader - show during initial load or when rearranging SVGs */}
      {isRearranging && <Preloader />}

      {/* Regular preloader for initial page load */}
      <Preloader />

      {/* SVG container - changed from fixed to absolute positioning */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 50 }}>
        {svgElements.map((svg) => (
          <SvgSpawner
            key={svg.id}
            id={svg.id}
            x={svg.x}
            y={svg.y}
            type={svg.type}
            onRemove={removeSvg}
            isRemoving={svg.isRemoving}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Only show the clear button when there are SVGs and limit popup is not visible and not currently clearing */}
      {svgElements.length > 0 && !isLimitPopupOpen && !isClearingFlowers && (
        <Button
          onClick={clearSvgs}
          className={`fixed z-[400] bg-white text-black border border-black hover:bg-black hover:text-white transition-colors inter ${
            isMobile ? "bottom-4 right-4" : "top-20 right-4"
          }`}
        >
          Clear the flower field
        </Button>
      )}

      <div className="relative z-20">
        <TopBar availability={availability} />
        <HeroSection onPukeClick={spawnSvg} />
        <SectionSeparator />
        <PortfolioSection />
        <SectionSeparator />
        <AboutSection />
        <SectionSeparator />
        <ContactSection />
        <Footer onPukeClick={spawnSvg} availability={availability} />
      </div>

      <Toaster />
    </main>
  )
}

export default function Home() {
  return (
    <DndContext>
      <ModalProvider>
        <MainContent />
      </ModalProvider>
    </DndContext>
  )
}

