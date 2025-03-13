"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useModal } from "./ModalProvider"

export default function TutorialPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const { isProjectModalOpen, isLimitPopupOpen } = useModal()

  useEffect(() => {
    // Check if the user has already seen the tutorial
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial")

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Only show if not seen before
    const shouldShow = !hasSeenTutorial
    setIsVisible(shouldShow)

    // Handle resize events
    const handleResize = () => {
      checkMobile()
      setIsVisible(!hasSeenTutorial)
    }

    // Handle scroll events to hide when scrolling out of hero
    const handleScroll = () => {
      const heroSection = document.querySelector("section:first-of-type")
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        if (heroBottom < 0 && isVisible) {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isVisible])

  useEffect(() => {
    // Debug code removed
  }, [isVisible])

  const closeTutorial = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenTutorial", "true")
  }

  // Don't show tutorial if any modal is open
  if (!isVisible || isProjectModalOpen || isLimitPopupOpen) return null

  return (
    <div
      ref={popupRef}
      className="fixed top-[40px] inset-x-0 mx-auto z-[500] bg-white rounded-full shadow-lg px-6 py-3 border border-gray-200 animate-fade-in flex items-center whitespace-nowrap min-h-[48px]"
      style={{
        width: "fit-content",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <p className="text-xs mr-4 inter">
        {isMobile ? (
          "Tap on Puķe"
        ) : (
          <>
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 font-mono text-xs">P</kbd> or
            tap Puķe—yes, literally!
          </>
        )}
      </p>
      <button onClick={closeTutorial} className="p-1 rounded-full hover:bg-gray-100 flex-shrink-0">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

