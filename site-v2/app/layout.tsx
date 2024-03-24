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

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="mt-32 flex justify-center gap-8">
          {/* Left sidebar */}
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="w-64 h-64 relative">
              <Image src="/corban.jpg" fill alt="Corban" />
            </div>
            {/* Title */}
            <Link href="/">
              <h1 className="text-3xl font-sans font-medium">Corban Villa</h1>
            </Link>
            {/* Submenus */}
            <div className="flex flex-col gap-3 font-mono">
              <NavigationLink href="/" title="home" notarget={true} />
              <NavigationLink href="/publications" title="publications" notarget={true} />
              <NavigationLink href="https://github.com/corbanvilla/corbanvilla/blob/main/CorbanVillaResume.pdf" title="resume" />
              <NavigationLink href="mailto:hello@corbanvilla.com" title="contact" />
            </div>
            {/* Icons */}
            <div className="flex flex-row gap-4">
              <Icon src="/icons/github.svg" alt="GitHub" href="https://github.com/corbanvilla"/>
              <Icon src="/icons/twitter.svg" alt="Twitter" href="https://twitter.com/Animcogn"/>
            </div>
          </div>
          {/* Single Pixel Line */}
          <div className="w-px h-128 bg-gray-200" />
          {/* Right content */}
          <div className="w-[32rem]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
