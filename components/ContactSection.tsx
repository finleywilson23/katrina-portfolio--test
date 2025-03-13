"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const email = "katrina.puke@example.com"
  const [isToastVisible, setIsToastVisible] = useState(false)

  const copyEmail = () => {
    if (isToastVisible) return // Prevent multiple toasts

    navigator.clipboard.writeText(email)
    setCopied(true)
    setIsToastVisible(true)

    toast({
      description: "Email copied to clipboard!",
      variant: "purple",
    })

    setTimeout(() => {
      setCopied(false)
      setIsToastVisible(false)
    }, 2000)
  }

  return (
    <section id="contact" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 instrument-serif italic">Let's Talk</h2>

        <div className="flex items-left">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="inline-flex items-center space-x-2 text-xl md:text-2xl cursor-pointer group inter"
                  onClick={copyEmail}
                >
                  <span className="group-hover:underline">{email}</span>
                  {copied ? <Check className="h-5 w-5 text-gray-500" /> : <Copy className="h-5 w-5" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="inter">Click to copy email address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}

