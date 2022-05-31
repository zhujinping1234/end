<!--
 * @Descripttion: 接口详情管理界面
 * @Author: superman
 * @Date: 2021-11-25 08:18:38
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:18:36
-->
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文档" name="apiInfo"></el-tab-pane>
      <el-tab-pane label="修改文档" name="modifyApi">
        <api-manage-modify :data="apiDetails"></api-manage-modify>
      </el-tab-pane>
      <el-tab-pane label="低级mock" name="mockData">
        <api-manage-mock :data="apiDetails" ref="mockData"></api-manage-mock>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import _ from 'lodash'
import apiManageModify from './components/modifyApi/index.vue'
import apiManageMock from './components/mockData/index.vue'
import { post } from '@/utils/axios'
onBeforeRouteUpdate((to, from, next) => {
  next()
  const params = to.params
  if (params) {
    queryApiItem({
      path: params.path,
      type: params.type
    })
  }
  if (activeName.value !== 'modifyApi') {
    activeName.value = 'modifyApi'
  }
})
const router = useRouter()

const activeName = ref('modifyApi')
const apiDetails = ref({})

const apiItem = JSON.parse(window.sessionStorage.getItem('apiItem')!)
if (_.isEmpty(apiItem)) {
  router.replace({ name: 'home' })
} else {
  queryApiItem({ path: apiItem.path, type: apiItem.type })
}

async function queryApiItem(data: any) {
  const result = await post('paths/item/operation/details', data).then(
    (res: any) => {
      return res.data
    }
  )
  apiDetails.value = result
}
</script>
