<template>
  <div class="flex flex-wrap items-center">
    <el-dropdown @command="handleCommand" >
      <el-button type="primary">
        团队<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in teams" :command="item.id">{{item.name}}</el-dropdown-item>
         
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'


import {useStore} from './store'

const teams=useStore().teams;

const handleCommand = (teamid: string | number | object) => {

useStore().switchTeam(teamid);


}


</script>
<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: inline-flex;
  align-items: center;
}
</style>