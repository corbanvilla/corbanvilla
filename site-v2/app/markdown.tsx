import Link from "next/link";
import { ReactNode } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

const StyledLink = ({ className, href, children, passHref }: { className?: string, href: string, children: React.ReactNode, passHref?: boolean }) => {

  return (
    <Link href={href} passHref={passHref} className={`${className} text-blue-700`} target="_blank">
        {children}
    </Link>
  );
};

export default function RenderedMarkdown({ content }: { content: string }) {
  return (
    <main className="">
      <ReactMarkdown
        className="text-lg font-light"
        rehypePlugins={[rehypeRaw]}
        components={{
            a: ({ href, title, children }) => (
                <StyledLink href={href || "/"} className="py-2" >{children}</StyledLink>
            ),
            p: ({ children }) => <p className="mb-4 md:mb-6">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            h1: ({ children }) => <h1 className="text-2xl font-medium mb-4 tracking-tight">{children}</h1>,
            ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </main>
  );
}
