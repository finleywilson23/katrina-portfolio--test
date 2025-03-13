"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Disable scrolling when preloader is active
    if (loading) {
      document.body.style.overflow = "hidden"
    }

    // Function to check if the page has loaded
    const handleLoad = () => {
      // Create a timeline for smooth transition
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false)
          document.body.style.overflow = ""
        },
      })

      // Add animation to fade out the preloader
      tl.to(".preloader-container", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })
    }

    // Check if all images and resources are loaded
    const checkAllLoaded = () => {
      if (document.readyState === "complete") {
        // Increased delay to 1.5 seconds for safer loading
        setTimeout(handleLoad, 1500)
      } else {
        window.addEventListener("load", () => setTimeout(handleLoad, 1500))
      }
    }

    checkAllLoaded()

    return () => {
      window.removeEventListener("load", handleLoad)
      document.body.style.overflow = ""
    }
  }, [loading])

  if (!loading) return null

  return (
    <div className="preloader-container fixed inset-0 bg-[#f3f4f6] flex items-center justify-center z-[999]">
      <div className="flex flex-col items-center">
        <div className="animate-spin">
          <svg width="80" height="80" viewBox="0 0 105 99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.2527 43.5801C39.6557 43.5801 29.0235 42.6965 25.6658 39.6441C22.2955 36.5802 10.8246 36.1402 8.82826 32.6467C6.67355 28.8759 -0.143004 24.8394 3.14285 19.0891C5.49458 14.9736 17.4598 19.0644 19.7617 20.9478C24.4619 24.7934 29.9576 30.2399 34.4126 33.3027C38.1884 35.8985 40.6146 39.56 43.8154 42.0494C45.0335 42.9969 44.2527 38.1052 44.2527 36.692C44.2527 31.772 44.2527 26.8519 44.2527 21.9319C44.2527 14.1468 43.9797 10.6316 47.7514 4.21962C49.54 1.17912 56.9889 1.01567 57.9196 5.20364C59.1736 10.8468 56.0609 15.6848 56.0609 20.9478C56.0609 30.814 43.6681 39.8833 35.3966 41.7214C26.4298 43.7141 15.3797 61.8236 10.3589 68.7271C-0.936282 84.2581 23.0842 80.4928 30.4765 73.1005C35.7795 67.7975 42.4273 54.2547 44.1434 46.5322C46.1918 37.3141 44.2527 52.7759 44.2527 56.1536C44.2527 60.8079 42.4512 68.4787 47.0954 71.1325C54.4196 75.3177 70.5497 67.9091 61.9649 59.3243C57.9221 55.2815 55.2028 50.9727 50.5941 47.5162C48.3975 45.8687 41.3237 39.6009 42.2847 40.0814C48.3708 43.1245 61.806 48.9729 68.853 47.4068C73.9078 46.2836 78.1409 41.6121 84.4879 41.6121C86.2296 41.6121 94.9807 35.7744 95.312 34.6147C97.6256 26.5173 74.7651 29.804 69.837 29.804C60.3754 29.804 50.6486 33.2482 44.2527 39.6441"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

