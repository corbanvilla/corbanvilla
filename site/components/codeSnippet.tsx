"use client"
import { ReactNode, useState } from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'


export function CodeBlockWithCopy ({ children, match }: { children: ReactNode, match: RegExpExecArray | null }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      if (children) {
        navigator.clipboard.writeText(children.toString());
        setIsCopied(true);
      }
      setTimeout(() => setIsCopied(false), 2000);
    };
  
    return (
      <div className="flex flex-col my-4 w-full">
        <div className="bg-slate-200 flex -mb-3 z-10">
          <button onClick={handleCopy} className="bg-gray-200 hover:bg-gray-300 active:bg-gray-200 text-sm rounded ml-auto mr-1 my-1 px-1">
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          PreTag="div"
          language={match ? match[1] : 'plaintext'}
          style={oneLight}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  };