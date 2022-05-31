<template>
  <!-- <button @click="exe">执行</button> -->
  <div class="editor" ref="dom"></div>
</template>

<script setup lang="ts">
  import { onMounted, defineProps, defineEmits, ref, watch } from 'vue'
  import { initEditor } from './editor'
  //import { EmitOutput } from "typescript";
  import { useStore } from 'vuex'
  import * as monaco from 'monaco-editor'
  import { demoExtraLibType } from './demoScript'
  import { Component, ComponentInstnace, SlotChildren } from '../../model/AppInstanceModel'
  import { codeToData, upDuplicateId } from './metaScriptTometa'
  import allstore from '../../store/stores/StoreAll'

  const $store = useStore()

  interface Props {
    compMeta: ComponentInstnace
    comps: Component[]
  }

  const props = defineProps<Props>()

  //const x:AppInstance;

  const emit = defineEmits(['update:modelValue'])

  const valueHandler = (value: string) => {
    emit('update:modelValue', value)
  }
  const dom = ref()

  let modelUri: any

  const createScriptForSlotChildren = function (
    slotChildren: SlotChildren,
    compInstId: string
  ): string {
    let result = ''
    //debugger;
    Object.keys(slotChildren).forEach((slotName) => {
      const compInstArray = slotChildren[slotName]
      let compInstsStr = ''
      compInstArray.forEach((compInst) => {
        compInstsStr += createScriptForCompInst(compInst)
      })
      result += `,(inject_${slotName}_${compInstId})=>{
          ${compInstsStr}
        }`
    })

    return result
  }

  const createScriptForCompInst = function (compInst: ComponentInstnace): string {
    let slotChildrenScript = ''
    //debugger;

    if (compInst.children) {
      // debugger;
      slotChildrenScript = createScriptForSlotChildren(
        compInst.children,
        compInst.id.substring(0, 3)
      )
    }

    return `
    ${compInst.finput}
    ${compInst.name}(input${compInst.id.substring(0, 3)}${slotChildrenScript});
    `
  }

  let compMetaData = ref()

  // watch(
  //   () => props.compMeta,
  //   (n) => {
  //     console.log(n)

  //     // compMetaData.value = n
  //     let demoScript = createScriptForCompInst(props.compMeta)
  //     demoScript = `
  //   ${demoScript}
  //   `
  //   },
  //   { deep: true, immediate: true }
  // )

  //TODO点击按钮后先执行这里的生命周期函数
  onMounted(() => {
    //     console.log(props.compMeta)
    //     let demoScript
    //     if (props.compMeta.ComponentInstnace) {
    //       demoScript = createScriptForCompInst(props.compMeta.ComponentInstnace[0])
    //     } else {
    //       demoScript = createScriptForCompInst(props.compMeta)
    //     }
    //     demoScript = `
    //     ${demoScript}
    // `
    //     //console.log(demoScript);
    //     const libtype = demoExtraLibType + props.comps[0].blocket
    //     modelUri = initEditor(valueHandler, () => dom.value, demoScript, libtype)
    //     //console.log(modelUri);
    //     modelUri.editorInstance.onDidChangeModelContent(() => {
    //       let moancoTest = modelUri.editorInstance.getValue()
    //       let compMsg = JSON.parse(JSON.stringify(props.compMeta))
    //       const msg = codeToData([compMsg], JSON.parse(JSON.stringify(moancoTest)))
    //       //console.log(props.compMeta)
    //       console.log(msg)
    //       $store.commit(
    //         'saveCompInsts',
    //         {
    //           ComponentInstnace: msg
    //         },
    //         {}
    //       )
    //     })
  })

  watch(
    () => props.compMeta,
    (n) => {
      //  console.log(props.compMeta)
      // let demoScript
      // if (props.compMeta.ComponentInstnace) {
      //   demoScript = createScriptForCompInst(props.compMeta.ComponentInstnace[0])
      // } else {
      let demoScript = createScriptForCompInst(props.compMeta)
      //}

      demoScript = `
    ${demoScript}
`

      //console.log(demoScript);
      const libtype = demoExtraLibType + props.comps[0].blocket
      modelUri = initEditor(valueHandler, () => dom.value, demoScript, libtype)
      //console.log(modelUri);

      modelUri.editorInstance.onDidChangeModelContent(() => {
        let moancoTest = modelUri.editorInstance.getValue()

        // let compMsg
        // if (props.compMeta.ComponentInstnace) {
        //   compMsg = JSON.parse(JSON.stringify(props.compMeta.ComponentInstnace[0]))
        // } else {
        let compMsg = JSON.parse(JSON.stringify(props.compMeta))
        //}

        // compMsg = JSON.parse(JSON.stringify(props.compMeta))
        const msg = codeToData([compMsg], JSON.parse(JSON.stringify(moancoTest)))
        //console.log(props.compMeta)
        //  console.log(msg)
        //$store.commit('saveCompInsts', msg[0])
        allstore.moduleStore().saveCompInsts(msg[0])
      })
    },
    { deep: true }
  )

  const emitOutputHandler = (emitOutput: any) => {
    // console.log(props.compMeta);
    // console.log(emitOutput);
    //console.log(props.compMeta);
    //codeToData([props.compMeta], emitOutput);
    // const scriptstr = emitOutput.outputFiles[0].text;
    // Function(`
    //   ${demoExtraLibScript}
    //   ${scriptstr}`)();
  }

  const exe = (): void => {
    if (modelUri) {
      monaco.languages.typescript.getTypeScriptWorker().then(function (worker) {
        worker(modelUri).then(function (client) {
          client.getScriptText(modelUri.toString()).then(function (r) {
            emitOutputHandler(r)
          })
        })
      })
    }
  }
</script>

<style scoped>
  .editor {
    height: 100%;
  }
</style>
