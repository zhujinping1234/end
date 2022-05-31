<template>
  <div>
    <el-dialog
      title="项目名"
      v-model="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="团队项目" name="first">
          <el-row style="display: flex; justify-content: flex-end">
            <el-button type="primary" plain @click="dialogAdd"
              >+ 新建项目</el-button
            >
          </el-row>
          <el-table
            :show-header="false"
            class="table"
            @row-click="handleClick"
            :data="store.state.uniApi.projectList"
            height="285"
          >
            <el-table-column>
              <template #default="scope">
                <el-icon><expand /></el-icon>
                <span
                  style="display: inline-block; margin-left: 10px; width: 80%"
                >
                  {{ scope.row.title }}
                </span>
                <el-icon><share /></el-icon>
                <el-icon><star-filled /></el-icon>

                <el-popover
                  placement="bottom-start"
                  width="100"
                  trigger="hover"
                >
                  <el-button
                    type="text"
                    style="padding-left: 25%"
                    @click="
                      dialogUpdate(
                        scope.row.title,
                        scope.row.id,
                        scope.row.description,
                        scope.row.version
                      )
                    "
                    ><i class="el-icon-edit"></i>修改名称</el-button
                  >
                  <el-button
                    type="text"
                    style="display: block; padding-left: 20%"
                    @click="dialogdelete(scope.row.id)"
                    ><i class="el-icon-delete"></i>删除项目</el-button
                  >
                  <el-button
                    type="text"
                    style="display: block; padding-left: 20%"
                    @click="dialogImport(scope.row.id)"
                    ><i class="el-icon-delete"></i>导入数据</el-button
                  >
                  <template #reference>
                    <el-link>
                      <el-icon><more-filled /></el-icon>
                    </el-link>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="成员/权限" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="团队设置" name="third">角色管理</el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <project-add ref="add"></project-add>
    <project-update :updata="dialogUpdata" ref="update"></project-update>
    <import-project
      ref="importProjectRef"
      :importData="importData"
    ></import-project>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import projectAdd from './components/projectAdd/index.vue'
import projectUpdate from './components/projectUpdate/index.vue'
import importProject from './components/importProject/index.vue'
import { request } from '@/utils/axios'
import { Expand, Share, StarFilled, MoreFilled } from '@element-plus/icons-vue'
const emit = defineEmits(['func'])
const store = useStore()
const router = useRouter()

const title = ref('项目')
const dialogUpdata = ref<any>()
const activeName = ref('first')
const dialogVisible = ref(false)
const importData = ref('')

store.dispatch('uniApi/pullProjectList')

function show() {
  dialogVisible.value = true
}
function hide() {
  dialogVisible.value = false
}
function handleClick(row: any) {
  window.localStorage.setItem('projectId', row.id)
  window.localStorage.setItem('projectName', row.title)
  title.value = row.title
  dialogVisible.value = false
  emit('func', title.value)
  // 根据所选ID，拉取数据
  if (router.currentRoute.value.name !== 'uniApiHome') {
    router.replace({ name: 'uniApiHome' })
  }
  store.dispatch('uniApi/pullApiList')
  store.dispatch('uniApi/pullAllTags')
  store.dispatch('uniApi/pullDataModelMenu')
}
const add = ref<any>()
function dialogAdd() {
  add.value.show()
}
const update = ref<any>()
function dialogUpdate(
  title: string,
  id: string,
  description: string,
  version: string
) {
  dialogUpdata.value.title = title
  dialogUpdata.value.id = id
  dialogUpdata.value.description = description
  dialogUpdata.value.version = version
  update.value.show()
}
function dialogdelete(id: any) {
  request(
    {
      url: 'openapi/delete',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        id
      }
    },
    true
  ).then(() => {
    store.dispatch('uniApi/pullProjectList')
  })
}
const importProjectRef = ref()
function dialogImport(id: any) {
  importData.value = id
  importProjectRef.value.show()
}

defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped>
i {
  margin-right: 15px;
}
.table {
  cursor: pointer;
  margin-top: 10px;
}
</style>
