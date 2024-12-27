import Link from "next/link";
import { ReactNode } from "react";

export function StyledLink ({ className, href, children, passHref, self }: { className?: string, href: string, children: ReactNode, passHref?: boolean, self?: boolean }) {

  return (
    <Link href={href} passHref={passHref} className={`${className} text-blue-700 break-words`} target={!self ? "_blank" : "_self"}>
        {children}
    </Link>
  );
};