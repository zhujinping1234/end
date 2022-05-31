<template>
  <div>
    <div class="navbar">
      <div class="left">
        <span style="color: white"
          ><el-icon class="is-loading"><chicken /></el-icon
        ></span>
      </div>
      <div class="right">
        <el-button type="primary" round @click="releaseRecord()">发布记录</el-button>
        <el-button type="primary" round @click="DialogVisible.projectDialogVisible = true"
          >添加项目</el-button
        >
        <el-dialog
          v-model="DialogVisible.projectDialogVisible"
          title="添加项目"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :label-position="labelPosition"
            ref="formRef"
            :model="addModel.projectForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="name"
              prop="name"
              :rules="[
                { required: true, message: 'name is required' },
                { type: 'number', message: 'name must be a number' }
              ]"
            >
              <el-input v-model.number="addModel.projectForm.name" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="msg">
              <el-input v-model="addModel.projectForm.msg" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="DialogVisible.projectDialogVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click=";(DialogVisible.projectDialogVisible = false), submitProjectMsg()"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
        <el-button
          type="primary"
          round
          @click="DialogVisible.organizationDialogVisible = true"
          style="margin-left: 10px"
          >添加组织</el-button
        >
        <el-dialog
          v-model="DialogVisible.organizationDialogVisible"
          title="添加组织"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :label-position="labelPosition"
            ref="formRef"
            :model="addModel.organizationForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="name"
              prop="name"
              :rules="[
                { required: true, message: 'name is required' },
                { type: 'number', message: 'name must be a number' }
              ]"
            >
              <el-input
                v-model.number="addModel.organizationForm.name"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="msg">
              <el-input v-model="addModel.organizationForm.msg" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="DialogVisible.organizationDialogVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click=";(DialogVisible.organizationDialogVisible = false), submitOrganizationMsg()"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
        <!-- 修改项目信息的对话框 -->
        <el-dialog
          v-model="DialogVisible.modifyProjectDialogVisible"
          title="修改项目信息"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :label-position="labelPosition"
            ref="formRef"
            :model="addModel.modifyProjectForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="name"
              prop="name"
              :rules="[
                { required: true, message: 'name is required' },
                { type: 'number', message: 'name must be a number' }
              ]"
            >
              <el-input
                v-model.number="addModel.modifyProjectForm.name"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="msg">
              <el-input v-model="addModel.modifyProjectForm.msg" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="DialogVisible.modifyProjectDialogVisible = false"
                >Cancel</el-button
              >
              <el-button
                type="primary"
                @click=";(DialogVisible.modifyProjectDialogVisible = false), submitModifyProject()"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
        <el-dropdown
          class="nav-menu"
          @command="handleCommand"
          @visible-change="visibleChange($event)"
        >
          <div class="avatar-wrapper">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span style="margin: 0 10px; color: white">{{ userMsg.name }}</span>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, i) in organization" :key="i" :command="item.id">{{
                item.name
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Msg" prop="msg" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            v-show="scope.row.projectRole == 'PROJECT_OWNER' ? true : false"
            >管理</el-button
          >
          <el-button size="small" type="danger" @click="handleDesign(scope.$index, scope.row)"
            >设计</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="
              ;(DialogVisible.modifyProjectDialogVisible = true),
                handleModify(scope.$index, scope.row)
            "
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageMsg.pagenum"
        :page-size="pageMsg.pagesize"
        background
        layout="prev, pager, next"
        :total="pageMsg.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, onMounted, Ref } from 'vue'
  import { Chicken, Check } from '@element-plus/icons-vue'
  import { ElMessageBox } from 'element-plus'
  import { post, get } from '../../axios/index'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  interface userMsg {
    id: number
    name: string
    username: string
    phone: string
    createTime: string
    updateTime: string
  }
  let userMsg: Ref<userMsg> = ref({
    id: 0,
    name: '',
    username: '',
    phone: '',
    createTime: '',
    updateTime: ''
  })
  const addModel = reactive({
    projectForm: { name: '', msg: '' },
    organizationForm: { name: '', msg: '' },
    modifyProjectForm: { name: '', msg: '' }
  })
  const labelPosition = ref('top')
  interface organization {
    id: number
    name: string
  }
  let organization: Ref<organization[]> = ref([])
  interface User {
    id: number
    name: string
    msg: string
    projectRole: string
    organizationId: number
    organizationName: string
    updateTime: number
  }
  //饿了吗这个属性没有ref会导致视图不更新，需要加上
  let tableData: Ref<User[]> = ref([])
  const search = ref('')
  const filterTableData = computed(() =>
    tableData.value.filter(
      (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  //let defaultOrganizationId = ref()
  let organizationId = 0
  const handleEdit = (index: number, row: User) => {
    console.log(index, row)
    router.push({ path: '/Collaborators', query: { projectId: row.id } })
  }
  const handleDesign = (index: number, row: User) => {
    router.push({ path:`/app/${row.id}/design/0e8f2c8af85c4a548ebfe9b16dc297ab`})
  }

  onMounted(() => {
    asyncToSynchro()
  })

  async function asyncToSynchro() {
    await get('user/me').then((res: any) => {
      userMsg.value = res.data
    })
    await get('user/organization').then((res: any) => {
      const organizationList = res.data
      organizationList.forEach((item: organizationObject) => {
        if (item.name == userMsg.value.name) {
          organizationId = item.id
        }
      })
    })

    await RefreshLoadProject()
    // await getPlatformAdminList()
  }

  const RefreshLoadUserMsg = () => {}

  interface projectList {
    page: number
    size: number
    organizationId: number
  }
  const RefreshLoadProjectList = (params: projectList) => {
    get('project/page', params).then((res: any) => {
      tableData.value = res.data.list
      pageMsg.total = res.data.total
    })
  }

  interface organizationObject {
    id: number
    name: string
  }

  const getOrganizationDefaultId = () => {}

  const RefreshLoadProject = () => {
    //获取默认的同名组织id
    //getOrganizationDefaultId()
    const params = {
      page: pageMsg.pagenum,
      size: pageMsg.pagesize,
      organizationId: organizationId
    }
    RefreshLoadProjectList(params)
  }

  const pageMsg = reactive({
    // 当前的页数
    pagenum: 1,
    // 当前每页显示的数量
    pagesize: 10,
    //总条目数
    total: 0
  })
  const getPlatformAdminList = () => {
    const params = {
      page: pageMsg.pagenum,
      size: pageMsg.pagesize,
      organizationId: organizationId
    }

    RefreshLoadProjectList(params)
  }
  const handleSizeChange = (newSize: any) => {
    pageMsg.pagesize = newSize
    getPlatformAdminList()
  }
  const handleCurrentChange = (newNum: any) => {
    pageMsg.pagenum = newNum
    getPlatformAdminList()
  }

  const DialogVisible = reactive({
    projectDialogVisible: false,
    organizationDialogVisible: false,
    modifyProjectDialogVisible: false
  })
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
  //添加项目
  const submitProjectMsg = () => {
    let addProjec = {
      name: addModel.projectForm.name,
      msg: addModel.projectForm.msg,
      organizationId: organizationId
    }
    post('project/create', addProjec).then((res: any) => {})
    //不用sleep查询会有问题
    setTimeout(function () {
      const params = {
        page: pageMsg.pagenum,
        size: pageMsg.pagesize,
        organizationId: organizationId
      }
      RefreshLoadProjectList(params)
    }, 10)
  }
  //添加组织
  const submitOrganizationMsg = () => {
    post('organization/create', addModel.organizationForm).then((res: any) => {})
  }
  //点击下拉菜单项目触发
  const handleCommand = (command: number) => {
    organizationId = command
    const params = {
      page: pageMsg.pagenum,
      size: pageMsg.pagesize,
      organizationId: command
    }
    RefreshLoadProjectList(params)
  }
  const visibleChange = (e: any) => {
    if (e) {
      get('user/organization').then((res: any) => {
        organization.value = res.data
      })
    }
  }

  const releaseRecord = () => {
    router.push({ path: '/ReleaseRecord', query: { organizationId: organizationId } })
    // router.push('/ReleaseRecord')
  }

  const handleModify = (index: number, row: User) => {
    //console.log(row, '项目信息')
    let projectMsg = { id: row.id, name: row.name, msg: row.msg }
    addModel.modifyProjectForm = projectMsg
  }
  //提交修改项目信息
  const submitModifyProject = () => {
    post('project/update', addModel.modifyProjectForm).then((res: any) => {
      //console.log(res)
    })

    //不用sleep查询会有问题
    setTimeout(function () {
      const params = {
        page: pageMsg.pagenum,
        size: pageMsg.pagesize,
        organizationId: organizationId
      }
      RefreshLoadProjectList(params)
    }, 10)
  }
</script>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 70px;
    background-color: black;
    align-items: center;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
  }
  .nav-menu {
    cursor: pointer;
    margin: 0 10px;
  }
  .paging {
    margin-top: 5px;
    display: flex;
    justify-content: center;
  }
  .right {
    display: flex;
    justify-content: center;
  }
</style>
