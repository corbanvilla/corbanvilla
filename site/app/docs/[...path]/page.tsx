import { notFound } from 'next/navigation';
import { readFromFile, listMarkdownFilesRecursive, listDirsRecursivelyRelative, buildDocTree } from '../../../components/files';
import { RenderedDocsMarkdown } from '../../../components/markdown';
import { DOCS_PATH } from '@/app/constants';

const dir = DOCS_PATH;
const files = listMarkdownFilesRecursive(dir);
const filepaths = files.map(file => file.replace(/\.md$/, ''));
const dirpaths = listDirsRecursivelyRelative(dir);
const allPaths = [...filepaths, ...dirpaths];

export function generateStaticParams() {
  return allPaths.map((route) => ({
      path: route.split('/'),
  }));
}

export default async function Page(props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params;
  const pathString = params.path.join('/');

  let markdownFile: string;
  
  // File rendering
  if (filepaths.includes(pathString)) {
    markdownFile = `${dir}/${pathString}.md`;

  // Path not found
  } else {
    notFound();
  }

  const markdown = readFromFile(markdownFile);
  return (
    <RenderedDocsMarkdown className="" content={markdown} />
  );
}