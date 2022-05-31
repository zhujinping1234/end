<!--
 * @Descripttion: 低级mock页面
 * @Author: superman
 * @Date: 2021-12-22 15:02:42
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:19:23
-->
<template>
  <div class="container">
    <div class="header">
      <el-input placeholder="请输入内容" v-model="mockUrl" disabled>
        <template slot="prepend">mock地址</template>
      </el-input>
      <div class="content-right">
        <el-button type="primary" :icon="Plus" @click="addMockDialog.show()"
          >添加期望</el-button
        >
        <json-editor-dialog
          :data="data"
          ref="addMockDialog"
          :key="`addMockDialog${new Date().getTime()}`"
          @update="getMockList"
        />
      </div>
    </div>
    <div class="main">
      <el-table :data="mockList" stripe>
        <el-table-column label="mockId" prop="mockId" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button type="primary" @click="showModifyMockDialog(scope.row)">
              查看/修改期望
            </el-button>
            <el-popconfirm
              @confirm="deleteMockData(scope.row)"
              title="是否删除该条期望?"
            >
              <template #reference>
                <el-button type="danger">删除期望</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <json-editor-dialog
      :data="data"
      :key="modifyMockDialogKey"
      :close-on-click-modal="false"
      @update="getMockList"
      ref="modifyMockDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import _ from 'lodash'
import JsonEditorDialog from './components/jsonEditorDialog/index.vue'
import { post, get } from '@/utils/axios'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  data: {
    type: Object
  }
})
const mockList = ref<Array<any>>([])
const modifyMockDialogKey = ref(`modifyMockDialog${new Date().getTime()}`)
const mockUrl = computed(() => {
  const mockBaseUrl = 'http://110.42.225.92:8088/mock/'
  const apiProjectId = window.localStorage.getItem('projectId')
  return `${mockBaseUrl}${apiProjectId}${props.data!.path}`
})
watch(
  () => props.data,
  () => {
    // 请求的数据依赖于传入的data,所以不在生命周期中调用。
    getMockList()
  },
  { deep: true }
)
const addMockDialog = ref()
async function getMockList() {
  const path = props.data!.path
  const type = props.data!.type
  const result = await post('mock/list', { path, type }).then((res: any) => {
    return res.data || {}
  })
  mockList.value = formatMockList(result)
}
function formatMockList(result: any) {
  if (!_.isEmpty(result)) {
    const formatArr = []
    for (let mockId in result) {
      formatArr.push({
        mockId,
        mockData: result[mockId]
      })
    }
    return formatArr
  } else {
    return []
  }
}
const modifyMockDialog = ref()
function showModifyMockDialog(row: any) {
  modifyMockDialogKey.value = `modifyMockDialog${new Date().getTime()}`
  nextTick(() => {
    modifyMockDialog.value.show(row)
  })
}
function deleteMockData(row: any) {
  const path = props.data!.path
  const type = props.data!.type
  const mockId = row.mockId
  get('mock/del', { path, type, mockId }, true).then(() => {
    getMockList()
  })
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.header {
  .content-right {
    text-align: right;
  }
}
.main {
  height: 100%;
  width: 100%;
}
</style>
