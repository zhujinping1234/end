<!--
 * @Descripttion: 添加API弹框
 * @Author: superman
 * @Date: 2021-11-25 15:56:44
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:31:25
-->
<template>
  <el-dialog title="新建接口" v-model="dialogVisible">
    <el-form :model="form" ref="apiInfoForm">
      <el-form-item
        label=""
        prop="type"
        :rules="[{ required: true, message: '请选择类型', trigger: 'blur' }]"
      >
        <el-divider content-position="left">接口类型</el-divider>
        <el-radio-group v-model="form.type" :fill="getRequestColor(form.type)">
          <el-radio-button
            v-for="(val, key, index) in REQUEST_COLOR"
            :key="index"
            :label="key"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label=""
        prop="name"
        :rules="[
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ]"
      >
        <el-divider content-position="left">接口名称</el-divider>
        <el-input v-model="form.name" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item
        label=""
        prop="path"
        :rules="[
          { required: true, message: '请输入请求路径', trigger: 'blur' }
        ]"
      >
        <el-divider content-position="left">接口路径</el-divider>
        <el-input placeholder="请输入接口路径" v-model="form.path" style="">
        </el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide()">取 消</el-button>
        <el-button type="primary" @click="createApi">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { ElForm } from 'element-plus'
import { REQUEST_COLOR, getRequestColor } from '@/constant/uniApi'
import { post } from '@/utils/axios'

const store = useStore()
const router = useRouter()

const form = ref({
  name: '',
  type: '',
  path: '',
  tag: [] as Array<any>
})
const dialogVisible = ref(false)
function show() {
  dialogVisible.value = true
}
function hide() {
  dialogVisible.value = false
}
const apiInfoForm = ref<InstanceType<typeof ElForm>>()
function createApi() {
  apiInfoForm.value!.validate(valid => {
    if (!valid) {
      return
    }
    post('paths/item/operation/create', form.value).then((res: any) => {
      store.dispatch('uniApi/pullApiList')

      // 跳转至新创建的接口
      const id = res.data
      const apiItem = {
        id,
        path: form.value.path,
        summary: form.value.name,
        type: form.value.type
      }
      window.sessionStorage.setItem('apiItem', JSON.stringify(apiItem))
      window.sessionStorage.setItem('activeId', id)
      router.push({
        name: 'apiManageDetails',
        params: {
          id,
          //TODO:any
          apiItem: apiItem as any
        }
      })

      apiInfoForm.value!.resetFields()
      hide()
    })
  })
}
defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped>
.dialog-footer {
  padding: 10px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>
