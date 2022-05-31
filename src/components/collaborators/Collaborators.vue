<template>
  <div class="add-people">
    <span style="font-size: 20px">Manage access</span>
    <el-button type="primary" round @click="dialogVisible = true">Add people</el-button>
    <el-dialog v-model="dialogVisible" title="添加成员" width="30%" :before-close="handleClose">
      <el-form
        :label-position="labelPosition"
        ref="formRef"
        :model="addModel.peopleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="phone"
          prop="phone"
          :rules="[
            { required: true, message: 'phone is required' },
            { type: 'number', message: 'phone must be a number' }
          ]"
        >
          <el-input v-model.number="addModel.peopleForm.phone" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户权限" prop="role">
          <el-select v-model="addModel.peopleForm.role" placeholder="项目协助者">
            <el-option label="项目协助者" value="PROJECT_OWNER" />
            <el-option label="项目浏览者" value="PROJECT_WRITER" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click=";(dialogVisible = false), addPeople()"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改项目用户角色 -->
    <el-dialog
      v-model="DialogVisible.modifyProjectUserDialogVisible"
      title="修改用户权限"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :label-position="labelPosition"
        ref="formRef"
        :model="addModel.modifyPeopleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户权限" prop="role">
          <el-select v-model="addModel.modifyPeopleForm.role" placeholder="项目协助者">
            <el-option label="项目协助者" value="PROJECT_OWNER" />
            <el-option label="项目浏览者" value="PROJECT_WRITER" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible.modifyProjectUserDialogVisible = false"
            >Cancel</el-button
          >
          <el-button
            type="primary"
            @click="
              ;(DialogVisible.modifyProjectUserDialogVisible = false), submitModifyProjectUserRole()
            "
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
  <el-table :data="filterTableData" style="width: 100%; margin-top: 20px">
    <el-table-column label="Name" prop="name" />
    <el-table-column label="ProjectRole" prop="projectRole" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="
            ;(DialogVisible.modifyProjectUserDialogVisible = true),
              handleDelete(scope.$index, scope.row)
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
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, reactive, Ref } from 'vue'
  import { ElMessageBox } from 'element-plus'
  import { post, get } from '../../axios/index'
  import { useRoute } from 'vue-router'

  let route = useRoute()
  const search = ref('')
  const filterTableData = computed(() =>
    tableData.value.filter(
      (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  const DialogVisible = reactive({
    modifyProjectUserDialogVisible: false
  })
  interface User {
    userId: string
    name: string
    projectRole: string
    relationId: string
  }
  const handleDelete = (index: number, row: User) => {
    let projectMsg = { role: row.projectRole, relationId: row.relationId }
    addModel.modifyPeopleForm = projectMsg
  }

  const submitModifyProjectUserRole = () => {
    post('project/user/update', addModel.modifyPeopleForm).then((res: any) => {})

    setTimeout(function () {
      getProjectMember()
    }, 100)
  }

  const tableData: Ref<User[]> = ref([])

  onMounted(() => {
    getProjectMember()
    // getPlatformAdminList()
  })
  const pageMsg = reactive({
    // 当前的页数
    pagenum: 1,
    // 当前每页显示的数量
    pagesize: 5,
    //总条目数
    total: 0
  })

  const getProjectMember = () => {
    const params = {
      page: pageMsg.pagenum,
      size: pageMsg.pagesize,
      projectId: route.query.projectId
    }
    get('project/user/page', params).then((res: any) => {
      tableData.value = res.data.list
      pageMsg.total = res.data.total
    })
  }
  const getPlatformAdminList = () => {
    getProjectMember()
  }

  const handleSizeChange = (newSize: number) => {
    pageMsg.pagesize = newSize
    getPlatformAdminList()
  }
  const handleCurrentChange = (newNum: number) => {
    pageMsg.pagenum = newNum
    getPlatformAdminList()
  }

  const dialogVisible = ref(false)

  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }

  const labelPosition = ref('top')
  const addModel = reactive({
    peopleForm: { phone: '', role: '' },
    modifyPeopleForm: { role: '' }
  })

  const addPeople = () => {
    let addProjectUser = {
      phone: addModel.peopleForm.phone,
      role: addModel.peopleForm.role,
      projectId: route.query.projectId
    }
    //console.log(addProjectUser)

    post('project/user/add', addProjectUser).then((res) => {})

    setTimeout(function () {
      getProjectMember()
    }, 100)
  }
</script>

<style scoped>
  .add-people {
    display: flex;
    justify-content: space-between;
  }
  .paging {
    margin-top: 5px;
    display: flex;
    justify-content: center;
  }
</style>
