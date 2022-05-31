import * as monaco from 'monaco-editor'
// import { constrainedEditor } from "constrained-editor-plugin";
// import * as typescript from "typescript";

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

monaco.languages.register({ id: 'typescript' })

let editorInstance

export const initEditor = function (valueHandler, domElementFn, demoScript, demoExtraLibScript) {
  //生成编辑器对象
  editorInstance = monaco.editor.create(domElementFn(), {
    /*   model: jsonModel,
       tabSize: 2,
       automaticLayout: true,
       scrollBeyondLastLine: false,
   });
*/
    value: demoScript,
    language: 'typescript'
  })

  // editorInstance.onDidChangeCursorPosition((e) => {});

  editorInstance.onDidChangeModelContent((e) => {
    let moancoTest = editorInstance.getValue()
  })

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    demoExtraLibScript,
    'inmemory://model/node_modules/@types/jquery/index.d.ts'
  )

  // compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES5,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ES2016,
    // noEmit: true,
    typeRoots: ['inmemory://model/node_modules/@types']
  })

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  })

  const model = editorInstance.getModel().uri
  /*
// - Configuration for the Constrained Editor : Starts Here
const constrainedInstance = constrainedEditor(monaco);
constrainedInstance.initializeIn(editorInstance);
constrainedInstance.addRestrictionsTo(model, [{
    // range : [ startLine, startColumn, endLine, endColumn ]
    range: [1, 7, 4, 12], // Range of Util Variable name
    label: 'utilName',
    validate: function (currentlyTypedValue, newRange, info) {
        const noSpaceAndSpecialChars = /^[a-z0-9A-Z]*$/;
        return noSpaceAndSpecialChars.test(currentlyTypedValue);
    }
}, {
    range: [3, 1, 3, 1], // Range of Function definition
    allowMultiline: true,
    label: 'funcDefinition'
}]);
// - Configuration for the Constrained Editor : Ends Here





editorInstance.onDidChangeModelContent(() => {
    const value = editorInstance.getValue();
    valueHandler(value);
   
});

*/

  return { model, editorInstance }
}
