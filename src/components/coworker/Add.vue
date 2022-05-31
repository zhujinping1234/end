<template>
<div class="btn">
<el-button type="primary" plain @click="add()">添加</el-button>
</div>

  <el-dialog v-model="dialogVisible" title="添加" width="30%" >
    <span> 请输入团队名</span>
    <el-input v-model="input" placeholder="Please input" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="Confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
    
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const input = ref()

  const Cancel = () => {
     dialogVisible.value = false

  }
  const Confirm = () => {
   
    dialogVisible.value = false

  }
  const add=()=>{
     dialogVisible.value = true
  }
</script>
<style>
.btn{
   position: fixed;
   left: 120px;
}


</style>