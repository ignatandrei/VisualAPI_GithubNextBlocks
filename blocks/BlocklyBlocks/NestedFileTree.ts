import { IBlocksSimple } from "../src/BlocklyReusable/blocksInterface";

export default class NestedFileTreeBlock implements IBlocksSimple{
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        const ORDER_NONE = javascriptGenerator.ORDER_NONE;
        blocks[NestedFileTreeBlock.nameBlock] = {
          init: function () {
            
                this.appendDummyInput()
                    .appendField("NestedFileTree");
                this.setOutput(true, null);
                this.setColour(230);
                this.setTooltip("");
                this.setHelpUrl("");
            
        }
        };
        
        javascriptGenerator.addReservedWords(NestedFileTreeBlock.nameBlock);
        javascriptGenerator[NestedFileTreeBlock.nameBlock] = (block: any) => {  
        var code = 'NestedFileTree()';
        return [code, ORDER_NONE];
        };
    
    }
    addWrapper(interpreter: any, globalObject: any) {
        var self=this;
        var wrapper= self.myFunc;

    interpreter.setProperty(globalObject, 'NestedFileTree',
                  interpreter.createNativeFunction(wrapper));
  }
  public myFunc() {
    return JSON.stringify( (globalThis as any)['NestedFileTree']);
    
    
  };
    fieldXML(): string {
        return `<block type="${NestedFileTreeBlock.nameBlock}"></block>`;
    }
    public static nameBlock: string = "NestedFileTreeBlock";
    category: string='GitHubBlocks';
}