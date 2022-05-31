<!--
 * @Descripttion: 参数表格，可添加
 * @Author: superman
 * @Date: 2021-12-01 08:48:20
 * @LastEditors: superman
 * @LastEditTime: 2022-01-10 15:17:14
-->
<template>
  <el-table :data="paramList" style="width: 100%">
    <el-table-column min-width="5%">
      <template #header>
        <el-link :icon="CirclePlusFilled" type="primary" @click="append" />
      </template>
    </el-table-column>
    <el-table-column label="参数名" align="center" min-width="20%">
      <template #default="scope">
        <el-input v-model="scope.row.name" placeholder="参数名" size="small" />
      </template>
    </el-table-column>
    <el-table-column label="必填" align="center" min-width="5%">
      <template #default="scope">
        <el-checkbox v-model="scope.row.required" />
      </template>
    </el-table-column>
    <el-table-column label="示例值" align="center" min-width="20%">
      <template #default="scope">
        <el-input
          v-model="scope.row.example"
          placeholder="示例值"
          size="small"
        />
      </template>
    </el-table-column>
    <el-table-column label="说明" align="center" min-width="50%">
      <template #default="scope">
        <div style="display: flex">
          <el-input
            v-model="scope.row.description"
            placeholder="说明"
            size="small"
          />
          <el-divider direction="vertical"></el-divider>
          <el-link
            :icon="CircleCloseFilled"
            type="danger"
            @click="remove(scope.$index)"
          />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import _ from 'lodash'
import { CirclePlusFilled, CircleCloseFilled } from '@element-plus/icons-vue'
const props = defineProps({
  data: {
    type: Array,
    default: function () {
      return [
        {
          name: '',
          in: 'query',
          example: '',
          description: '',
          required: false,
          schema: {
            type: 'string'
          }
        }
      ]
    }
  }
})
const paramList = ref()
paramList.value = props.data

watch(
  () => props.data,
  val => {
    if (_.isEmpty(val)) {
      paramList.value = []
    } else {
      paramList.value = val
    }
  },
  {
    immediate: true,
    deep: true
  }
)

function append() {
  paramList.value.push({
    name: '',
    in: 'query',
    example: '',
    description: '',
    required: false,
    schema: {
      type: 'string'
    }
  })
}
function remove(index: number) {
  paramList.value.splice(index, 1)
}
function getOpenApiData() {
  return paramList.value
}

defineExpose({
  getOpenApiData
})
</script>

<style lang="scss" scoped></style>
