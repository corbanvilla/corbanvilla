import { notFound } from 'next/navigation';
import { readFromFile, listMarkdownFilesRecursive, listDirsRecursivelyRelative, buildDocTree } from '../../../components/files';
import { RenderedDocsMarkdown } from '../../../components/markdown';
import { currentDir } from '@/components/securePaths';

const dir = currentDir(import.meta.url);
const files = listMarkdownFilesRecursive(dir);
const filepaths = files.map(file => file.replace(/\.md$/, ''));
const dirpaths = listDirsRecursivelyRelative(dir);
const allPaths = [...filepaths, ...dirpaths];

export function generateStaticParams() {
  return allPaths.map((route) => ({
      path: route.split('/'),
  }));
}

export default function Page({ params }: { params: { path: string[] } }) {
  const pathString = params.path.join('/');

  // File rendering
  let markdownFile: string;
  if (filepaths.includes(pathString)) {
    markdownFile = `${dir}/${pathString}.md`;

  // Directory rendering
  } else if (dirpaths.includes(pathString)) {
    markdownFile = `${dir}/${pathString}/README.md`;

  // Path not found
  } else {
    notFound();
  }

  const markdown = readFromFile(markdownFile);
  return (
    <RenderedDocsMarkdown className="" content={markdown} />
  );

}