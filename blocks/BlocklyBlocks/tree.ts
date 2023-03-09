import { IBlocksSimple } from "../src/BlocklyReusable/blocksInterface";

export default class TreeBlock implements IBlocksSimple{
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        const ORDER_NONE = javascriptGenerator.ORDER_NONE;
        blocks[TreeBlock.nameBlock] = {
          init: function () {
            
                this.appendDummyInput()
                    .appendField("tree");
                this.setOutput(true, null);
                this.setColour(230);
                this.setTooltip("");
                this.setHelpUrl("");
            
        }
        };
        
        javascriptGenerator.addReservedWords(TreeBlock.nameBlock);
        javascriptGenerator[TreeBlock.nameBlock] = (block: any) => {  
        var code = 'tree()';
        return [code, ORDER_NONE];
        };
    
    }
    addWrapper(interpreter: any, globalObject: any) {
        var self=this;
        var wrapper= self.myFunc;

    interpreter.setProperty(globalObject, 'tree',
                  interpreter.createNativeFunction(wrapper));
  }
  public myFunc() {
    return JSON.stringify( (globalThis as any)['tree']);
    
    
  };
    fieldXML(): string {
        return `<block type="${TreeBlock.nameBlock}"></block>`;
    }
    public static nameBlock: string = "tree";
    category: string='GitHubBlocks';
}