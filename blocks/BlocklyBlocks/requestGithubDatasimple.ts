import { IBlocksSimple } from "../src/BlocklyReusable/blocksInterface";
import * as Blockly from 'blockly';

const urls=['actions',
'assignees',
'autolinks',
'branches',
'check-runs',
'check-suites',
'code-scanning',
'codeowners',
'codespaces',
'collaborators',
'comments',
'commits',
'community',
'compare',
'contents',
'dependabot',
'dependency-graph',
'deployments',
'environments',
'git',
'hooks',
'import',
'issues',
'keys',
'labels',
'milestones',
'pages',
'pulls',
'readme',
'releases',
'secret-scanning',
'stats',
'tags',
'tarball',
'traffic',
'zipball'
];
const optData=urls.map(it=>[it,it]);
export default class FuncOnRequestGitHubDataSimple implements IBlocksSimple{
    definitionBlocksSimple(blocks: any, javascriptGenerator: any): void {
        const ORDER_NONE = javascriptGenerator.ORDER_NONE;
        blocks[FuncOnRequestGitHubDataSimple.nameBlock] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("/repos/{owner}/{repo}/");
                this.appendDummyInput()
                    .appendField("What")
                    //.appendField(new Blockly.FieldDropdown([["commits","commits"], ["branches","branches"]]), "What");
                    .appendField(new Blockly.FieldDropdown(optData), "What");

                this.appendValueInput("Segment")
                    .setCheck("String")
                    .appendField("Add Segment");
                this.setOutput(true, null);
                this.setColour(230);
             this.setTooltip("");
             this.setHelpUrl("");
              }
        };
        
        javascriptGenerator.addReservedWords(FuncOnRequestGitHubDataSimple.nameBlock);
        javascriptGenerator[FuncOnRequestGitHubDataSimple.nameBlock] = (block: any) => {  
            var dropdown_what = block.getFieldValue('What');
            var value_segment = javascriptGenerator.valueToCode(block, 'Segment', javascriptGenerator.ORDER_ATOMIC);
            var owner='owner';
            var repo='repo'
            var str=`'`+ '/'+ dropdown_what + `'`;
            var segment = `''`;
            if(value_segment && value_segment.length>0){
                //segment =`'`+ '/' +`'`+'+'+value_segment;
            }
            var code = `
            (function(){
                var strFC=FolderContext();
                var f= JSON.parse(strFC);                             
                var str = '/repos/'+ f.owner + '/' +  f.repo;
                str += '/${dropdown_what}'; 
                str+=${segment};
                return FuncGitHubData(str,strFC);
            }())
            `;
            //code ='...';
            return [code, javascriptGenerator.ORDER_NONE];
        };
    
    }
    addWrapper(interpreter: any, globalObject: any) {
        var self=this;
        var wrapper= self.myFunc;

    interpreter.setProperty(globalObject, 'FolderContext',
                  interpreter.createNativeFunction(wrapper));


  var wrapperCallFunc = (href:any, folderContext:any , callback:any) => self.callRequestGitHubDataSimple(callback,href,folderContext );
  interpreter.setProperty(globalObject, 'FuncGitHubData',
      interpreter.createAsyncFunction(wrapperCallFunc));
              
  }
  public myFunc() {
    return JSON.stringify( (globalThis as any)['FolderContext']);
    
    
  };
  public callRequestGitHubDataSimple(callback:any,href:string,folderContext:string) {
    var funcData= (globalThis as any)['FuncGitHubData'] ;
    console.log('this is href',href); 
    var fc=JSON.stringify(folderContext); 
    (funcData(href, fc) as  Promise<any>)
      .then(it=> callback(JSON.stringify(it))).catch(e=>console.log('error for '+ href,e));

  }
  
    fieldXML(): string {
        return `
        <block type="text_print" >
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
          <block type="${FuncOnRequestGitHubDataSimple.nameBlock}">
            <field name="What">commits</field>
            <value name="Segment">
              <block type="text">
                <field name="TEXT"></field>
              </block>
            </value>
          </block>
        </value>
      </block>
        `;
    }
    public static nameBlock: string = "FuncOnRequestGitHubDataSimple";
    category: string='GitHubBlocks';
}