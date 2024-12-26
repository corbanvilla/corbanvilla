"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link";


function NavigationLink({ href, title, notarget, className }: { href: string, title: string, notarget?: boolean, className?: string }) {
  const pathname = usePathname();
  const target = notarget ? "" : "_blank";
  const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link href={href} className={`${className || ""} ${isActive ? "md:text-blue-500 font-semibold md:font-normal" : ""} underline md:no-underline`} target={target}>
      {title}
    </Link>
  );
}

export default function NavigationItems() {
  return (
    <div className={`flex flex-row md:flex-col gap-3 font-mono justify-between md:justify-normal w-full`}>
      <NavigationLink href="/" title="home" notarget={true} className="hidden md:block" />
      <NavigationLink href="/papers" title="papers" notarget={true} />
      <NavigationLink href="https://resources.corbanvilla.com/CorbanVillaResume.pdf" title="cv" />
      <NavigationLink href="/docs" title="docs" notarget={true} />
      <NavigationLink href="mailto:hello@corbanvilla.com" title="contact" />
    </div>
  )
}