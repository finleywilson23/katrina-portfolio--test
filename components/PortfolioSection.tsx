"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useModal } from "@/components/ModalProvider"

// Define project type
interface Project {
  id: number
  name: string
  description: string
  year: string
  images: string[] // Changed from single image to array of images
  link?: string // Optional link property
  additionalInfo?: string // Added for customizable additional information
}

// Define section type
interface PortfolioSectionData {
  id: string
  title: string
  description: string
  projects: Project[]
}

// Sample portfolio data (updated with additional info)
const portfolioData: PortfolioSectionData[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "In this section, you'll find a curated collection of my graphic design work—ranging from brand identities and posters to logos, social media visuals, and other creative pieces. Among all my creative pursuits, graphic design stands out as my strongest passion. For me, it's more than aesthetics; it's about weaving narratives that reflect a brand's essence and leave a lasting impression. Every project begins with deep research and a sharp focus on detail, ensuring that each design is both meaningful and visually compelling. From brainstorming initial ideas to refining the final product, my aim is to create visuals that tell a story with purpose and clarity.",
    projects: [
      {
        id: 1,
        name: "Valmiera Drama Theater",
        description: "Theater Visual Identity Redesign",
        year: "2022",
        images: [
          "/placeholder.svg?height=400&width=400",
          "/placeholder.svg?height=400&width=400&text=Image+2",
          "/placeholder.svg?height=400&width=400&text=Image+3",
        ],
        link: "https://example.com/cafe-botanique",
        additionalInfo:
          "This project involved a complete redesign of the Valmiera Drama Theater's visual identity, including logo, typography, color palette, and marketing materials. The goal was to create a modern, versatile identity that honors the theater's rich history while appealing to contemporary audiences.",
      },
      {
        id: 2,
        name: "SIMO Pizzeria",
        description: "Graphic Design and Visuals",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400&text=Poster+2"],
        additionalInfo:
          "For SIMO Pizzeria, I developed a comprehensive visual system that captures the authentic Italian spirit of the restaurant while adding a contemporary twist. The project included menu design, signage, packaging, and promotional materials.",
      },
      {
        id: 3,
        name: "Rīga Stradiņš University Stomatology SZP",
        description: "Visual Identity and Graphic Design",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        link: "https://example.com/art-magazine",
        additionalInfo:
          "This project for Rīga Stradiņš University's Stomatology department required a professional yet approachable visual identity. I created a clean, medical-inspired design system that communicates expertise and care, including logo design, stationery, digital assets, and informational materials.",
      },
      {
        id: 4,
        name: "Swisscom, Baltic Brand Forum, CSDD, Ergo",
        description: "Social Media Design for Brands",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "I developed social media visual strategies for multiple major brands, creating cohesive content that maintained brand identity while optimizing engagement across different platforms. Each brand required a unique approach tailored to their specific audience and communication goals.",
      },
      {
        id: 5,
        name: "Tallinas Street Creative Quarter",
        description: "Social Media and Graphic Design",
        year: "2024-2025",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "As the lead designer for Tallinas Street Creative Quarter, I developed a vibrant visual language that reflects the area's artistic community. The ongoing project includes event promotions, wayfinding systems, digital content, and printed materials that help establish the quarter as a cultural destination.",
      },
      {
        id: 6,
        name: "School work - Café",
        description: "Conceptual Visual Identity",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "This academic project explored the creation of a complete café brand identity from concept to execution. I developed a fictional café brand with a distinctive personality, including naming, logo design, packaging, menu design, and environmental graphics.",
      },
      {
        id: 7,
        name: "Ex-Libris Stamp Design",
        description: "A side-project for my dad",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "This personal project was a custom ex-libris stamp designed for my father's book collection. The design incorporates elements that reflect his interests and personality, created with traditional illustration techniques and adapted for stamp production.",
      },
      {
        id: 8,
        name: "Lip Gloss Packaging Design",
        description: "ITSTIMETO Fashion",
        year: "2021",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "For this beauty product packaging project, I created a minimalist yet distinctive design for a lip gloss line. The project included packaging design, typography, color selection, and product photography direction.",
      },
      {
        id: 9,
        name: "Book Layout Design and Illustrations",
        description: "Personal Project",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "This self-initiated project involved the complete design of a book, including typography, layout, custom illustrations, and cover design. The project allowed me to explore the relationship between text and image while creating a cohesive reading experience.",
      },
      {
        id: 10,
        name: "Conceptual UI Redesign",
        description: "ZARA Clothing Store App",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "This speculative redesign of the ZARA mobile app focused on improving user experience and visual hierarchy. I analyzed the existing interface, identified pain points, and created a more intuitive, visually refined alternative that better showcases the brand's products.",
      },
      {
        id: 11,
        name: "Reflecting on Myself as a Technical Issue",
        description: "Personal Project",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "This conceptual art project explored the intersection of technology and identity through graphic design. Using technical diagrams, error messages, and system interfaces as visual metaphors, I created a series of prints that comment on human experience in the digital age.",
      },
    ],
  },
  {
    id: "3d-design",
    title: "3D Design & Animation",
    description:
      "This section presents a diverse range of my 3D design and animation projects, including 3D-printed creations, detailed renderings, and dynamic animations. My process is fueled by curiosity and innovation—blending technical precision with imaginative problem-solving to craft engaging visual experiences. Whether it's building models, creating immersive environments, or animating unique concepts, I constantly challenge myself to push creative boundaries. As I continue honing my skills in this medium, I'm excited to dive into new techniques and bring bold, inventive ideas to life.",
    projects: [
      {
        id: 12,
        name: "Study of Abstract and Geometric Forms in Blender",
        description: "Personal Project",
        year: "2024",
        images: [
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600&text=Interior+View",
          "/placeholder.svg?height=400&width=600&text=Exterior+View",
        ],
        link: "https://example.com/arch-viz",
        additionalInfo:
          "This experimental project explores the relationship between abstract geometric forms and light in a 3D space. Using Blender, I created a series of compositions that play with perception, shadow, and reflection to create visually striking environments.",
      },
      {
        id: 13,
        name: "Dancing Human Figure Animation",
        description: "Personal Project",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This animation project focused on capturing the fluid movement of dance through 3D character animation. I explored motion capture techniques combined with manual keyframing to achieve natural, expressive movement that conveys emotion through body language.",
      },
      {
        id: 14,
        name: "3D Still Life",
        description: "Personal Project",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Product+Angle+2"],
        additionalInfo:
          "Inspired by traditional still life painting, this 3D rendering project explores composition, texture, and lighting in a digital space. I created highly detailed models with realistic materials and lighting to achieve a photorealistic quality with subtle artistic interpretation.",
      },
      {
        id: 15,
        name: "Pushed Idea – Video Combined with 3D Animation",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Product+Angle+2"],
        additionalInfo:
          "This experimental project combines live video footage with 3D animation elements to create a mixed-reality narrative. Using camera tracking and compositing techniques, I integrated abstract 3D elements that interact with the physical environment in unexpected ways.",
      },
      {
        id: 16,
        name: "3D Modeled and 3D Printed Earrings",
        description: "Personal Project",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600&text=Product+Angle+2"],
        additionalInfo:
          "This project bridges digital design and physical craftsmanship through 3D printing technology. I designed a collection of geometrically complex earrings that would be impossible to create with traditional jewelry-making techniques, then produced them using biodegradable PLA material.",
      },
    ],
  },
  // Other sections with updated additionalInfo
  {
    id: "vr",
    title: "VR & AR",
    description:
      "Here, you'll discover my ventures into Virtual Reality, with projects designed to create immersive, interactive experiences using Unity. A standout project is a walking simulator that invites users to navigate a thoughtfully constructed virtual space, designed to immerse and captivate. My approach to VR focuses on crafting intuitive, meaningful experiences that foster genuine connections with the digital environment. Each project blends technical expertise with creative storytelling, unlocking the potential of VR to inspire exploration and engagement. As I expand my work in this field, I'm eager to push the limits of immersive interaction.",
    projects: [
      {
        id: 17,
        name: "The Lonely Princess World",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        link: "https://example.com/vr-gallery",
        additionalInfo:
          "This VR experience tells the story of a lonely princess through an interactive fairy tale environment. Users can explore a surreal castle and its surroundings, discovering narrative elements through interaction with objects and environments. The project was built in Unity with custom 3D assets and atmospheric sound design.",
      },
      {
        id: 18,
        name: "Little basement",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This atmospheric VR experience places users in a mysterious basement environment that gradually reveals its secrets through exploration and interaction. The project focuses on creating a sense of unease through subtle environmental storytelling, lighting, and sound design.",
      },
      {
        id: 19,
        name: "Self scan",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This AR project uses 3D scanning technology to create a digital avatar of the user, which can then be manipulated and placed in various virtual environments. The project explores themes of digital identity and self-representation in virtual spaces.",
      },
    ],
  },
  {
    id: "photography",
    title: "Photography",
    description:
      "This section offers a glimpse into my photography projects, spanning everything from carefully styled concept shoots to energetic event photography. My work balances bold, creative direction with the ability to capture spontaneous, genuine moments. Whether working in a controlled studio setting or documenting live events, I aim to blend artistry with precision, ensuring each shot reflects its unique atmosphere. This adaptability allows me to tailor my approach to each project, resulting in visuals that are both memorable and impactful.",
    projects: [
      {
        id: 20,
        name: "Urban Exploration Series",
        description: "Personal Project",
        year: "2025",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This ongoing photography series documents forgotten urban spaces and architectural details that often go unnoticed. Through careful composition and attention to light, I aim to reveal the beauty and character in these overlooked environments, creating a visual record of urban evolution and decay.",
      },
    ],
  },
  {
    id: "videography",
    title: "Videography & Sound",
    description:
      "In this section, you'll find a collection of my creative video and audio projects, focused on artistic exploration and expression. My approach is driven by experimentation, where visuals, sound, and emotion intersect to create immersive, thought-provoking experiences. I concentrate on rhythm, atmosphere, and abstract storytelling, moving beyond traditional narratives to craft pieces that invite deeper reflection. Each project is developed with careful attention to detail, blending visual and auditory elements to challenge conventions and evoke a strong sensory response.",
    projects: [
      {
        id: 21,
        name: "Safe driving",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This experimental short film explores the psychological experience of driving through abstract visuals and immersive sound design. Using a combination of in-camera techniques and subtle post-production effects, the piece creates a hypnotic rhythm that mimics the meditative state often experienced during long drives.",
      },
      {
        id: 22,
        name: "Baltic sea",
        description: "Personal Project",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600"],
        link: "https://example.com/music-video",
        additionalInfo:
          "This audio-visual piece captures the changing moods and textures of the Baltic Sea through different seasons and weather conditions. The project combines time-lapse photography, underwater footage, and field recordings to create an immersive portrait of this distinctive body of water and its relationship to the surrounding landscape.",
      },
      {
        id: 23,
        name: "Forest dream",
        description: "Personal Project",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This dreamlike video installation creates an immersive forest environment through projected imagery and spatial sound design. The piece transforms the exhibition space into a surreal woodland, inviting viewers to experience the forest as both a physical place and a psychological landscape.",
      },
    ],
  },
  {
    id: "prints",
    title: "Prints",
    description:
      "In this section, you'll find a selection of my screen-printing and monotype works, exploring the unique textures and layers. My approach is rooted in experimentation, using the unpredictability of the process to embrace spontaneity and creative accidents. Each piece is an exploration of form, color, and composition, where repetition meets individuality—especially in monotypes, where every print is one of a kind. Through layering, contrast, and texture, I aim to create visually engaging works that reflect both intentional design and the organic nature of the medium.",
    projects: [
      {
        id: 24,
        name: "I want",
        description: "Digital print",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This series of digital prints explores desire and aspiration through typographic experimentation. The work plays with legibility and visual hierarchy, using overlapping text and distortion techniques to create compositions that reveal different messages depending on viewing distance and perspective.",
      },
      {
        id: 25,
        name: "Twins",
        description: "Monotype",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This collection of monotype prints explores the concept of duality through mirrored and paired forms. Each unique print was created using oil-based inks on a plexiglass plate, allowing for subtle variations in pressure and ink distribution that create rich textures and unexpected details.",
      },
      {
        id: 26,
        name: "Yellow press",
        description: "Screen-print",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This screen print series comments on media sensationalism through appropriated newspaper headlines and imagery. Using a limited palette dominated by yellow (referencing the historical term 'yellow journalism'), the prints combine text and image in compositions that highlight the manipulative nature of tabloid reporting.",
      },
      {
        id: 27,
        name: "10x10x10x10",
        description: "Screen-print",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This systematic print project explores mathematical patterns through screen printing. Following a strict set of rules based on a 10x10 grid, I created variations that demonstrate how simple numerical constraints can generate complex and visually engaging compositions.",
      },
      {
        id: 28,
        name: "The flowers",
        description: "Monotype",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This series of monotype prints explores botanical forms through abstraction and gestural mark-making. Rather than depicting flowers realistically, the prints capture their essence through organic shapes, dynamic lines, and layered colors that evoke the sensory experience of a garden in bloom.",
      },
    ],
  },
  {
    id: "paintings",
    title: "Paintings",
    description:
      "This section presents my painting works, created with oil on canvas. My practice combines a strong foundation in academic painting, including detailed and precise still life compositions, with a passion for creative exploration. Beyond traditional techniques, I delve into imaginative projects that allow me to experiment with ideas, forms, and emotions. This balance between technical skill and artistic freedom defines my approach to painting, resulting in works that are both disciplined and expressive.",
    projects: [
      {
        id: 29,
        name: "Abstract Landscapes",
        description: "Personal Project",
        year: "2025",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This series of oil paintings interprets landscape elements through abstraction, focusing on color relationships and compositional rhythm rather than literal representation. Inspired by both natural environments and emotional states, the paintings exist in the space between recognition and pure abstraction.",
      },
    ],
  },
]

export default function PortfolioSection() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({})
  const { openProjectModal } = useModal()

  // Initialize refs for each section
  useEffect(() => {
    portfolioData.forEach((section) => {
      sectionRefs.current[section.id] = React.createRef<HTMLDivElement>()
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const toggleSection = (sectionId: string) => {
    const newActiveSection = activeSection === sectionId ? null : sectionId
    setActiveSection(newActiveSection)

    // Scroll to the section if it's being opened
    if (newActiveSection && sectionRefs.current[newActiveSection]?.current) {
      setTimeout(() => {
        sectionRefs.current[newActiveSection]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => [...prev, imageUrl])
  }

  const handleProjectSelect = (project: Project) => {
    openProjectModal(project)
  }

  return (
    <section id="works" className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden pt-8">
      <div onMouseMove={handleMouseMove} className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 instrument-serif italic">Works</h2>

        {portfolioData.map((section, index) => (
          <div
            key={section.id}
            ref={sectionRefs.current[section.id]}
            className={`border-t ${index === portfolioData.length - 1 ? "border-b" : ""} border-black/10 ${activeSection === section.id ? "portfolio-section-active" : ""}`}
          >
            <div
              className="flex justify-between items-center py-4 cursor-pointer transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="text-2xl md:text-3xl font-bold instrument-serif italic">{section.title}</h3>
              <div className="flex items-center">
                {activeSection === section.id ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              </div>
            </div>

            {activeSection === section.id && (
              <div className="py-4">
                <p className="mb-8 max-w-3xl inter">{section.description}</p>

                <div className="relative">
                  <table className="w-full">
                    <tbody>
                      {section.projects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-b border-black/10 last:border-none relative group cursor-pointer hover:bg-black/5 transition-colors"
                          onMouseEnter={() => setHoveredProject(project)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onClick={() => handleProjectSelect(project)}
                        >
                          <td className="py-4 px-4 relative z-10 inter">{project.name}</td>
                          <td className="py-4 px-4 relative z-10 inter">{project.description}</td>
                          <td className="py-4 px-4 text-right relative z-10 inter">{project.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hover Preview */}
      {hoveredProject && (
        <div
          className="fixed pointer-events-none bg-white shadow-lg rounded-md p-2 w-64 h-64"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: "translateY(-50%)",
            zIndex: 60, // Increased z-index to be above portfolio content but below SVGs
          }}
        >
          {loadedImages.includes(hoveredProject.images[0]) ? (
            <img
              src={hoveredProject.images[0] || "/placeholder.svg"}
              alt={hoveredProject.name}
              className="w-full h-full object-cover rounded"
              onLoad={() => handleImageLoad(hoveredProject.images[0])}
            />
          ) : (
            <Skeleton className="w-full h-full rounded" />
          )}
        </div>
      )}
    </section>
  )
}

