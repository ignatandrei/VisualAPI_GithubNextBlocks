import { IBlocksSimple } from "../src/BlocklyReusable/blocksInterface";

export default class FolderContextBlock implements IBlocksSimple{
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        const ORDER_NONE = javascriptGenerator.ORDER_NONE;
        blocks[FolderContextBlock.nameBlock] = {
          init: function () {
            
                this.appendDummyInput()
                    .appendField("FolderContext");
                this.setOutput(true, null);
                this.setColour(230);
                this.setTooltip("");
                this.setHelpUrl("");
            
        }
        };
        
        javascriptGenerator.addReservedWords(FolderContextBlock.nameBlock);
        javascriptGenerator[FolderContextBlock.nameBlock] = (block: any) => {  
        var code = 'FolderContext()';
        return [code, ORDER_NONE];
        };
    
    }
    addWrapper(interpreter: any, globalObject: any) {
        var self=this;
        var wrapper= self.myFunc;

    interpreter.setProperty(globalObject, 'FolderContext',
                  interpreter.createNativeFunction(wrapper));
  }
  public myFunc() {
    return JSON.stringify( (globalThis as any)['FolderContext']);
    
    
  };
    fieldXML(): string {
        return `<block type="${FolderContextBlock.nameBlock}"></block>`;
    }
    public static nameBlock: string = "FolderContextBlock";
    category: string='GitHubBlocks';
}