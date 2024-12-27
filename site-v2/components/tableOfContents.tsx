"use client"
import { StyledLink } from './styledLink';
import { useEffect, useMemo } from 'react';
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
      if (Array.isArray(newPath)) {
        return;
      }
      if (newPath !== path) {
        router.push(`${DOCS_URL_PREFIX}/${newPath}`);
      }
    };
  
    useEffect(() => {
      const event = new Event('syntheticEvent') as unknown as React.SyntheticEvent;
  
      const segments = path.split("/");
  
      let delay = 0;
      let delayIncrement = 50;
      segments.forEach((_, index) => {
        const currentPath = segments.slice(0, index + 1).join("/");
        setTimeout(() => {
          apiRef.current?.setItemExpansion(event, currentPath, true);
          // const itemId = currentPath;
          // const keepExistingSelection = true;
          // const shouldBeSelected = true;
          // apiRef.current?.selectItem({event, itemId, keepExistingSelection, shouldBeSelected });
        }, (delay += delayIncrement));
      });
      
      setTimeout(() => {
        const itemId = path;
        const keepExistingSelection = true;
        const shouldBeSelected = true;
        apiRef.current?.selectItem({event, itemId, keepExistingSelection, shouldBeSelected });
      }, (delay += delayIncrement));
      
    }, [path, apiRef]);
    
    return (
      <div className="flex flex-col">
        <StyledLink href={DOCS_URL_PREFIX} className="text-black">
          <h1 className="text-2xl font-medium">Table of Contents</h1>
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
              // selectedItems={selectedItems}
            />
        </Box>
      </div>
    );
}