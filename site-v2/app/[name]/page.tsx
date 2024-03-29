import { notFound } from 'next/navigation';
import { readFromFile } from '../files';
import RenderedMarkdown from '../markdown';


export function generateStaticParams() {
  return [
    { name: 'research' },
  ]
}


export default function Page({ params }: { params: { name: string } }) {
  if (!params.name)
    notFound();

  const markdownFile = `app/[name]/${params.name}.md`;

  let markdown: string;
  try {
    markdown = readFromFile(markdownFile);
  } catch (e) {
    notFound();
  }

  return (
    <RenderedMarkdown content={markdown} />
  );
}