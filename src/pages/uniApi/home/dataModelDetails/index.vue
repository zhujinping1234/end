<template>
  <div>
    <div class="totalPage">
      <div style="display: flex; flex-direction: row; justify-content: center">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          style="padding-top: 20px; margin-left: 10px; width: 70%"
        >
          <el-form-item label="名称:">
            <el-input v-model="param"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="form.region"></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex; flex-direction: row; padding: 40px">
          <el-button
            class="right-side-button"
            type="primary"
            :plain="true"
            @click="updateDataModel"
            >保存</el-button
          >
          <el-button
            class="right-side-button"
            @click="deleteDataModel"
            :plain="true"
            >删除</el-button
          >
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <el-button type="text"
          ><i class="el-icon-upload"></i>/XML智能识别/快捷导入</el-button
        >
        <el-button type="text"><i class="el-icon-view"></i>预览</el-button>
        <el-button type="text"
          ><i class="el-icon-edit-outline"></i>生成代码</el-button
        >
      </div>
      <div style="margin-left: 5%">
        <param-json-tree
          id="responseTree"
          ref="dataModel"
          :data="dataModelDetails"
        ></param-json-tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import paramJsonTree from '@/components/uniApi/paramJsonTree/index.vue'
import { post, get } from '@/utils/axios'
onBeforeRouteUpdate((to, from, next) => {
  param.value = ''
  next()
  param.value = to.params.id as string
  oldName.value = to.params.id as string
  getDataModelDetails(to.params.id as string)
})
const store = useStore()
const router = useRouter()
const route = useRoute()

const props = defineProps({
  data: {
    type: Object
  }
})
const oldName = ref('')
const param = ref('')
const dataModelDetails = ref<any>({})
const form = ref({
  name: '',
  region: ''
})

onMounted(() => {
  getDataModelDetails(route.params.id as any)
  param.value = route.params.id as any
  oldName.value = route.params.id as any
})
function deleteDataModel() {
  post('dataModel/delete', { name: param.value }, true).then(() => {
    store.dispatch('uniApi/pullDataModelMenu')
    router.push({ path: '/home' })
  })
}
const dataModel = ref()
function updateDataModel() {
  post(
    'dataModel/update',
    {
      oldName: oldName.value,
      newName: param.value,
      schema: dataModel.value.getOpenApiData().schema
    },
    true
  ).then(() => {
    store.dispatch('uniApi/pullDataModelMenu')
  })
}
function getDataModelDetails(dataModelName: string) {
  get('dataModel/details', { name: dataModelName }, true).then((res: any) => {
    dataModelDetails.value = {
      schema: res.data
    }
  })
}
</script>

<style>
.totalPage {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
}
.right-side-button {
  display: inline-block;
  width: 80px;
  height: 50px;
}
</style>
