"use client"

import { useRef, useEffect, useState } from "react"
import { X } from "lucide-react"

interface LimitPopupProps {
  onClose: () => void
  onClear: () => void
}

// This component is no longer used directly - it's been moved to ModalProvider
export default function LimitPopup({ onClose, onClear }: LimitPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

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

  const handleClearClick = () => {
    onClear()
    onClose()
  }

  return (
    <div
      ref={popupRef}
      className="fixed top-[40px] left-1/2 transform z-[95] bg-white rounded-[32px] shadow-lg border border-gray-200 animate-fade-in"
      style={{
        maxWidth: "calc(100vw - 32px)",
        width: "auto",
      }}
    >
      <div className={`px-6 py-4 ${isMobile ? "flex flex-col gap-4" : "flex items-center gap-4"}`}>
        <p className="text-sm inter">
          There can never be too many flowers, but it's ok to change them around once in a while.
        </p>
        <div className={`flex items-center gap-4 ${isMobile ? "self-end" : "flex-shrink-0"}`}>
          <button
            onClick={handleClearClick}
            className="px-3 py-1.5 bg-gray-100 rounded-md border border-gray-300 text-sm hover:bg-gray-200 transition-colors inter whitespace-nowrap"
          >
            Clear the flower field
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

