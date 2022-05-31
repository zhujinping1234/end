<!--
 * @Descripttion: 数据模型菜单
 * @Author: superman
 * @Date: 2021-11-27 16:18:35
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:35:15
-->
<template>
  <div style="height: 100%">
    <div style="display: flex">
      <el-input></el-input>
      <el-button type="primary" @click="addDataModel">+</el-button>
    </div>
    <el-menu
      default-active="defaultActive"
      text-color="#000"
      class="el-menu-vertical-demo"
      style="height: 100%"
    >
      <el-menu-item
        v-for="(item, value, index) in store.state['uniApi/dataModelMenu']"
        :key="index"
        :index="(index! as number).toString()"
        @click=" toDataModelPage((index! as number),value)"
        ><i class="el-icon-folder"></i>{{ value }}</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()

const list = ref('')

const defaultActive = computed(() => {
  return route.path
})
function addDataModel() {
  router.push({
    name: 'addDataModel',
    params: {
      id: 'addDataModel'
    }
  })
}
function toDataModelPage(index: number, dataModel: any) {
  router.push({
    name: 'dataModelDetails',
    params: {
      id: dataModel
    }
  })
}
</script>

<style lang="scss" scoped></style>
