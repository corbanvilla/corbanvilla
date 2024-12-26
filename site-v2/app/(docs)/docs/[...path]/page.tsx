import { notFound } from 'next/navigation';
import { readFromFile } from '../../../../components/files';
import RenderedMarkdown from '../../../../components/markdown';

const routeDefinitions = [
  'utm/cs6575',
]

export function generateStaticParams() {
  const params = routeDefinitions.map((route) => {
    return {
      path: route.split('/').slice(0, -1),
    }
  });
  return params;
}

export default function Page({ params }: { params: { path: string[] } }) {
  if (!params.path)
    notFound();

  if (!Array.isArray(params.path))
    notFound();

  if (params.path.length == 0)
    notFound();

  // Only allow the route definitions we have (no directory traversal)
  const pathString = params.path.join('/').toLowerCase();
  if (!routeDefinitions.includes(pathString))
    notFound();
  const markdownFile = `app/docs/${pathString}.md`;

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