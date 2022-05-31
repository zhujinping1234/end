<template>
  <div>
    <el-dialog title="修改项目" v-model="dialogVisibleAdd" width="40%">
      <el-form ref="form" label-width="80px" :model="updata">
        <el-form-item
          label="项目名"
          prop="title"
          :rules="[
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="版本号">
          <el-input v-model="formLabelAlign.version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="projectUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import type { ElForm } from 'element-plus'
import { post } from '@/utils/axios'

const props = defineProps({
  updata: {
    type: Object
  }
})
const store = useStore()

const dialogVisibleAdd = ref(false)
const formLabelAlign = ref()
formLabelAlign.value = props.updata

const form = ref<InstanceType<typeof ElForm>>()
function projectUpdate() {
  post('/openapi/update', {
    title: formLabelAlign.value.title,
    description: formLabelAlign.value.description,
    version: formLabelAlign.value.version,
    id: formLabelAlign.value.id
  }).then(() => {
    store.dispatch('uniApi/pullProjectList')
    form.value!.resetFields()
  })

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
