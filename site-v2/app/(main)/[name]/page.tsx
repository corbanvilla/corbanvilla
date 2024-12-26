import { notFound } from 'next/navigation';
import { currentDir, secureJoin } from '@/components/securePaths';
import { readFromFile, listMarkdownFiles } from '../../../components/files';
import RenderedMarkdown from '../../../components/markdown';


export function generateStaticParams() {
  const dir = currentDir(import.meta.url);
  const files = listMarkdownFiles(dir);
  return files.map(file => ({ name: file.replace(/\.md$/, '') }));
}


export default function Page({ params }: { params: { name: string } }) {
  if (!params.name)
    notFound();

  const dir = currentDir(import.meta.url);
  const markdownFile = secureJoin(dir, `${params.name}.md`);
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