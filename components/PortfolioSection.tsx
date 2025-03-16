"use client";

import React, { useState, useRef, useEffect, RefObject } from "react"
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useModal } from "@/components/ModalProvider";

// Define project type
interface Project {
  id: number;
  name: string;
  description: string;
  year: string;
  images: string[]; // Changed from single image to array of images
  link?: string; // Optional link property
  additionalInfo?: string; // Added for customizable additional information
}

// Define section type
interface PortfolioSectionData {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

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
          "/teatris1.webp",
          "/teatris2.webp",
          "/teatris3.webp",
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
        images: ["/simo1.webp", "/simo2.webp", "/simo3.webp"],
        additionalInfo:
          "I created a cohesive visual identity for SIMO Pizzeria, drawing inspiration from the vibrant colors of Moroccan tiles. This included menu design, layout development, and social media content, ensuring a consistent and engaging brand presence across various platforms.",
      },
      {
        id: 3,
        name: "Rīga Stradiņš University Stomatology SZP",
        description: "Visual Identity and Graphic Design",
        year: "2023",
        images: ["/rsu1.webp", "/rsu2.webp", "/rsu3.webp"],
        additionalInfo:
          "I developed a visual identity and graphic design for the social media platforms of Rīga Stradiņš University Stomatology SZP, drawing inspiration from the intricate details of teeth and X-rays. The design aimed to reflect the precision and professionalism of the dental field, creating a modern and engaging online presence.",
      },
      {
        id: 4,
        name: "Swisscom, Baltic Brand Forum, CSDD, Ergo",
        description: "Social Media Design for Brands",
        year: "2023",
        images: ["/element1.webp", "/element2.webp", "/element3.webp"],
        additionalInfo:
          "I created social media visuals for brands like Swisscom, Baltic Brand Forum, the Latvian Road Traffic Safety Directorate (CSDD), and Ergo Group. The designs were adapted to align with each brand’s existing guidelines, ensuring consistency with their established visual identity while enhancing engagement across digital platforms.",
      },
      {
        id: 5,
        name: "Tallinas Street Creative Quarter",
        description: "Social Media and Graphic Design",
        year: "2024–2025",
        images: ["/kvartals1.webp", "/kvartals2.webp", "/kvartals3.webp", "/kvartals4.webp", "/kvartals5.webp"],
        additionalInfo:
          "I created various graphic design visuals for both social media and print. The focus was on adapting and developing the brand’s existing visual identity to ensure it remained true to its core values while staying modern and relevant in today’s digital landscape. The designs were crafted to enhance the quarter's presence and engage its audience across multiple platforms.",
      },
      {
        id: 6,
        name: "Latvian Pavilion – Venice Biennale",
        description: "Informational Signage Design for Latvian Pavilion",
        year: "2023",
        images: ["/tcl1.webp", "/tcl2.webp", "/tcl3.webp"],
        additionalInfo:
          "During my internship at the Venice Biennale, I worked on designing informational signage for the Latvian Pavilion. The design process was guided by the pavilion’s existing visual identity, ensuring consistency with the established guidelines while effectively communicating key information to visitors in a clear and engaging manner.",
      },
      {
        id: 9,
        name: "Ex-Libris Stamp Design",
        description: "A side-project for my dad",
        year: "2022",
        images: ["ex-libris.webp"],
        additionalInfo:
          "As a personal and meaningful project, I designed a custom ex-libris stamp for my dad, a passionate book reader. The design features a hand-drawn illustration, creating a unique and heartfelt mark for his book collection.",
      },
      {
        id: 10,
        name: "Lip Gloss Packaging Design",
        description: "ITSTIMETO Fashion",
        year: "2021",
        images: ["/itstimeto-lipgloss1.webp"],
        additionalInfo:
          "I created a minimalistic packaging design for a lip gloss product, focusing on simplicity. The design aimed to highlight the elegance of the product, reflecting both modern aesthetics and a sleek, refined look.",
      },
      {
        id: 11,
        name: "Book Layout Design and Illustrations",
        description: "Personal Project",
        year: "2022",
        images: ["/book-layout.webp"],
        additionalInfo:
          "For this school project, I worked on two book designs. One featured minimalistic illustrations symbolizing crossroads with oneself, capturing a personal and introspective theme. The other focused purely on minimalistic layout design. Both projects aimed to create a visually harmonious and intimate experience, with a strong emphasis on personal reflection and design clarity.",
      },
      {
        id: 12,
        name: "Conceptual UI Redesign",
        description: "ZARA Clothing Store App",
        year: "2023",
        images: ["/zara.webp"],
        additionalInfo:
          "I created a conceptual UI redesign for the ZARA clothing store app, with a strong focus on enhancing user experience. The design aimed to simplify navigation, improve functionality, and create a visually engaging interface, ensuring a seamless and enjoyable shopping experience for users.",
      },
      {
        id: 13,
        name: "Reflecting on Myself as a Technical Issue",
        description: "Personal Project",
        year: "2022",
        images: ["/me1.webp", "/me2.webp"],
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
        id: 14,
        name: "Study of Abstract and Geometric Forms in Blender",
        description: "Personal Project",
        year: "2024",
        images: [
          "3d-abstract.webp
        ],
        link: "https://youtu.be/V4nLXzO-t6M",
        additionalInfo:
          "This experimental project explores the relationship between abstract geometric forms and light in a 3D space. Using Blender, I created a series of compositions that play with perception, shadow, and reflection to create visually striking environments.",
      },
      {
        id: 15,
        name: "Dancing Human Figure Animation",
        description: "Personal Project",
        year: "2023",
        images: ["human-dancing.webp"],
        link: "https://youtu.be/fKa2_LguhMQ",
        additionalInfo:
          "This animation project focused on capturing the fluid movement of dance through 3D character animation. I explored motion capture techniques combined with manual keyframing to achieve natural, expressive movement that conveys emotion through body language.",
      },
      {
        id: 16,
        name: "3D Still Life",
        description: "Personal Project",
        year: "2023",
        images: ["/placeholder.svg"],
        additionalInfo:
          "Inspired by traditional still life painting, this 3D rendering project explores composition, texture, and lighting in a digital space. I created highly detailed models with realistic materials and lighting to achieve a photorealistic quality with subtle artistic interpretation.",
      },
      {
        id: 17,
        name: "Pushed Idea – Video Combined with 3D Animation",
        description: "Personal Project",
        year: "2024",
        images: ["pushed-idea.webp"],
        additionalInfo:
          "This experimental project combines live video footage with 3D animation elements to create a mixed-reality narrative. Using camera tracking and compositing techniques, I integrated abstract 3D elements that interact with the physical environment in unexpected ways.",
      },
      {
        id: 18,
        name: "3D Modeled and 3D Printed Earrings",
        description: "Personal Project",
        year: "2023",
        images: ["3d-earrings1.webp"],
        additionalInfo:
          "This project bridges digital design and physical craftsmanship through 3D printing technology. I designed a collection of geometrically complex earrings that would be impossible to create with traditional jewelry-making techniques, then produced them using biodegradable PLA material.",
      },
    ],
  },
  {
    id: "vr",
    title: "VR & AR",
    description:
      "Here, you'll discover my ventures into Virtual Reality, with projects designed to create immersive, interactive experiences using Unity. A standout project is a walking simulator that invites users to navigate a thoughtfully constructed virtual space, designed to immerse and captivate. My approach to VR focuses on crafting intuitive, meaningful experiences that foster genuine connections with the digital environment. Each project blends technical expertise with creative storytelling, unlocking the potential of VR to inspire exploration and engagement. As I expand my work in this field, I'm eager to push the limits of immersive interaction.",
    projects: [
      {
        id: 19,
        name: "The Lonely Princess World",
        description: "Personal Project",
        year: "2024",
        images: ["princess-world.webp"],
        link: "https://youtu.be/ziaHUAMBmwE",
        additionalInfo:
          "This VR experience tells the story of a lonely princess through an interactive fairy tale environment. Users can explore a surreal castle and its surroundings, discovering narrative elements through interaction with objects and environments. The project was built in Unity with custom 3D assets and atmospheric sound design.",
      },
      {
        id: 20,
        name: "Little basement",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg"],
        additionalInfo:
          "This atmospheric VR experience places users in a mysterious basement environment that gradually reveals its secrets through exploration and interaction. The project focuses on creating a sense of unease through subtle environmental storytelling, lighting, and sound design.",
      },
      {
        id: 21,
        name: "Self scan",
        description: "Personal Project",
        year: "2024",
        images: ["/placeholder.svg"],
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
        id: 22,
        name: "Getting ready",
        description: "Personal Project",
        year: "2022",
        images: ["/gettig-ready1.webp", "/gettig-ready2.webp"],
        additionalInfo:
          "Through details, motion, and light, the images reflect the excitement, small rituals, and fleeting moments before stepping into the night."
      },
      {
        id: 23,
        name: "The water muse",
        description: "Personal Project",
        year: "2023",
        images: ["/water-muse1.webp", "/water-muse2.webp"],
        additionalInfo:
          "'The Water Muse' captures the fluidity of light as it dances across the human form. The project explores movement and transformation through the lens of light, evoking the delicate and ever-changing nature of water without its physical presence."
      },
      {
        id: 24,
        name: "Studio photography portrait series",
        description: "Personal Project",
        year: "2023",
        images: ["/studio1.webp", "/studio2.webp", "/studio3.webp", "/studio4.webp", "/studio5.webp", "/studio6.webp"],
        additionalInfo:
          "A studio photography portrait series exploring light, shadow, and expression."
      }
    ],
  },
  {
    id: "videography",
    title: "Videography & Sound",
    description:
      "In this section, you'll find a collection of my creative video and audio projects, focused on artistic exploration and expression. My approach is driven by experimentation, where visuals, sound, and emotion intersect to create immersive, thought-provoking experiences. I concentrate on rhythm, atmosphere, and abstract storytelling, moving beyond traditional narratives to craft pieces that invite deeper reflection. Each project is developed with careful attention to detail, blending visual and auditory elements to challenge conventions and evoke a strong sensory response.",
    projects: [
      {
        id: 25,
        name: "Safe driving",
        description: "Personal Project",
        year: "2024",
        images: ["safe-driving.webp"],
        link: "https://youtu.be/1e6VV_aBI0c",
        additionalInfo:
          "This experimental short film explores the psychological experience of driving through abstract visuals and immersive sound design. Using a combination of in-camera techniques and subtle post-production effects, the piece creates a hypnotic rhythm that mimics the meditative state often experienced during long drives.",
      },
      {
        id: 26,
        name: "Baltic sea",
        description: "Personal Project",
        year: "2023",
        images: ["baltic-sea.webp"],
        link: "https://youtu.be/KY9xUp_2fhU",
        additionalInfo:
          "This audio-visual piece captures the changing moods and textures of the Baltic Sea through different seasons and weather conditions. The project combines time-lapse photography, underwater footage, and field recordings to create an immersive portrait of this distinctive body of water and its relationship to the surrounding landscape.",
      },
      {
        id: 27,
        name: "Forest dream",
        description: "Personal Project",
        year: "2022",
        images: ["/placeholder.svg"],
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
        id: 28,
        name: "I want",
        description: "Digital print",
        year: "2022",
        images: ["/i-want-1.webp", "/i-want-2.webp"],
        additionalInfo:
          "This series of digital prints explores desire and aspiration through typographic experimentation. The work plays with legibility and visual hierarchy, using overlapping text and distortion techniques to create compositions that reveal different messages depending on viewing distance and perspective.",
      },
      {
        id: 29,
        name: "Twins",
        description: "Monotype",
        year: "2022",
        images: ["/twins.webp"],
        additionalInfo:
          "This collection of monotype prints explores the concept of duality through mirrored and paired forms. Each unique print was created using oil-based inks on a plexiglass plate, allowing for subtle variations in pressure and ink distribution that create rich textures and unexpected details.",
      },
      {
        id: 30,
        name: "Yellow press",
        description: "Screen-print",
        year: "2024",
        images: ["/yellow-press.webp"],
        additionalInfo:
          "This screen print series comments on media sensationalism through appropriated newspaper headlines and imagery. Using a limited palette dominated by yellow (referencing the historical term 'yellow journalism'), the prints combine text and image in compositions that highlight the manipulative nature of tabloid reporting.",
      },
      {
        id: 31,
        name: "10x10x10x10",
        description: "Screen-print",
        year: "2024",
        images: ["/placeholder.svg"],
        additionalInfo:
          "This systematic print project explores mathematical patterns through screen printing. Following a strict set of rules based on a 10x10 grid, I created variations that demonstrate how simple numerical constraints can generate complex and visually engaging compositions.",
      },
      {
        id: 32,
        name: "The flowers",
        description: "Monotype",
        year: "2023",
        images: ["/pukes.webp"],
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
        id: 95,
        name: "Flower fever dream, oil on canvas",
        description: "Personal Project",
        year: "2023",
        images: ["/flower-fever-dream.webp"],
        additionalInfo:
          "Inspired by the blooming peonies at my parents' countryside house, this painting captures the vibrant energy of nature in a surreal, dreamlike state. The bold colors and fluid, swirling forms create a sense of movement, as if the flowers are shifting and growing before the viewer’s eyes. Through vivid hues and expressive brushstrokes, the piece evokes the intensity and almost hypnotic beauty of a floral fever dream."
      },
      {
        id: 96,
        name: "Returning to self, oil on wood",
        description: "Personal Project",
        year: "2023",
        images: ["/returning-to-self.webp"],
        additionalInfo:
          "A painting of a wooden stick, created on a wooden surface, reinforcing the idea of returning to one’s essence. The work explores themes of simplicity, material connection, and grounding—where the subject and the medium mirror each other, blurring the line between representation and reality."
      },
      {
        id: 97,
        name: "Burnout, oil on canvas",
        description: "Personal Project",
        year: "2022",
        images: ["/burnout.webp"],
        additionalInfo:
          "This painting serves as a metaphor for burnout, depicting a spent match lying on a stark surface. Once a source of fire and energy, the match is now charred and exhausted, symbolizing the toll of overexertion. The contrast between light and shadow intensifies the feeling of depletion, emphasizing the fragile balance between passion and exhaustion."
      },
      {
        id: 98,
        name: "Kitchen scene, oil on canvas",
        description: "Personal Project",
        year: "2022",
        images: ["/kitchen.webp"],
        additionalInfo:
          "This painting captures a fragmented, abstract view of a kitchen sink, turning an everyday scene into a composition of shapes, reflections, and textures. The interplay between light and shadow, along with the contrast between organic and metallic elements, gives the piece a dynamic and almost surreal quality."
      },
      {
        id: 99,
        name: "Self-portrait, oil on canvas",
        description: "Personal Project",
        year: "2023",
        images: ["/self-portrait.webp"],
        additionalInfo:
          "This piece is a personal exploration of identity and self-perception. The portrait balances between realism and expression, capturing both the physical and emotional layers of self-representation."
      }
    ],
  },
]

export default function PortfolioSection() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const sectionRefs = useRef<{ [key: string]: RefObject<HTMLDivElement | null> }>({})
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
        const headerHeight = document.querySelector('header')?.offsetHeight || 0
        const sectionTop = sectionRefs.current[newActiveSection]?.current?.getBoundingClientRect().top || 0
        window.scrollTo({
          top: window.scrollY + sectionTop - headerHeight,
          behavior: "smooth",
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
            zIndex: 60,
          }}
        >
          <div className="relative w-full h-full">
            <Skeleton
              className={`w-full h-full rounded absolute inset-0 ${loadedImages.includes(hoveredProject.images[0]) ? "hidden" : "block"}`}
            />
            <img
              src={hoveredProject.images[0] || "/placeholder.svg"}
              alt={hoveredProject.name}
              className={`w-full h-full object-cover rounded ${loadedImages.includes(hoveredProject.images[0]) ? "block" : "opacity-0"}`}
              onLoad={() => handleImageLoad(hoveredProject.images[0])}
            />
          </div>
        </div>
      )}
    </section>
  )
}
