<template>
  <!--
查找到某成员，并确定邀请

反馈结果
- 已邀请
- 不存在
- 已是项目成员

    -->
  <!-- 对话框界面 -->

  <el-dialog v-model="dialogVisibled" title="邀请" width="30%" @close="Cancel">
    <span> 请输入邀请id</span>
    <el-input v-model="input" placeholder="Please input" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="Confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- //修改权限弹窗功能 -->
  <MemberRoleAdmin v-if="dialogVisible" @on-close="onClose"></MemberRoleAdmin>
</template>

<script lang="ts" setup>
  import MemberRoleAdmin from './MemberRoleAdmin.vue'
  import { ref, watch } from 'vue'
  import { ElMessageBox } from 'element-plus'
  //   输入框
  const input = ref('')
  // 接受父组件的值
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })
  const Cancel = () => {
    dialogVisibled.value = false
    emit('onClose')
  }
  const Confirm = () => {
    dialogVisibled.value = false
    dialogVisible.value = true
    emit('onClose')
  }
  //回调父组件隐藏弹窗
  const emit = defineEmits(['onClose'])

  const dialogVisibled = ref(props.modelValue)
  // 监听父组件的值
  watch(
    () => props.modelValue,
    () => {
      dialogVisibled.value = props.modelValue
    }
  )

  //隐藏修改权限弹窗功能
  const dialogVisible = ref<boolean>(false)
  const onClose = () => {
    dialogVisible.value = false
  }
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
