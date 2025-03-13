"use client"

import { createContext, useContext, useState, type ReactNode, useEffect, useRef } from "react"
import ProjectModal from "./ProjectModal"
import TutorialPopup from "./TutorialPopup"
import { X } from "lucide-react"

// Define project type
interface Project {
  id: number
  name: string
  description: string
  year: string
  images: string[]
  link?: string
  additionalInfo?: string
}

interface ModalContextType {
  openProjectModal: (project: Project) => void
  closeProjectModal: () => void
  showLimitPopup: (onClear: () => void) => void
  hideLimitPopup: () => void
  isProjectModalOpen: boolean
  isLimitPopupOpen: boolean
  isClearingFlowers: boolean
  setClearingFlowers: (clearing: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLimitPopupOpen, setIsLimitPopupOpen] = useState(false)
  const [clearCallback, setClearCallback] = useState<(() => void) | null>(null)
  const [isClearingFlowers, setIsClearingFlowers] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const limitPopupRef = useRef<HTMLDivElement>(null)

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

  // Debug popup width
  useEffect(() => {
    // Debug code removed
  }, [isLimitPopupOpen])

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const showLimitPopup = (onClear: () => void) => {
    setIsLimitPopupOpen(true)
    setClearCallback(() => onClear)
  }

  const hideLimitPopup = () => {
    setIsLimitPopupOpen(false)
  }

  const handleClearFlowers = () => {
    if (clearCallback) {
      setIsClearingFlowers(true)
      clearCallback()

      // Reset clearing state after animation completes
      setTimeout(() => {
        setIsClearingFlowers(false)
        hideLimitPopup()
      }, 600) // Slightly longer than the animation duration
    }
  }

  const setClearingFlowers = (clearing: boolean) => {
    setIsClearingFlowers(clearing)
  }

  return (
    <ModalContext.Provider
      value={{
        openProjectModal,
        closeProjectModal,
        showLimitPopup,
        hideLimitPopup,
        isProjectModalOpen: !!selectedProject,
        isLimitPopupOpen,
        isClearingFlowers,
        setClearingFlowers,
      }}
    >
      {children}

      {/* Project Modal with dark overlay */}
      {!!selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-[600]">
          <ProjectModal project={selectedProject} onClose={closeProjectModal} />
        </div>
      )}

      {/* Limit Popup - positioned at top of screen like in version 33 */}
      {isLimitPopupOpen && (
        <div className="fixed top-[40px] inset-x-0 mx-auto z-[500]" ref={limitPopupRef}>
          <div
            className="bg-white rounded-[32px] shadow-lg border border-gray-200 animate-fade-in"
            style={{
              width: "fit-content",
              maxWidth: "calc(100vw - 32px)",
              margin: "0 auto",
            }}
          >
            <div className={`px-6 py-4 ${isMobile ? "flex flex-col gap-4" : "flex items-center gap-4"}`}>
              <p className="text-sm inter">
                There can never be too many flowers, but it's ok to change them around once in a while.
              </p>
              <div className={`flex items-center gap-4 ${isMobile ? "self-end" : "flex-shrink-0"}`}>
                <button
                  onClick={handleClearFlowers}
                  className="px-3 py-1.5 bg-gray-100 rounded-md border border-gray-300 text-sm hover:bg-gray-200 transition-colors inter whitespace-nowrap"
                >
                  Clear the flower field
                </button>
                <button
                  onClick={hideLimitPopup}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Popup - always rendered but visibility controlled by component */}
      <TutorialPopup />
    </ModalContext.Provider>
  )
}

