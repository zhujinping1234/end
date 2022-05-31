<template>
  <!--
成员管理界面
列表（含成员账号，昵称，状态（等待接受邀请、正常），设置等列）
设置成员角色（含团队角色和项目角色）
可以移除成员
    -->
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="成员" prop="name" />
    <el-table-column label="备注" prop="data" />
    <el-table-column label="状态" prop="status" />
    <el-table-column label="权限" prop="name" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="dialogVisible = true">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 我是隐藏弹窗 -->
  <MemberRoleAdmin v-if="dialogVisible" @on-close="onClose"></MemberRoleAdmin>
</template>

<script lang="ts" setup>
  import MemberRoleAdmin from './MemberRoleAdmin.vue'
  import { computed, ref } from 'vue'
  import { useStore } from './store'

//定义成员属性
  interface MemberAdmin {
    id: number
    name: string
    data: string
    memberAdmintRole: string
    updateTime: number
  }
  //隐藏弹窗功能
  const dialogVisible = ref<boolean>(false)
  const onClose = () => {
    dialogVisible.value = false
  }


  

//
  const search = ref('')
  const filterTableData = computed(() =>
    tableData.filter(
      (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  const handleEdit = (index: number, row: MemberAdmin) => {
    console.log(index, row)
  }
  const handleDelete = (index: number, row: MemberAdmin) => {
    console.log(index, row)
  }

  const tableData: MemberAdmin[] = useStore().memberAdminListOfCurrentTeam
</script>
