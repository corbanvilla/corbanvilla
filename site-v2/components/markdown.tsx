import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

import { StyledLink } from './styledLink';
import { CodeBlockWithCopy } from "./codeSnippet";

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

export function RenderedDocsMarkdown({ content, className }: { content: string, className: string }) {
  return (
    <main className={className}>
      <ReactMarkdown
        className="text-lg font-light"
        rehypePlugins={[rehypeRaw]}
        components={{
            a: ({ href, title, children }) => (
                <StyledLink href={href || "/"} className="py-2" >{children}</StyledLink>
            ),
            p: ({ children }) => <p className="">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            h1: ({ children }) => <h1 className="text-2xl font-medium mb-4 tracking-tight">{children}</h1>,
            ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>,
            code({children, className, node, ...rest}) {
              const match = /language-(\w+)/.exec(className || '');
              // Determine inline vs. block code by checking for a position attribute
              const isInline = node?.children[0]?.position !== undefined;

              if (!isInline) {
                return (<CodeBlockWithCopy match={match}>{children}</CodeBlockWithCopy>)
              }
              return <code className="bg-gray-100 rounded px-1">{children}</code>;
            },
        }}
      >
        {content}
      </ReactMarkdown>
    </main>
  );
}