import { notFound } from 'next/navigation';
import { readFromFile, listMarkdownFilesRecursive, listDirsRecursivelyRelative } from '../../../components/files';
import RenderedMarkdown from '../../../components/markdown';
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
  const pathString = params.path.join('/').toLowerCase();

  // File rendering
  if (filepaths.includes(pathString)) {
    const markdownFile = `${dir}/${pathString}.md`;
    let markdown = readFromFile(markdownFile);
    return (
      <RenderedMarkdown content={markdown} />
    );

  // Directory rendering
  } else if (dirpaths.includes(pathString)) {
    return (<>Path dir</>)
  
  // Path not found
  } else {
    notFound();
  }
}