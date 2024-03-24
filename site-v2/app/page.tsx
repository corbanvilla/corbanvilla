import { readFromFile } from './files';
import RenderedMarkdown from './markdown';

export default function Page() {
  const markdown = readFromFile("app/page.md");

  return (
    <RenderedMarkdown content={markdown} />
  );
}