"use client"
import { StyledLink } from './styledLink';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled, alpha } from '@mui/material/styles';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks/useTreeViewApiRef';
import { DOCS_URL_PREFIX } from '@/app/constants';


// https://mui.com/x/react-tree-view/tree-item-customization/
// @ts-ignore
const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  // Content padding + texts
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0),
    padding: theme.spacing(0.5, 0),
    margin: theme.spacing(0.2, 0),
    // Font weight
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
  // Dashed dots
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  // Focused
  [`& .${treeItemClasses.selected}`]: {
    // borderColor: theme.palette.primary.light,
    // Font weight
    [`& .${treeItemClasses.label}`]: {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },
}));
  

export default function TableOfContents({ items }: { items: TreeViewBaseItem[] }) {
    const router = useRouter();
    const apiRef = useTreeViewApiRef();
    const path = usePathname().replace(new RegExp(`^${DOCS_URL_PREFIX}/`), '');

    const handleSelectedItemsChange = (event: React.SyntheticEvent, ids: string[]) => {
      const newPath = ids;
      
      // Since multiselect is disabled, this will never run
      if (Array.isArray(newPath)) {
        return;
      }

      // Do not navigate if the item has children (is a folder)
      if (apiRef.current?.getItem(newPath)?.children) {
        return;
      }

      // Navigate to the selected page
      if (newPath !== path) {
        router.push(`${DOCS_URL_PREFIX}/${newPath}`);
      }
    };
  
    const segments = path
      .split('/')
      .slice(0, -1)  // Remove the last segment
      .reduce((acc: string[], curr: string, i: number, arr: string[]) => {
        const path = arr.slice(0, i + 1).join('/');
        return [...acc, path];
      }, []);
    
    return (
      <div className="flex flex-col">
        <StyledLink href={DOCS_URL_PREFIX} className="text-black" self={true}>
          <h1 className="text-2xl font-medium text-black">Table of Contents</h1>
        </StyledLink>
        <Box sx={{ minWidth: 250 }}>
            {/* @ts-ignore */}
            <RichTreeView 
              /* @ts-ignore */
              slots={{ item: CustomTreeItem }}
              /* @ts-ignore */
              items={items} 
              /* @ts-ignore */
              apiRef={apiRef}
              /* @ts-ignore */
              onSelectedItemsChange={handleSelectedItemsChange}
              defaultExpandedItems={segments}
              selectedItems={path}
            />
        </Box>
      </div>
    );
}