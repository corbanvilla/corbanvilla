import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm'

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
            p: ({ children }) => <p className="mb-2 md:mb-4">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            h1: ({ children }) => <h1 className="text-2xl font-medium mb-4 tracking-tight">{children}</h1>,
            ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            sup: ({ children }) => <sup className="inline-block leading-snug pt-2">{children}</sup>,
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
        rehypePlugins={[rehypeRaw, remarkGfm]}
        components={{
            a: ({ href, title, children }) => (
                <StyledLink href={href || "/"} className="py-2" >{children}</StyledLink>
            ),
            p: ({ children }) => <p className="">{children}</p>,
            strong: ({ children }) => <strong className="mb-4 font-semibold">{children}</strong>,
            h1: ({ children }) => <h1 className="text-3xl font-medium mb-4 tracking-tight">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-medium my-4 tracking-tight">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium my-4 tracking-tight">{children}</h3>,
            ul: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            ol: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">{children}</blockquote>,
            code({children, className, node, ...rest}) {
              const match = /language-(\w+)/.exec(className || '');
              // Determine inline vs. block code by checking for a position attribute
              const isInline = node?.children[0]?.position !== undefined;

              return isInline ? (
                <code className="bg-gray-100 rounded px-1 text-[0.85em]">{children}</code>
              ) : (
                <CodeBlockWithCopy match={match}>{children}</CodeBlockWithCopy>
              );
            },
            input: ({ type, checked }) => (
                <input
                    type={type}
                    checked={checked}
                    readOnly={true}
                    className="border rounded p-2 mb-4"
                />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </main>
  );
}