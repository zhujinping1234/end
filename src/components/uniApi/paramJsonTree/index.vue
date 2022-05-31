<!--
 * @Descripttion: 树形json参数列表
 * @Author: superman
 * @Date: 2021-11-30 09:21:12
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 10:01:32
-->
<template>
  <el-tree
    :data="treeData"
    :node-key="id"
    default-expand-all
    :expand-on-click-node="false"
  >
    <template #default="{ node, data }">
      <!-- 参数名 -->
      <el-input
        v-model="data.paramName"
        style="width: 30%"
        size="small"
        :disabled="node.level === 1"
      />
      <el-divider direction="vertical" />
      <el-tooltip effect="dark" content="是否必需" placement="top">
        <el-checkbox v-model="data.isRequired" />
      </el-tooltip>
      <!-- 数据类型选择框 -->
      <el-divider direction="vertical" />
      <el-cascader
        v-model="data.selectType"
        :options="cascaderOptions"
        placeholder="请选择"
        :props="{ expandTrigger: 'hover' }"
        style="width: 15%"
        size="small"
      />
      <el-divider direction="vertical" />
      <el-tooltip effect="dark" content="允许NULL" placement="top">
        <el-checkbox v-model="data.nullable" size="small" />
      </el-tooltip>
      <!-- 中文名与说明 -->
      <el-divider direction="vertical" />
      <el-input
        v-model="data.title"
        style="width: 10%"
        size="small"
        :disabled="node.level === 1"
        placeholder="名称"
      />
      <el-input
        v-model="data.description"
        style="width: 30%"
        size="small"
        :disabled="node.level === 1"
        placeholder="说明"
      />
      <!-- 删除与添加 -->
      <span v-if="allowAppend(data)">
        <el-divider direction="vertical" />
        <el-tooltip effect="dark" content="添加子节点" placement="top">
          <el-link
            :icon="CirclePlusFilled"
            type="primary"
            @click="append(data)"
          />
        </el-tooltip>
      </span>

      <span v-if="node.level > 1">
        <el-divider direction="vertical" />

        <el-link
          :icon="CircleCloseFilled"
          type="danger"
          @click="remove(node, data)"
        />
      </span>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { PARAM_TYPE } from '@/constant/uniApi'
import _ from 'lodash'
import { CirclePlusFilled, CircleCloseFilled } from '@element-plus/icons-vue'

const store = useStore()
let step = 0
const DATA_MODEL_MENU = 'DATA_MODEL_MENU'
const DATA_MODEL_PATH = '#/components/schemas/'
const props = defineProps({
  data: {
    type: Object,
    default: function () {
      return {
        '': {
          type: PARAM_TYPE.object,
          properties: {}
        }
      }
    }
  },
  id: {
    type: String,
    required: true
  }
})
// const treeData : Ref<Array<any>> = ref([] as any)
const treeData = ref<any[]>([])
treeData.value = []
watch(
  () => props.data,
  val => {
    if (_.isEmpty(val) || _.isEmpty(val.schema)) {
      treeData.value = formatOpenApiToTree({
        '': {
          type: PARAM_TYPE.object,
          properties: {}
        }
      })
    } else {
      treeData.value = formatOpenApiToTree({
        '': val.schema
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)
// 一级选项为类型，二级为数据模型
const cascaderOptions = computed(() => {
  const options = []
  for (const key in PARAM_TYPE) {
    options.push({
      value: key,
      label: key
    })
  }
  const dataModelObj = {
    value: DATA_MODEL_MENU,
    label: '数据模型',
    children: [] as any
  }
  for (const key in store.state.dataModelMenu) {
    dataModelObj.children.push({
      value: key,
      label: key
    })
  }
  options.push(dataModelObj)
  return options
})
/**
 * @name:
 * @description: 如果该行是数组或对象，则允许添加子项
 * @param {*} data
 * @return {*}
 */
function allowAppend(data: any) {
  if (data.selectType[0] === PARAM_TYPE.array && data.children.length === 0) {
    return true
  } else if (data.selectType[0] === PARAM_TYPE.object) {
    return true
  }
  return false
}
function append(data: any) {
  const newChild = {
    id: step++,
    label: '',
    paramName: data.selectType[0] == PARAM_TYPE.array ? 'items' : '',
    isRequired: false,
    selectType: [PARAM_TYPE.string],
    nullable: false,
    title: '',
    description: '',
    children: []
  }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  treeData.value = [...treeData.value]
}
function remove(node: any, data: any) {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d: any) => d.label === data.label)
  children.splice(index, 1)
  treeData.value = [...treeData.value]
}
/**
 * @name:将传入的data（openApi）转换为树形列表的数据
 * @description: 循环的key为参数名
 * @param {*} beforeData
 * @param {*} formatObj
 * @return {*}
 */
function formatOpenApiToTree(beforeData: any, formatArr: Array<any> = []) {
  for (const key in beforeData) {
    const openApiItem = beforeData[key]
    const newObj = getTreeObj(key, openApiItem)
    formatArr.push(newObj)
    if (openApiItem.properties) {
      formatOpenApiToTree(
        openApiItem.properties,
        formatArr[formatArr.length - 1].children
      )
    } else if (openApiItem.items) {
      // 如果数组中还有对象或数组
      if (openApiItem.items.properties || openApiItem.items.items) {
        formatOpenApiToTree(
          { items: openApiItem.items },
          formatArr[formatArr.length - 1].children
        )
      } else {
        formatArr[formatArr.length - 1].children.push(
          getTreeObj('items', openApiItem.items)
        )
      }
    }
  }
  return formatArr
}
/**
 * @name:
 * @description: 将生成树形对象的逻辑抽出
 * @param {*} openApiItem
 * @return {*}
 */
function getTreeObj(key: any, openApiItem: any) {
  var isRequired = false
  if (!_.isEmpty(openApiItem.required)) {
    if (_.indexOf(openApiItem.required, key) !== -1) {
      isRequired = true
    }
  }
  let selectType = [openApiItem.type]
  if (openApiItem.$ref) {
    selectType = []
    selectType.push(DATA_MODEL_MENU)
    let dataModelName = openApiItem.$ref.split('/')
    dataModelName = dataModelName[dataModelName.length - 1]
    selectType.push(dataModelName)
  }
  const treeObj = {
    id: step++,
    label: '',
    paramName: key ? key : '',
    isRequired,
    selectType,
    nullable: openApiItem.nullable ? openApiItem.nullable : false,
    title: openApiItem.title ? openApiItem.title : '',
    description: openApiItem.description ? openApiItem.description : '',
    children: []
  }
  return treeObj
}
/**
 * @name:
 * @description: 将树形列表数据转为openAPI规范数据
 * @param {*每次递归需要传递的数据} beforeData
 * @param {*空对象即可} formatObj
 * @return {*}
 */
function formatTreeToOpenApi(beforeData = treeData.value, formatObj: any = {}) {
  beforeData.forEach((obj: any) => {
    formatObj[obj.paramName] = {}
    const newObj = formatObj[obj.paramName]
    // 区分数据模型还是类型
    if (obj.selectType.length > 1) {
      newObj.$ref = `${DATA_MODEL_PATH}${
        obj.selectType[obj.selectType.length - 1]
      }`
    } else {
      newObj.type = obj.selectType[0]
    }
    obj.title ? (newObj.title = obj.title) : ''
    obj.description ? (newObj.description = obj.description) : ''
    obj.nullable ? (newObj.nullable = obj.nullable) : ''
    // 判断该层数据是否有子项
    if (obj.children && obj.children.length > 0) {
      // 是否为必须
      const requiredArr: Array<any> = []
      obj.children.forEach((child: any) => {
        if (child.isRequired) {
          requiredArr.push(child.paramName)
        }
      })
      if (requiredArr.length > 0) {
        newObj.required = requiredArr
      }

      if (obj.selectType[0] === PARAM_TYPE.object) {
        newObj.properties = {}
        formatTreeToOpenApi(obj.children, newObj.properties)
      } else if (obj.selectType[0] === PARAM_TYPE.array) {
        // 因为数组下只允许有有一个子项，所以children直接取0即可。
        const childrenObj = obj.children[0]
        if (childrenObj.selectType[0] === PARAM_TYPE.object) {
          //因为递归还是要循环数组的，所以传obj.children而非数组项
          newObj.properties = {}
          formatTreeToOpenApi(obj.children, newObj.properties)
        } else if (childrenObj.selectType[0] === PARAM_TYPE.array) {
          newObj.items = {}
          formatTreeToOpenApi(obj.children, newObj.items)
        } else {
          // 如果该层数组下包裹的既不是数组也不是对象，那么递归到此结束。
          newObj.items = {}
          const items = newObj.items
          // 如果大于1，则为数据模型
          if (childrenObj.selectType.length > 1) {
            items.$ref = `${DATA_MODEL_PATH}${
              childrenObj.selectType[childrenObj.selectType.length - 1]
            }`
          } else {
            childrenObj.selectType[0]
              ? (items.type = childrenObj.selectType[0])
              : ''
          }
          childrenObj.description
            ? (items.description = childrenObj.description)
            : ''
          childrenObj.nullable ? (items.nullable = childrenObj.nullable) : ''
        }
      }
    }
  })
  return formatObj
}
/**
 * @name:
 * @description: 用于外部调用
 * @param {*}
 * @return {*}
 */
function getOpenApiData() {
  var openApiData = formatTreeToOpenApi()
  openApiData = { schema: openApiData[_.keys(openApiData)[0]] }
  const keys = _.keys(openApiData.schema)
  return keys.length > 1 ? openApiData : {}
}

defineExpose({
  getOpenApiData
})
</script>

<style lang="scss" scoped>
:deep(.el-link) {
  font-size: 18px;
}
:deep(.el-tree) {
  background: transparent;
  .el-tree-node {
    .el-tree-node__content {
      height: 40px !important;
    }
  }
}
:deep(.el-input) {
  .el-input__inner {
    padding: 0px;
  }
}
:deep(.el-checkbox) {
  margin-right: 0px;
}
</style>
