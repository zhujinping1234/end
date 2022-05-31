<!--
 * @Descripttion: 修改接口信息界面
 * @Author: superman
 * @Date: 2021-11-26 10:35:26
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:19:48
-->
<template>
  <div>
    <div style="display: flex">
      <el-input placeholder="请输入接口路径" v-model="uiData.path">
        <el-select
          class="input-prepend"
          v-model="uiData.type"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option
            v-for="(val, key) in REQUEST_COLOR"
            :key="key"
            :label="key"
            :value="key"
          ></el-option>
        </el-select>
      </el-input>
      <el-divider direction="vertical"></el-divider>
      <el-button type="primary" @click="updateApi">保存</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <p>基本信息</p>
    <el-form inline>
      <el-form-item style="width: 48%">
        <el-input
          v-model="uiData.operation.summary"
          placeholder="请输入接口名称"
        >
          <template slot="prepend">名称</template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 48%">
        <el-select
          v-model="selectedTags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或输入标签"
        >
          <el-option
            v-for="item in store.getters.getAllTagsToSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明:" style="width: 98%">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3 }"
          placeholder="请输入内容"
          v-model="uiData.operation.description"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-link type="primary" @click="sqlImport.show()" :icon="UploadFilled"
        >从SQL导入</el-link
      >
      <el-divider direction="vertical"></el-divider>
      <el-link type="primary" @click="sqlDetails.show()" :icon="View"
        >SQL预览</el-link
      >
      <sql-editor-dialog
        @export="sqlEditorExport"
        ref="sqlImport"
        :key="`sqlImport${new Date().getTime()}`"
        isImport
      />
      <sql-editor-dialog
        ref="sqlDetails"
        :value="sqlSentence"
        :key="`sqlDetails${new Date().getTime()}`"
      />
    </div>
    <p>请求参数</p>
    <el-tabs v-model="activeRequestTab">
      <el-tab-pane label="Params" name="Params">
        <p>Query参数</p>
        <param-list ref="queryList" :data="uiData.operation.parameters" />
      </el-tab-pane>
      <el-tab-pane label="Body" name="Body">
        <el-radio v-model="bodySelected" label="json">json</el-radio>
        <div style="text-align: center; padding: 15px">
          <el-button type="primary" round>数据结构</el-button>
          <el-button type="info" round>示例值</el-button>
        </div>
        <el-card>
          <param-json-tree
            id="postJsonTree"
            ref="postJsonTree"
            :data="requestBodyData"
          ></param-json-tree>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <p>返回&nbsp;Response</p>
    <el-tabs type="border-card">
      <el-tab-pane label="返回Response">
        <param-json-tree
          id="responseTree"
          ref="responseTree"
          :data="responseData"
        ></param-json-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
import paramList from '@/components/uniApi/paramList/index.vue'
import paramJsonTree from '@/components/uniApi/paramJsonTree/index.vue'
import sqlEditorDialog from './components/sqlEditorDialog/index.vue'
import { X_SQL, PARAM_TYPE, REQUEST_COLOR } from '@/constant/uniApi'
import { post } from '@/utils/axios'
import { UploadFilled, View } from '@element-plus/icons-vue'
const store = useStore()
const emit = defineEmits(['update'])

const props = defineProps({
  data: {
    type: Object
  }
})

const path = ref('')
const uiData = ref<any>()
uiData.value = {
  path: '',
  type: '',
  operation: {
    summary: '',
    description: ''
  }
}
const selectedTags = ref<Array<any>>([])
const activeRequestTab = ref('Body')
const bodySelected = ref('json')

const sqlImport = ref()
const queryList = ref()
const postJsonTree = ref()
const responseTree = ref()
function updateApi() {
  const cloneData = _.cloneDeep(uiData.value)
  // 判断是否有填写query
  const parameters = queryList.value.getOpenApiData()
  if (!_.isEmpty(parameters)) {
    cloneData.operation.parameters = parameters
  }
  // 判断是否有填写body/json
  const requestBody = postJsonTree.value.getOpenApiData()
  if (!_.isEmpty(requestBody)) {
    cloneData.operation.requestBody = {
      content: {
        'application/json': requestBody
      }
    }
  } else {
    cloneData.operation = _.omit(cloneData.operation, ['requestBody'])
  }
  // 判断是否有填写返回
  const responseData = responseTree.value.getOpenApiData()
  if (!_.isEmpty(responseData)) {
    cloneData.operation.responses = {
      200: {
        description: '成功',
        content: {
          'application/json': responseData
        }
      }
    }
  }

  cloneData.operation.tags = selectedTags.value

  // 如果界面上没有做任何修改，那么不去发修改请求
  if (_.isEqual(props.data, cloneData)) {
    return
  }

  post('paths/item/operation/update', cloneData, true).then(() => {
    store.dispatch('uniApi/pullApiList')
    store.dispatch('uniApi/pullAllTags')
    emit('update', uiData.value)
  })
}
function sqlEditorExport(beforePrase: any, formatVal: any) {
  if (uiData.value.type === 'get') {
    uiData.value.operation.parameters = formatVal.request.get
  } else {
    uiData.value.operation.requestBody = {
      content: {
        'application/json': formatVal.request.other
      }
    }
  }
  // 赋值response
  uiData.value.operation.responses = {
    200: {
      content: {
        'application/json': formatVal.response
      }
    }
  }
  uiData.value.operation.extensions = {
    [X_SQL]: beforePrase
  }
}
const sqlDetails = ref()
function showSqlDetails() {
  sqlDetails.value.show(uiData.value.operation.extensions[X_SQL])
}
//为了适配多种格式，所以预先写成计算属性,以及为空的判断
const requestBodyData = computed(() => {
  if (_.isEmpty(uiData.value.operation.requestBody)) {
    return {}
  } else {
    const schemaData =
      uiData.value.operation.requestBody.content['application/json']
    return schemaData
  }
})
const responseData = computed(() => {
  if (_.isEmpty(uiData.value.operation.responses)) {
    return {}
  } else {
    const responseData =
      uiData.value.operation.responses['200'].content['application/json']
    return responseData
  }
})
const sqlSentence = computed(() => {
  if (
    uiData.value.operation.extensions &&
    uiData.value.operation.extensions[X_SQL]
  ) {
    return uiData.value.operation.extensions[X_SQL]
  } else {
    return ''
  }
})
watch(
  () => props.data,
  val => {
    uiData.value = _.cloneDeep(val)
    selectedTags.value = uiData.value.operation.tags
    activeRequestTab.value = uiData.value.type === 'get' ? 'Params' : 'Body'
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.input-prepend:deep(.el-select) {
  .el-input {
    width: 130px;
  }
}
:deep(.el-select) {
  width: 100%;
}
:deep(.input-with-select) {
  .el-input-group__prepend {
    background-color: #fff;
  }
}
:deep(.el-form-item) {
  padding: 5px;
  .el-form-item__content {
    width: 100%;
  }
}
</style>
