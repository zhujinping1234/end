<template>
  <div>
    <el-dialog title="新增项目" v-model="dialogVisibleAdd" width="40%">
      <el-form ref="form" label-width="80px" :model="formLabelAlign">
        <el-form-item
          label="项目名"
          prop="title"
          :rules="[
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="formLabelAlign.version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="projectAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import type { ElForm } from 'element-plus'
import { post } from '@/utils/axios'
const dialogVisibleAdd = ref(false)
const formLabelAlign = ref({
  title: '',
  description: '',
  version: ''
})

const store = useStore()

const form = ref<InstanceType<typeof ElForm>>()
function projectAdd() {
  post('/openapi/create', {
    title: formLabelAlign.value.title,
    description: formLabelAlign.value.description,
    version: formLabelAlign.value.version
  }).then(() => {
    store.dispatch('uniApi/pullProjectList')
  })
  form.value!.resetFields()
  dialogVisibleAdd.value = false
}
function show() {
  dialogVisibleAdd.value = true
}
defineExpose({
  show
})
</script>

<style></style>
