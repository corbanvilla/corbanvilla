"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link";

export default function NavigationLink({ href, title, notarget, className }: { href: string, title: string, notarget?: boolean, className?: string }) {
  const pathname = usePathname();
  const target = notarget ? "" : "_blank";

  return (
    <Link href={href} className={`${className || ""} ${pathname === href ? "md:text-blue-500 font-semibold md:font-normal" : ""} underline md:no-underline`} target={target}>
      {title}
    </Link>
  );
}
