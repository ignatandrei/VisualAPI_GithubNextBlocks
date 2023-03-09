import { FolderBlockProps, getNestedFileTree } from "@githubnext/blocks";
import { Box } from "@primer/react";
import { useEffect } from "react";
//import FileContextBlock from "./BlocklyBlocks/FileContextBlock";
import FolderContextBlock from "./BlocklyBlocks/FolderContextBlock";
import NestedFileTreeBlock from "./BlocklyBlocks/NestedFileTree";
import TreeBlock from "./BlocklyBlocks/tree";
import App from "./src/App";
import { IBlocksSimple } from "./src/BlocklyReusable/blocksInterface";
import NewBlocksContext from "./src/Common/NewBlocksContext";

import {  Endpoints } from '@octokit/types';
import FuncOnRequestGitHubDataSimple from "./BlocklyBlocks/requestGithubDatasimple";


export default function ExampleFolderBlock(props: FolderBlockProps) {

  
  //onRequestGitHubEndpoint1('GET /repos/{owner}/{repo}/commits',({}))
  
  useEffect(()=>{
    (globalThis as any)['FolderBlockProps']=props;
    (globalThis as any)['FolderContext'] = props.context;
    (globalThis as any)['NestedFileTree'] = getNestedFileTree(props.tree);
    (globalThis as any)['tree'] = props.tree;
    (globalThis as any)['FuncGitHubData'] = props.onRequestGitHubData;
    
    props.onRequestGitHubData("/");
  })
  const arrNewBlocks: IBlocksSimple[]=[
    new FolderContextBlock(),
    new NestedFileTreeBlock(),
    new TreeBlock(),
    new FuncOnRequestGitHubDataSimple(),
    // new FileContextBlock()
  ]
  return (
    <Box p={4}>
      <NewBlocksContext.Provider value={arrNewBlocks}>
      <App />
      </NewBlocksContext.Provider>
    </Box>
  );
}
