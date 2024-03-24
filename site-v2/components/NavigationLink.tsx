"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link";

export default function NavigationLink({ href, title, notarget }: { href: string, title: string, notarget?: boolean }) {
  const pathname = usePathname();
  const target = notarget ? "" : "_blank";

  return (
    <Link href={href} className={pathname === href ? "text-blue-500" : ""} target={target}>
      {title}
    </Link>
  );
}
