import Link from "next/link";
import Image from "next/image";

function Icon({ src, alt, href }: { src: string, alt: string, href: string }) {
    return (
      <Link href={href} target="_blank">
        <div className="w-6 h-6 relative">
          <Image src={src} alt={alt} fill={true} />
        </div>
      </Link>
    );
  }
  
export default function Icons({ className }: { className?: string }) {
  return (
    <div className={`${className || ""}`}>
      <div className="flex flex-row gap-4 justify-end md:justify-start">
        <Icon src="/icons/github.svg" alt="GitHub" href="https://github.com/corbanvilla"/>
        <Icon src="/icons/twitter.svg" alt="Twitter" href="https://twitter.com/Animcogn"/>
        <Icon src="/icons/scholar.svg" alt="Google Scholar" href="https://scholar.google.com/citations?hl=en&user=LBFqsJcAAAAJ"/>
      </div>
    </div>
  )
}