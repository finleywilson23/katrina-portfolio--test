"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface Project {
  id: number
  name: string
  description: string
  year: string
  images: string[] // Changed from single image to array of images
  link?: string // Optional link property
  additionalInfo?: string // Added for customizable additional information
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const hasMultipleImages = project.images.length > 1

  useEffect(() => {
    // Check if we're on mobile
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

  const nextImage = () => {
    setImageLoaded(false)
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setImageLoaded(false)
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[550]">
      <div
        className={`bg-white ${isMobile ? "rounded-none inset-0 fixed" : "rounded-lg max-h-[90vh]"} shadow-xl max-w-3xl w-full overflow-auto`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold instrument-serif italic">{project.name}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="relative w-full h-[300px] mb-6">
            {!imageLoaded && <Skeleton className="w-full h-full rounded-md absolute top-0 left-0" />}
            <img
              src={project.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${project.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover rounded-md ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Image navigation controls */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded-md">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-3">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
              <p className="inter">{project.description}</p>
            </div>
            <div className="text-right">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Year</h4>
              <p className="inter">{project.year}</p>
            </div>
          </div>

          {project.additionalInfo && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h4>
              <p className="text-sm text-gray-700 inter">{project.additionalInfo}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors inter flex items-center gap-2"
              >
                View Project <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

