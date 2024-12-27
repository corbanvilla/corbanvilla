import Link from "next/link";
import { TreeViewBaseItem } from '@mui/x-tree-view/models';

import Icons from "@/components/icons";
import NavigationItems from "@/components/navigationItems";
import TableOfContents from "@/components/tableOfContents";
import { buildDocTree } from "@/components/files";
import { currentDir } from "@/components/securePaths";

// TODO - refactor to page file
const dir = currentDir(import.meta.url);
const docTree = buildDocTree(dir);

function convertTree(tree: Record<string, any>, parentId: string = ''): TreeViewBaseItem[] {
  return Object.entries(tree).map(([key, value]) => {
    // Remove .md extension
    key = key.replace(/\.md$/, '');
    const id = parentId ? `${parentId}/${key}` : key;
    const label = key;

    if (value && typeof value === 'object') {
      return {
        id,
        label,
        children: convertTree(value, id),
      };
    }

    return {
      id,
      label,
    };
  });
}


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tree: TreeViewBaseItem[] = convertTree(docTree);
  console.log(JSON.stringify(tree));

  return (
    <div className="m-4 flex flex-col gap-4">
      {/* Left sidebar */}
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-row items-center gap-4">
          {/* Title */}
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-sans font-medium">Corban Villa</h1>
          </Link>
          {/* Social Media Icons */}
          <Icons className="ml-auto"/>
        </div>
        {/* NavBar */}
        <NavigationItems horizontal={true}/>
      </div>
      {/* Right content */}
      <div className="w-full h-px bg-gray-200 block" />
      <div className="flex flex-row justify-center gap-4 md:gap-8">
        <TableOfContents items={tree} />
        <div className="w-px h-128 bg-gray-200" />
        <div className="md:w-[32rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
