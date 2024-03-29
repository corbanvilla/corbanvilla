import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavigationLink from "@/components/NavigationLink";

import { 
  IBM_Plex_Sans,
  IBM_Plex_Mono
} from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: '--font-mono',
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Corban Villa",
  description: "Corban Villa's personal site.",
};


function Icon({ src, alt, href }: { src: string, alt: string, href: string }) {
  return (
    <Link href={href} target="_blank">
      <div className="w-6 h-6 relative">
        <Image src={src} alt={alt} layout="fill" />
      </div>
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const Icons = ({ className }: { className?: string }) => {
    return (
      <div className={`${className || ""}`}>
        <div className="flex flex-row gap-4 justify-end md:justify-start">
          <Icon src="/icons/github.svg" alt="GitHub" href="https://github.com/corbanvilla"/>
          <Icon src="/icons/twitter.svg" alt="Twitter" href="https://twitter.com/Animcogn"/>
        </div>
      </div>
    )
  }

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="m-4 md:mt-32 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          {/* Left sidebar */}
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 md:-mb-2">
              {/* Image */}
              <Link href="/">
                <div className="w-12 h-12 md:w-64 md:h-64 relative">
                  <Image src="/corban.jpg" fill alt="Corban" />
                </div>
              </Link>
              {/* Title */}
              <Link href="/">
                <h1 className="text-2xl md:text-3xl font-sans font-medium">Corban Villa</h1>
              </Link>
              {/* Social Media Icons */}
              <Icons className="md:hidden flex-auto"/>

            </div>
            {/* Submenus */}
            <div className="flex flex-row md:flex-col gap-3 font-mono justify-between md:justify-normal w-full">
              <NavigationLink href="/" title="home" notarget={true} className="hidden md:block" />
              <NavigationLink href="/research" title="research" notarget={true} />
              <NavigationLink href="https://github.com/corbanvilla/corbanvilla/blob/main/CorbanVillaResume.pdf" title="resume" />
              <NavigationLink href="mailto:hello@corbanvilla.com" title="contact" />
            </div>
            {/* Icons */}
            <Icons className="hidden md:block"/>
          </div>
          {/* Single Pixel Line */}
          <div className="w-px h-128 bg-gray-200 hidden md:block" />
          <div className="w-full h-px bg-gray-200 block md:hidden" />
          {/* Right content */}
          <div className="md:w-[32rem]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
