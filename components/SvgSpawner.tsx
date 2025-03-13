"use client"

import { useState, useRef, useEffect } from "react"
import { useDraggable } from "@dnd-kit/core"
import { gsap } from "gsap"

interface SvgSpawnerProps {
  id: number
  x: number
  y: number
  type: number
  onRemove: (id: number) => void
  isRemoving?: boolean
  isMobile?: boolean
}

export default function SvgSpawner({
  id,
  x,
  y,
  type,
  onRemove,
  isRemoving = false,
  isMobile = false,
}: SvgSpawnerProps) {
  const [position, setPosition] = useState({ x, y })
  const svgRef = useRef<HTMLDivElement>(null)
  const initialRotation = useRef(Math.random() * 360)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const isDraggingRef = useRef(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `svg-${id}`,
  })

  // Set up subtle floating animation
  useEffect(() => {
    if (svgRef.current && !isRemoving) {
      // Random values for animation to make each SVG move differently
      const duration = 2 + Math.random() * 2 // Between 2-4 seconds
      const xMovement = Math.random() * 10 - 5 // Between -5 and 5 pixels
      const yMovement = Math.random() * 10 - 5 // Between -5 and 5 pixels
      const rotationAmount = Math.random() * 8 - 4 // Between -4 and 4 degrees

      // Create the animation
      animationRef.current = gsap.to(svgRef.current, {
        x: xMovement,
        y: yMovement,
        rotation: `+=${rotationAmount}`,
        duration: duration,
        repeat: -1, // Infinite repeat
        yoyo: true, // Go back and forth
        ease: "sine.inOut",
        paused: true,
      })

      // Start the animation
      animationRef.current.play()
    }

    return () => {
      // Clean up animation when component unmounts
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [isRemoving])

  // Pause animation when dragging
  useEffect(() => {
    isDraggingRef.current = isDragging

    if (isDragging && animationRef.current) {
      animationRef.current.pause()
    } else if (!isDragging && animationRef.current) {
      animationRef.current.play()
    }
  }, [isDragging])

  // Handle dragging and boundary constraints
  useEffect(() => {
    if (transform) {
      // Get current viewport dimensions
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY

      // Calculate boundaries with padding
      const padding = isMobile ? 20 : 30

      // Get SVG dimensions based on type and scale
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

      // Calculate new position with transform
      let newX = x + transform.x
      let newY = y + transform.y

      // Apply soft boundaries - allow movement but with resistance near edges
      if (newX < padding) {
        newX = padding + (newX - padding) * 0.2
      } else if (newX > viewportWidth - padding - svgWidth) {
        const overflowX = newX - (viewportWidth - padding - svgWidth)
        newX = viewportWidth - padding - svgWidth + overflowX * 0.2
      }

      if (newY < scrollY + padding) {
        newY = scrollY + padding + (newY - (scrollY + padding)) * 0.2
      } else if (newY > scrollY + viewportHeight - padding - svgHeight) {
        const overflowY = newY - (scrollY + viewportHeight - padding - svgHeight)
        newY = scrollY + viewportHeight - padding - svgHeight + overflowY * 0.2
      }

      setPosition({
        x: newX,
        y: newY,
      })
    }
  }, [transform, x, y, isMobile, type])

  // Handle removal animation
  useEffect(() => {
    if (isRemoving && svgRef.current) {
      // Stop the floating animation
      if (animationRef.current) {
        animationRef.current.kill()
      }

      // Choose a random disappearance effect
      const randomEffect = Math.floor(Math.random() * 3)

      switch (randomEffect) {
        case 0:
          // Simple fade out
          gsap.to(svgRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
            onComplete: () => onRemove(id),
          })
          break
        case 1:
          // Shrink effect
          gsap.to(svgRef.current, {
            opacity: 0,
            scale: 0.1,
            duration: 0.4,
            ease: "back.in",
            onComplete: () => onRemove(id),
          })
          break
        case 2:
        default:
          // Fade up and out
          gsap.to(svgRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => onRemove(id),
          })
          break
      }
    }
  }, [isRemoving, id, onRemove])

  const renderSvg = () => {
    // Reduce the scale to make SVGs smaller
    const scale = isMobile ? 0.5 : 0.7

    switch (type) {
      case 1:
        return (
          <svg
            width={71 * scale}
            height={66 * scale}
            viewBox="0 0 71 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.0595 33.2805C35.6959 32.5442 17.6147 26.6413 12.0084 21.035C2.86147 11.8881 15.8113 1.09221 24.9099 1.79211C34.2859 2.51334 39.1234 19.6121 39.1234 27.3764C39.1234 34.0443 40.5644 24.6446 40.9821 22.347C41.8473 17.5886 43.9079 9.98838 47.9796 6.8215C69.7674 -10.1246 74.6403 29.3445 51.3689 29.3445C42.3627 29.3445 33.7521 31.3125 25.3473 31.3125C17.1653 31.3125 1.73096 36.9844 1.73096 46.0727C1.73096 57.7898 10.0302 55.2285 18.3498 52.8514C27.7312 50.171 32.514 43.3246 38.0301 36.2325C39.6715 34.1222 44.2338 27.8104 40.2168 33.7178C36.8961 38.6012 33.7738 42.5929 30.3767 47.9314C24.6816 56.8807 35.0118 69.9084 42.6222 60.3955C44.4586 58.0999 43.0595 49.9148 43.0595 47.0567C43.0595 42.7562 43.0595 34.1552 43.0595 34.1552C43.0595 34.1552 46.8217 42.7281 50.0569 45.9633C53.9475 49.8539 56.085 50.9927 61.7557 50.9927C71.3508 50.9927 71.1108 33.2805 63.7238 33.2805C58.6763 33.2805 56.2013 29.4995 50.9316 29.3445C45.6947 29.1904 40.4274 29.3445 35.1874 29.3445"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )
      case 2:
        return (
          <svg
            width={97 * scale}
            height={82 * scale}
            viewBox="0 0 97 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.2527 43.5801C39.6557 43.5801 29.0235 42.6965 25.6658 39.6441C22.2955 36.5802 10.8246 36.1402 8.82826 32.6467C6.67355 28.8759 -0.143004 24.8394 3.14285 19.0891C5.49458 14.9736 17.4598 19.0644 19.7617 20.9478C24.4619 24.7934 29.9576 30.2399 34.4126 33.3027C38.1884 35.8985 40.6146 39.56 43.8154 42.0494C45.0335 42.9969 44.2527 38.1052 44.2527 36.692C44.2527 31.772 44.2527 26.8519 44.2527 21.9319C44.2527 14.1468 43.9797 10.6316 47.7514 4.21962C49.54 1.17912 56.9889 1.01567 57.9196 5.20364C59.1736 10.8468 56.0609 15.6848 56.0609 20.9478C56.0609 30.814 43.6681 39.8833 35.3966 41.7214C26.4298 43.7141 15.3797 61.8236 10.3589 68.7271C-0.936282 84.2581 23.0842 80.4928 30.4765 73.1005C35.7795 67.7975 42.4273 54.2547 44.1434 46.5322C46.1918 37.3141 44.2527 52.7759 44.2527 56.1536C44.2527 60.8079 42.4512 68.4787 47.0954 71.1325C54.4196 75.3177 70.5497 67.9091 61.9649 59.3243C57.9221 55.2815 55.2028 50.9727 50.5941 47.5162C48.3975 45.8687 41.3237 39.6009 42.2847 40.0814C48.3708 43.1245 61.806 48.9729 68.853 47.4068C73.9078 46.2836 78.1409 41.6121 84.4879 41.6121C86.2296 41.6121 94.9807 35.7744 95.312 34.6147C97.6256 26.5173 74.7651 29.804 69.837 29.804C60.3754 29.804 50.6486 33.2482 44.2527 39.6441"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )
      case 3:
      default:
        return (
          <svg
            width={105 * scale}
            height={99 * scale}
            viewBox="0 0 105 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56.5375 55.135C49.0299 55.135 41.5222 55.135 34.0146 55.135C26.5169 55.135 22.2614 51.1989 15.209 51.1989C5.10686 51.1989 -5.51341 36.5891 8.43024 31.5187C20.2691 27.2136 37.8256 30.4641 40.9027 44.3108C41.0481 44.9654 48.3569 53.9517 47.1347 52.7296C42.4164 48.0113 38.8253 42.706 38.8253 35.4547C38.8253 30.2052 36.1747 2.38573 42.7613 1.99828C56.8945 1.16692 59.167 14.2739 56.4282 26.5986C55.2585 31.8622 55.2255 38.4067 53.0388 43.3268C49.2276 51.9022 50.4663 57.1885 56.1002 45.2948C62.0072 32.8244 77.3526 31.5187 90.978 31.5187C110.852 31.5187 103.651 50.1652 91.962 56.0096C79.6097 62.1858 64.4609 53.8258 52.6015 53.1669C40.2034 52.4782 34.4752 63.5881 25.0491 69.3485C17.8199 73.7663 1.92208 96.4635 18.161 96.4635C23.4597 96.4635 30.2104 97.6851 34.8892 94.9328C40.4443 91.6651 43.5464 80.9751 47.5721 75.7992C51.5249 70.7171 52.6015 65.8561 52.6015 59.071C52.6015 51.6419 52.6015 66.5386 52.6015 68.9111C52.6015 71.7004 50.9347 87.6935 53.6948 88.4821C59.6793 90.1919 66.3777 88.1823 66.3777 81.7033C66.3777 75.624 66.0276 70.8517 60.4736 67.3805C58.8055 66.3379 51.2324 58.3008 50.6334 57.103"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )
    }
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        if (svgRef) svgRef.current = node
      }}
      {...attributes}
      {...listeners}
      className="absolute cursor-move pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: 1,
        transform: `rotate(${initialRotation.current}deg)`,
        zIndex: 50, // Updated SVG z-index to be higher than content but lower than UI elements
        mixBlendMode: "multiply",
        willChange: "transform, opacity",
        touchAction: "none",
      }}
    >
      {renderSvg()}
    </div>
  )
}

