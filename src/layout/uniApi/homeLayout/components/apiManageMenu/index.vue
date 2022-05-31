<!--
 * @Descripttion: 接口管理菜单
 * @Author: superman
 * @Date: 2021-11-27 15:35:29
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 19:44:56
-->
<template>
  <div style="height: 100%">
    <div style="display: flex">
      <el-input v-model="queryMsg" placeholder="请输入查询内容"></el-input>
      <el-button type="primary" @click="apiDialog.show()">+</el-button>
    </div>
    <el-menu :default-active="activeId" style="height: 100%">
      <api-menu-item
        v-for="obj in store.getters['uniApi/getApiMenu']"
        :key="obj.id"
        :index="obj.id"
        :data="obj"
        @click="saveActivePath(obj)"
      />
    </el-menu>
    <add-api-dialog ref="apiDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import addApiDialog from './components/addApiDialog/index.vue'
import apiMenuItem from './components/apiMenuItem/index.vue'

const store = useStore()
const router = useRouter()

const queryMsg = ref('')
const activeId = ref('')

const apiDialog = ref()

activeId.value = window.sessionStorage.getItem('activeId')!

function toApiPage(apiItem: Record<string, string>) {
  router.push({
    name: 'apiManageDetails',
    params: apiItem
  })
}
function saveActivePath(apiItem: Record<string, string>) {
  window.sessionStorage.setItem('activeId', apiItem.id)
  activeId.value = apiItem.id
  window.sessionStorage.setItem('apiItem', JSON.stringify(apiItem))
  toApiPage(apiItem)
}
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  .el-submenu {
    .el-submenu__title {
      padding-left: 6px !important;
    }
    .el-menu-item {
      padding-left: 12px !important;
      padding: 0px;
    }
  }
  .el-menu-item {
    padding: 0px;
    padding-left: 6px !important;
  }
}
</style>
