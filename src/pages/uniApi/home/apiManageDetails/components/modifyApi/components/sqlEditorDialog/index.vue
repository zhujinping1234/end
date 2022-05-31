<!--
 * @Descripttion: sql编辑器弹框
 * @Author: superman
 * @Date: 2021-12-28 15:42:18
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 19:49:10
-->
<template>
  <el-dialog title="SQL" v-model="dialogVisible" width="50%">
    <monaco-editor
      ref="monacoEditor"
      language="sql"
      height="300"
      :code="value"
    />
    <span slot="footer" class="dialog-footer" v-if="isImport">
      <el-button type="primary" @click="importSQL">导入SQL</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import nodeSqlParser from 'node-sql-parser'
import MonacoEditor from '@/components/uniApi/monacoEditor/index.vue'
import { getSqlParams, getSqlForParser } from '@/utils/uniApi'
import { PARAM_TYPE } from '@/constant/uniApi'

const props = defineProps({
  isImport: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: undefined
  }
})
const emit = defineEmits(['export'])
const dialogVisible = ref(false)
function show() {
  dialogVisible.value = true
}
function hide() {
  dialogVisible.value = false
}
const monacoEditor = ref()
function importSQL() {
  const sqlParser = new nodeSqlParser.Parser()
  let editorVal = monacoEditor.value.getValue()

  const ast: any = sqlParser.astify(getSqlForParser(editorVal))
  const requestParams = getSqlParams(editorVal)
  const formatVal: any = {
    request: {
      get: [],
      other: {
        schema: {
          type: PARAM_TYPE.object,
          properties: {}
        }
      }
    },
    response: {
      schema: {
        type: PARAM_TYPE.object,
        properties: {}
      }
    }
  }

  requestParams.forEach((obj: any) => {
    formatVal.request.get.push({
      name: obj.name,
      in: 'query',
      example: '',
      description: obj.desc,
      required: false,
      schema: {
        type: PARAM_TYPE[obj.type] ? obj.type : PARAM_TYPE.string
      }
    })
    formatVal.request.other.schema.properties[obj.name] = {
      description: obj.desc,
      type: PARAM_TYPE[obj.type] ? obj.type : PARAM_TYPE.string
    }
  })

  const columns = ast.columns
  if (columns) {
    columns.forEach((obj: any) => {
      let name = ''
      if (obj.expr.args) {
        name = obj.expr.args.expr.column
      } else if (obj.expr.column) {
        name = obj.expr.column
      }
      formatVal.response.schema.properties[name] = {
        type: PARAM_TYPE.string
      }
    })
  }
  emit('export', monacoEditor.value.getValue(), formatVal, ast)
  hide()
}
defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped></style>
