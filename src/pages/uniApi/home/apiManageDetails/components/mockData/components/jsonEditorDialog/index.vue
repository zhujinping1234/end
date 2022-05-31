<!--
 * @Descripttion: json编辑弹框
 * @Author: superman
 * @Date: 2022-01-04 10:31:53
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 19:26:35
-->
<template>
  <el-dialog
    title=""
    v-model="dialogVisible"
    width="50%"
    :close-on-click-modal="closeOnClickModal"
  >
    <monaco-editor
      ref="monacoEditor"
      height="300"
      @mounted="editorMounted"
      :code="currentRow ? JSON.stringify(currentRow.mockData) : ''"
    />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveMockData"> 保存 </el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import _ from 'lodash'
import MonacoEditor from '@/components/uniApi/monacoEditor/index.vue'
import { post } from '@/utils/axios'

const props = defineProps({
  data: {
    type: Object,
    default: undefined
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update'])
const dialogVisible = ref(false)
const currentRow = ref<any>(undefined)

function show(row = undefined) {
  row ? (currentRow.value = row) : ''
  dialogVisible.value = true
}
function editorMounted() {
  setJsonSchemas()
}
const monacoEditor = ref()
function setJsonSchemas() {
  let jsonSchemas
  if (!props.data?.operation.responses) {
    jsonSchemas = undefined
  } else {
    const responseData =
      props.data.operation.responses['200'].content['application/json']
    jsonSchemas = [responseData]
  }
  monacoEditor.value.setSchemas(jsonSchemas)
}
function saveMockData() {
  const path = props.data!.path
  const type = props.data!.type
  const mockId = currentRow.value ? currentRow.value.mockId : null
  let data = monacoEditor.value.getValue()
  data = JSON.parse(data)
  if (!_.isEmpty(data) && _.isObject(data)) {
    post('mock/save', { type, path, data, mockId }, true)
    dialogVisible.value = false
    emit('update')
  }
}
defineExpose({
  show
})
</script>

<style lang="scss" scoped></style>
