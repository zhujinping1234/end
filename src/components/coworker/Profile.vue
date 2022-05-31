<template>
  <!--

        个人相关操作：
        退出登录、
        退出团队
        个人信息
        邀请、成员管理



  -->
  <div style="position: fixed;right: 10px;">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar :size="50" :src="circleUrl" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            command="yaoqing"
            v-show="isAdmin"
            divided
            @click="dialogVisible = true"
          >邀请成员</el-dropdown-item>
          <el-dropdown-item command="e" v-show="isAdmin" @click="torouter()">成员管理</el-dropdown-item>
          <el-dropdown-item command="b">退出团队</el-dropdown-item>
          <el-dropdown-item command="c">个人信息</el-dropdown-item>
          <el-dropdown-item command="a"   @click="quit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <!-- 隐藏的弹窗 -->
  <InviteMember v-model="dialogVisible" @on-close="onClose"></InviteMember>
</template>

<script lang="ts" setup>
import InviteMember from './InviteMember.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useStore } from './store'
import router from '../../router'

const isAdmin = ref(useStore().isAdmin);

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const handleCommand = (command: string) => {
  if (command == 'yaoqing') {
    router.push('/home/eduardo')
  }

}

const torouter = () => {
  router.push({ name: 'teamMember', params: { teamid: 'team1' } })
}
//退出
const quit = () => {
  router.push('/');
}
//隐藏弹窗功能
const dialogVisible = ref<boolean>(false)
const onClose = () => {
  dialogVisible.value = false
}

</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>