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
          "/teatris1.webp?height=400&width=400",
          "/teatris2.webp?height=400&width=400",
          "/teatris3.webp?height=400&width=400",
        ],
        link: "https://example.com/cafe-botanique",
        additionalInfo:
          "For my final project at the Riga School of Design and Art, I created a new visual identity for a theater in Valmiera, Latvia. Based on extensive research, the project included a brand book with thorough graphic design examples like logo variations, layouts, and other visual applications, ensuring a cohesive yet flexible brand presence. The identity was designed to enhance the theater’s communication across various platforms while maintaining a strong visual character.",
      },
      {
        id: 2,
        name: "SIMO Pizzeria",
        description: "Graphic Design and Visuals",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400&text=Poster+2"],
        additionalInfo:
          "I created a cohesive visual identity for SIMO Pizzeria, drawing inspiration from the vibrant colors of Moroccan tiles. This included menu design, layout development, and social media content, ensuring a consistent and engaging brand presence across various platforms.",
      },
      {
        id: 3,
        name: "Rīga Stradiņš University Stomatology SZP",
        description: "Visual Identity and Graphic Design",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        link: "https://example.com/art-magazine",
        additionalInfo:
          "I developed a visual identity and graphic design for the social media platforms of Rīga Stradiņš University Stomatology SZP, drawing inspiration from the intricate details of teeth and X-rays. The design aimed to reflect the precision and professionalism of the dental field, creating a modern and engaging online presence.",
      },
      {
        id: 4,
        name: "Swisscom, Baltic Brand Forum, CSDD, Ergo",
        description: "Social Media Design for Brands",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "I created social media visuals for brands like Swisscom, Baltic Brand Forum, the Latvian Road Traffic Safety Directorate (CSDD), and Ergo Group. The designs were adapted to align with each brand’s existing guidelines, ensuring consistency with their established visual identity while enhancing engagement across digital platforms.",
      },
      {
        id: 5,
        name: "Tallinas Street Creative Quarter",
        description: "Social Media and Graphic Design",
        year: "2024–2025",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "I created various graphic design visuals for both social media and print. The focus was on adapting and developing the brand’s existing visual identity to ensure it remained true to its core values while staying modern and relevant in today’s digital landscape. The designs were crafted to enhance the quarter's presence and engage its audience across multiple platforms.",
      },
      {
        id: 6,
        name: "School project – Café",
        description: "Conceptual Visual Identity",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "I created a conceptual visual identity for a café as part of my school project. This included the development of a comprehensive brand book and key graphic design elements, focusing on establishing a unified and engaging visual language for the café’s brand.",
      },
      {
        id: 7,
        name: "Ex-Libris Stamp Design",
        description: "A side-project for my dad",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "As a personal and meaningful project, I designed a custom ex-libris stamp for my dad, a passionate book reader. The design features a hand-drawn illustration, creating a unique and heartfelt mark for his book collection.",
      },
      {
        id: 8,
        name: "Lip Gloss Packaging Design",
        description: "ITSTIMETO Fashion",
        year: "2021",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "I created a minimalistic packaging design for a lip gloss product, focusing on simplicity. The design aimed to highlight the elegance of the product, reflecting both modern aesthetics and a sleek, refined look.",
      },
      {
        id: 9,
        name: "Book Layout Design and Illustrations",
        description: "Personal Project",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "For this school project, I worked on two book designs. One featured minimalistic illustrations symbolizing crossroads with oneself, capturing a personal and introspective theme. The other focused purely on minimalistic layout design. Both projects aimed to create a visually harmonious and intimate experience, with a strong emphasis on personal reflection and design clarity.",
      },
      {
        id: 10,
        name: "Conceptual UI Redesign",
        description: "ZARA Clothing Store App",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "I created a conceptual UI redesign for the ZARA clothing store app, with a strong focus on enhancing user experience. The design aimed to simplify navigation, improve functionality, and create a visually engaging interface, ensuring a seamless and enjoyable shopping experience for users.",
      },
      {
        id: 11,
        name: "Reflecting on Myself as a Technical Issue",
        description: "Personal Project",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=400"],
        additionalInfo:
          "This deeply personal project explores my identity through the lens of a technical issue. I view my mind as something that correlates with the external world, where formal digital communication often becomes a facade, shaped by what appears most aesthetic. My thoughts grow deeper, and I try to present a controlled version of myself, suppressing emotions and maintaining composure. However, as experience shows, it’s not always successful. I am constantly navigating this balance — just trying to find the right button to press.",
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
    id: "videography",
    title: "Videography & Sound",
    description:
      "In this section, you'll find a collection of my creative video and audio projects, focused on artistic exploration and expression. My approach is driven by experimentation, where visuals, sound, and emotion intersect to create immersive, thought-provoking experiences. I concentrate on rhythm, atmosphere, and abstract storytelling, moving beyond traditional narratives to craft pieces that invite deeper reflection. Each project is developed with careful attention to detail, blending visual and auditory elements to challenge conventions and evoke a strong sensory response.",
    projects: [
      {
        id: 20,
        name: "Safe driving",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This experimental short film explores the psychological experience of driving through abstract visuals and immersive sound design. Using a combination of in-camera techniques and subtle post-production effects, the piece creates a hypnotic rhythm that mimics the meditative state often experienced during long drives.",
      },
      {
        id: 21,
        name: "Baltic sea",
        description: "Personal Project",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600"],
        link: "https://example.com/music-video",
        additionalInfo:
          "This audio-visual piece captures the changing moods and textures of the Baltic Sea through different seasons and weather conditions. The project combines time-lapse photography, underwater footage, and field recordings to create an immersive portrait of this distinctive body of water and its relationship to the surrounding landscape.",
      },
      {
        id: 22,
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
        id: 23,
        name: "I want",
        description: "Digital print",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This series of digital prints explores desire and aspiration through typographic experimentation. The work plays with legibility and visual hierarchy, using overlapping text and distortion techniques to create compositions that reveal different messages depending on viewing distance and perspective.",
      },
      {
        id: 24,
        name: "Twins",
        description: "Monotype",
        year: "2022",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This collection of monotype prints explores the concept of duality through mirrored and paired forms. Each unique print was created using oil-based inks on a plexiglass plate, allowing for subtle variations in pressure and ink distribution that create rich textures and unexpected details.",
      },
      {
        id: 25,
        name: "Yellow press",
        description: "Screen-print",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This screen print series comments on media sensationalism through appropriated newspaper headlines and imagery. Using a limited palette dominated by yellow (referencing the historical term 'yellow journalism'), the prints combine text and image in compositions that highlight the manipulative nature of tabloid reporting.",
      },
      {
        id: 26,
        name: "10x10x10x10",
        description: "Screen-print",
        year: "2024",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This systematic print project explores mathematical patterns through screen printing. Following a strict set of rules based on a 10x10 grid, I created variations that demonstrate how simple numerical constraints can generate complex and visually engaging compositions.",
      },
      {
        id: 27,
        name: "The flowers",
        description: "Monotype",
        year: "2023",
        images: ["/placeholder.svg?height=400&width=600"],
        additionalInfo:
          "This series of monotype prints explores botanical forms through abstraction and gestural mark-making. Rather than depicting flowers realistically, the prints capture their essence through organic shapes, dynamic lines, and layered colors that evoke the sensory experience of a garden in bloom.",
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

