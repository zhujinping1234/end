<template>
  <tool-bar />

  <div class="a" style="display: flex; flex-flow: row; justify-content: space-between">
    <!-- 标签 -->
    <el-tabs
      v-model="compInstanceId"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickrouter"
      style="width: 50%"
    >
      <!-- 每一个标签对应下的内容 -->

      <el-tab-pane v-for="(item, index) in pages" :key="index" :label="item.name" :name="item.id">
      </el-tab-pane>
    </el-tabs>

    <div style="margin-bottom: 20px">
      <!--调用了 饿了吗 ui 库 -->
      <el-button size="small" @click="addTab()"> 添加页面 </el-button>
      <el-button size="small" @click="savepage"> 保存 </el-button>
      <el-button @click="openPreviewWindow">打开预览窗口</el-button>
      <!-- <el-button size="small" @click="savepage1()"> 显示大纲 </el-button>
        <el-button size="small" @click="savepage1()"> 编辑样式 </el-button>
        <el-button size="small" @click="savepage1()"> 属性面板 </el-button> -->
      <span id="teleport-target"></span>
    </div>
  </div>

  <div>
    <area-of-design />
  </div>
</template>

<script setup lang="ts">
  import { provide, readonly, ref, onMounted, reactive, Ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { openPreviewWindow } from '../store/previewer'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import type { ComponentInstnace } from '../model/AppInstanceModel'
  import AreaOfDesign from './AreaOfDesign.vue'
  import ToolBar from './ToolBar.vue'
  import allStore from '../store/stores/StoreAll'

  await allStore.moduleStore().importAppInfo()

  const routers = useRouter()
  // +++++++++++++++++++++++++++++++++
  //  数据区
  //
  // routers.push({ path: '/page/' + routers.currentRoute.value.params.id })

  //  存放 页面 的数据
  const pages: ComponentInstnace[] = reactive(allStore.moduleStore().getPages)

  //设置响应式appInstanceId
  const appInstanceId: Ref<string> = ref(routers.currentRoute.value.params.appInstanceId as string)

  //设置响应式compInstanceId
  const compInstanceId: Ref<string> = ref(
    routers.currentRoute.value.params.componentInstanceId as string
  )

  /**
   *       注入路由跳转函数
   * @param compInstanceId - 需要设计的组件实例ID
   */
  const goto = function (compInstanceId: string): void {
    routers.push({
      name: 'design',
      params: { appInstanceId: appInstanceId.value, componentInstanceId: compInstanceId }
    })
    allStore.moduleStore().nextPage(compInstanceId)

    allStore.panelStore().current = allStore.moduleStore().getCurrentPage
  }
  //当前APP实例的ID 只读响应式Ref<string>
  provide('appInstanceId', readonly(appInstanceId))
  //当前Component实例的ID 只读响应式Ref<string>
  provide('compInstanceId', readonly(compInstanceId))
  //路由跳转到另一个组件实例设计界面的函数 goto(string):void
  provide('goto', goto)

  //  单击保存
  const savepage = () => {
    allStore.moduleStore().saveCurrentPage({
      ComponentInstnace: allStore.panelStore().pageContainer,
      compStyles: allStore.styleStore().StyleData
    })
    ElMessage({
      message: '保存成功',
      type: 'success',
      duration: 1000,
      showClose: true
    })
  }

  //zxd清空name
  allStore.panelStore().CompName = ''

  //-------------------------------------
  //  事件区

  //  单击  添加页面 标签 添加页面功能
  let addTab = () => {
    //  调用弹窗输入添加页面名字
    ElMessageBox.prompt('请输入新建页面名称', 'Tip', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
    })
      .then(({ value }) => {
        ElMessage({
          type: 'success',
          message: `添加  ${value} page 成功`
        })
        //  给vue 传添加的页面属性

        const pageInstance: ComponentInstnace = allStore.moduleStore().getNewPage(value)
        // 添加页面后跳转到新的页面
        goto(pageInstance.id)
        compInstanceId.value = pageInstance.id
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Input canceled'
        })
      })
  }
  // =========================================================
  //
  let removeTab = (pageid: any) => {
    ElMessageBox.confirm('确定要删除此页面吗?', 'Warning！', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(() => {
        // 删除选中的页面
        allStore.moduleStore().delPage(pageid)
        // 删除页面后跳转到第一个页面
        goto('0e8f2c8af85c4a548ebfe9b16dc297ab')
        compInstanceId.value = '0e8f2c8af85c4a548ebfe9b16dc297ab'
        ElMessage({
          type: 'success',
          message: 'Delete completed'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled'
        })
      })
  }
  // ================================================
  //单击页面跳转对应的路由页面
  let clickrouter = (targetName: any) => {
    goto(targetName.props.name)
  }
</script>

<style scoped>
  .box {
    display: flex;
    flex-flow: column;
  }

  .x {
    background: rgb(226, 247, 255);
  }

  .b {
    background-color: black;
  }
</style>
