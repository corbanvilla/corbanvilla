import Link from "next/link";
import { ReactNode } from "react";

export function StyledLink ({ className, href, children, passHref }: { className?: string, href: string, children: ReactNode, passHref?: boolean }) {

  return (
    <Link href={href} passHref={passHref} className={`${className} text-blue-700 break-words`} target="_blank">
        {children}
    </Link>
  );
};