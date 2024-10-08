import { notFound } from 'next/navigation';
import { readFromFile } from '../../../files';
import RenderedMarkdown from '../../../markdown';

const routeDefinitions = [
  'UTM/CS6575',
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
  const pathString = params.path.join('/');
  if (!routeDefinitions.includes(pathString))
    notFound();


  // const markdownFile = `app/[name]/${params.name}.md`;

  let markdown: string = "asdf";
  // try {
  //   markdown = readFromFile(markdownFile);
  // } catch (e) {
  //   notFound();
  // }

  return (
    <RenderedMarkdown content={markdown} />
  );
}