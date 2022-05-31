<template>
  <div>
    <div class="totalPage">
      <div style="display: flex; flex-direction: row">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          style="padding-top: 20px; margin-left: 59.4px; width: 70%"
        >
          <el-form-item label="名称:">
            <el-input v-model="param"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="form.region"></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex; flex-direction: row; padding: 40px">
          <el-button type="primary" class="right-side-button" @click="add"
            >保存</el-button
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
          ref="dataModelJsonTree"
          :data="responseData"
        ></param-json-tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import paramJsonTree from '@/components/uniApi/paramJsonTree/index.vue'
import { post } from '@/utils/axios'
const store = useStore()
const router = useRouter()

const props = defineProps({
  data: {
    type: Object
  }
})

const param = ref('')
const responseData = ref({})
const form = ref({
  name: '',
  region: ''
})
// 添加时，paramTreeJson不能为空。
const dataModelJsonTree = ref()
function add() {
  post('dataModel/create', {
    name: param.value,
    schema: dataModelJsonTree.value.getOpenApiData().schema
  }).then(res => {
    store.dispatch('uniApi/pullDataModelMenu')
    router.push({
      name: 'dataModelDetails',
      params: {
        id: param.value
      }
    })
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
