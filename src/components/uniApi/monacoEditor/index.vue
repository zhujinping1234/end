<!--
 * @Descripttion: monacoEditor 编辑器
 * @Author: superman
 * @Date: 2022-01-04 16:46:53
 * @LastEditors: superman
 * @LastEditTime: 2022-01-11 16:05:42
-->
<template>
  <div class="container" :style="editorStyle" ref="monacoEitorDom"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import * as monaco from 'monaco-editor'
import _ from 'lodash'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
self.MonacoEnvironment = {
  getWorker(workerId: any, label: string) {
    if (label === 'json') {
      return new JsonWorker()
    }
    return new EditorWorker()
  }
}

const props = defineProps({
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: '100%' },
  code: {
    type: String,
    default: ''
  },
  language: { type: String, default: 'json' },
  jsonSchemas: { type: Array }
})

const editorStyle = computed(() => {
  const { width, height } = props
  const fixedWidth = isNaN(Number(width)) ? width : `${width}px`
  const fixedHeight = isNaN(Number(height)) ? height : `${height}px`
  return {
    width: fixedWidth,
    height: fixedHeight
  }
})

const emit = defineEmits(['mounted', 'change'])

const monacoEitorDom = ref()

let editorInstance: monaco.editor.IStandaloneCodeEditor

onMounted(() => {
  const editorModel = monaco.editor.createModel(props.code!, props.language)

  editorInstance = monaco.editor.create(monacoEitorDom.value, {
    model: editorModel,
    tabSize: 2,
    automaticLayout: true,
    scrollBeyondLastLine: false
  })

  editorInstance.onDidChangeModelContent = _.debounce(() => {
    emit('change', editorInstance)
  }, 0)
  emit('mounted', editorInstance)
  formatDocument()
  setSchemas()
})

// 设置格式校验
function setSchemas(formParent = undefined) {
  const parseArr = formParent ? formParent : props.jsonSchemas
  let JSON_SCHEMAS = undefined
  if (props.language === 'json' && parseArr && parseArr.length > 0) {
    JSON_SCHEMAS = parseArr.map((item: any) => ({
      fileMatch: ['*'],
      uri: String(new Date().getTime()),
      schema: item.schema
    }))
    // 解决报错：(vite)Failed to execute 'postMessage' on 'Worker'
    JSON_SCHEMAS = JSON.parse(JSON.stringify(JSON_SCHEMAS))
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: JSON_SCHEMAS
    })
  }
}
// 格式化文档
function formatDocument() {
  setTimeout(() => {
    try {
      if (editorInstance) {
        editorInstance.getAction('editor.action.formatDocument').run()
      }
    } catch (e) {
      console.warn(e)
    }
  }, 300)
}

function getInstance() {
  return editorInstance
}
function setValue(val: string) {
  const value = JSON.stringify(val)
  editorInstance.setValue(value)
  formatDocument()
}
function getValue() {
  formatDocument()
  return editorInstance.getValue()
}

onBeforeUnmount(() => {
  editorInstance.dispose()
})

defineExpose({
  setValue,
  getValue,
  getInstance,
  setSchemas
})
</script>

<style lang="scss" scoped>
.container {
  text-align: left !important;
}
</style>
