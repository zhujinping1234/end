<!--
 * @Descripttion: 主页框架
 * @Author: superman
 * @Date: 2021-11-24 14:58:28
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:34:46
-->
<template>
  <el-container style="height: 100%">
    <el-aside style="max-width: 350px">
      <el-button
        class="projectButton"
        type="text"
        @click="projectManageDialogRef.show()"
      >
        <el-icon><Menu /></el-icon>
        {{ projectName }}
        <el-icon><caret-bottom /></el-icon>
      </el-button>
      <project-manage-dialog
        ref="projectManageDialogRef"
        @func="getMsgFormSon"
      ></project-manage-dialog>
      <api-manage-menu v-show="radio === 'api'"></api-manage-menu>
      <data-model-menu v-show="radio === 'model'"></data-model-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-container">
          <el-radio-group v-model="radio" @change="changeMenuType">
            <el-radio-button label="api">
              <el-icon><orange /></el-icon>
              接口管理
            </el-radio-button>
            <el-radio-button label="model">
              <el-icon><copy-document /></el-icon>
              数据模型
            </el-radio-button>
            <el-radio-button label="setting">
              <el-icon><cpu /></el-icon>
              项目设置
            </el-radio-button>
          </el-radio-group>
          <div class="content-end">
            <el-tooltip content="生成数据-Mybatis" effect="light">
              <el-button
                type="primary"
                :icon="Coin"
                @click="createMybatisData"
              />
            </el-tooltip>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import _ from 'lodash'
import { getSqlForMybatis, getSqlParams } from '@/utils/uniApi'
import { X_SQL } from '@/constant/uniApi'
import apiManageMenu from './components/apiManageMenu/index.vue'
import dataModelMenu from './components/dataModelMenu/index.vue'
import projectManageDialog from './components/projectManageDialog/index.vue'
import {
  Menu,
  CaretBottom,
  Coin,
  Orange,
  CopyDocument,
  Cpu
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const store = useStore()
const route = useRoute()
const router = useRouter()

const projectName = ref('Uni-Api')
const radio = ref('api')

const projectManageDialogRef = ref()

initProject()
async function initProject() {
  const selectedRadio = window.sessionStorage.getItem('selectedRadio')
  if (selectedRadio) {
    radio.value = selectedRadio
  }
  const projectId = window.localStorage.getItem('projectId')
  const localProjectName =
    window.localStorage.getItem('projectName') || 'Uni-Api'
  if (projectId) {
    projectName.value = localProjectName
    await store.dispatch('uniApi/pullAllTags')
    await store.dispatch('uniApi/pullApiList')
    await store.dispatch('uniApi/pullDataModelMenu')
  }
}
function changeMenuType(selectedRadio: any) {
  window.sessionStorage.setItem('selectedRadio', selectedRadio)
  if (route.name !== 'uniApiHome') {
    router.replace({ name: 'uniApiHome' })
  }
}
function getMsgFormSon(data: any) {
  projectName.value = data
}
function createMybatisData() {
  const list: Array<any> = []
  store.getters['uniApi/getApiMenu'].forEach((menuItem: any) => {
    if (!menuItem[X_SQL]) return
    const params: Array<any> = []
    const sql = getSqlForMybatis(menuItem[X_SQL])
    const sqlParams = getSqlParams(menuItem[X_SQL])
    sqlParams.forEach(param => {
      params.push({
        name: param.name,
        type: _.upperFirst(param.type)
      })
    })
    list.push({
      sql,
      params: !_.isEmpty(params) ? params : null
    })
  })
  console.warn('Mybatis:', list)
  ElMessage({
    message: '请在控制台查看打印信息',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped>
.projectButton {
  width: 100%;
}
.el-icon-menu {
  margin-right: 6px;
}
.el-icon-caret-bottom {
  margin-left: 6px;
}
.header-container {
  padding: 5px 0px;
  display: flex;
  .content-end {
    margin-left: auto;
  }
}
</style>
