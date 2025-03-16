import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-0 md:w-1/2 instrument-serif italic">
            About me
          </h2>
          <div className="md:w-1/2">
            <Image
              src="/katrina.webp"
              alt="About Me"
              width={400}
              height={600}
              className="w-full h-auto object-cover rounded-lg mb-8"
            />
          </div>
        </div>
        <div className="mt-8">
          <p className="text-lg mb-6 inter">
            My name is Katrīna Puķe, and I’m an emerging multimedia artist and graphic designer from Riga, Latvia. I graduated from the Riga School of Design and Art as an Advertising Design Specialist and am currently pursuing a Bachelor's degree in Visual Communication at the Latvian Academy of Arts, specializing in the Audio-Visual department.
          </p>
          <p className="text-lg mb-6 inter">
            My passion for art began at the age of six when I first attended the Design and Art School of Valmiera in the "Visual Plastic Arts" program. It was there that I started developing my artistic abilities and creative vision through academic painting, drawing, and sculpting.
          </p>
          <p className="text-lg mb-6 inter">
            With a diverse background in art and design, I’ve had the privilege of working with design and advertising agencies such as Element Digital in Riga. I also interned as a pavilion assistant at the prestigious Venice Biennale of Architecture and am currently gaining experience as a marketing and content manager at the Tallinas Street Creative Quarter.
          </p>
          <p className="text-lg mb-6 inter">
            I’m proficient in Adobe Creative Cloud, with expertise in Illustrator, Photoshop, and InDesign. My skills extend to video editing using software like DaVinci Resolve and include foundational knowledge of 3D design and animation as well as virtual reality expiriences developed through tools like Blender and Unity.
          </p>
          <p className="text-lg mb-10 inter">
            My creative work has been featured in exhibitions such as “Rakstatsevišķi” in 2023, and my screen print pieces have been showcased at the annual “Jaunmarka” student art exhibition at the Latvian Academy of Arts for several years.
          </p>

          <div className="flex space-x-4 mt-8">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-colors inter"
            >
              Instagram
            </Link>
            <Link
              href="#"
              target="_blank"
              className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-colors inter"
            >
              Download CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

