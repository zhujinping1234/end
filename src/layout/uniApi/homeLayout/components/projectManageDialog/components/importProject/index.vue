<template>
  <div>
    <el-dialog title="导入数据" v-model="dialogVisibleImport" width="70%">
      <div style="height: 360px">
        <monaco-editor ref="monacoEditor"></monaco-editor>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleImport = false">取 消</el-button>
        <el-button type="primary" @click="projectImport">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '@/components/uniApi/monacoEditor/index.vue'
import { post } from '@/utils/axios'

const props = defineProps({
  importData: {
    type: String
  }
})

const dialogVisibleImport = ref(false)

function show() {
  dialogVisibleImport.value = true
}
const monacoEditor = ref()
function projectImport() {
  let value = monacoEditor.value.getValue()
  value = JSON.parse(value)
  post('openapi/import/doc', {
    openApiId: props.importData,
    openApi: value
  })
}
defineExpose({
  show
})
</script>

<style></style>
