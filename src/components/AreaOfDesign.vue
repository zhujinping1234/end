<script setup lang="ts">
  import { useKeypress } from 'vue3-keypress'
  import { useStore } from 'vuex'
  import { reactive, onMounted, watch, ref } from 'vue'
  import PanelOfDrag from './panel-of-drag/PanelOfDrag.vue'
  import AttributePanel from './panel-of-property/AttributePanel.vue'
  import StylePanel from './panel-of-style/StylePanel.vue'
  import CustomizedCompStyles from './CustomizedCompStyles.vue'
  import StructuralPanel from './panel-of-structure/StructuralPanel.vue'
  import CustomizedExampleCompStyles from './CustomizedExampleCompStyles.vue'
  import allstore from '../store/stores/StoreAll'
  import { ComponentInstnace, idAndStyle } from '../model/AppInstanceModel'

  let showHide = reactive({
    structureShow: false,
    styleShow: false,
    attributeShow: false
  })
  let isActive = ref(true)
  let rawCss = ref('')
  let exampleRawCss = ref('')

  let exampleAllCss = ''
  // let pageInfo = attr
  let findExampleRawCss = (arr: idAndStyle) => {
    Object.keys(arr).forEach((key) => {
      if (arr[key] != '') {
        exampleAllCss = exampleAllCss + arr[key]
      }
    })

    return
  }

  let allCss = ''
  // let pageInfo = attr
  let findRawCss = (arr: ComponentInstnace[] | undefined) => {
    if (arr) {
      arr.forEach((item: ComponentInstnace) => {
        if (item.style) {
          allCss = allCss + item.style
        }
        if (item.hasOwnProperty('children')) {
          for (let key in item.children) {
            findRawCss(item.children[key])
          }
        }
      })
    }

    return
  }

  watch(
    () => allstore.styleStore().StyleData,
    (attr) => {
      exampleAllCss = ''
      findExampleRawCss(attr)
      exampleRawCss.value = exampleAllCss
    },
    { deep: true }
  )

  watch(
    () => allstore.panelStore().pageContainer,
    (attr) => {
      allCss = ''
      findRawCss(attr)
      rawCss.value = allCss
    },
    { deep: true }
  )

  let teleportTarget = ref('body')
  onMounted(() => {
    teleportTarget.value = '#teleport-target'
    allCss = ''
    let pageInfo = allstore.moduleStore().getCurrentPage
    findRawCss(pageInfo.children?.default)
    rawCss.value = allCss

    exampleAllCss = ''
    let compStyle = allstore.moduleStore().getCompStyles
    findRawCss(compStyle)
    exampleRawCss.value = exampleAllCss
  })

  let structureClick = () => {
    showHide.structureShow = !showHide.structureShow
    allstore.panelStore().CompName = ''

    const findChildren = (arr: ComponentInstnace[]) => {
      arr.forEach((item: any) => {
        if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          let result: any = []
          for (let k in item.children) {
            let v = item.children[k]
            result.push.apply(result, v)
          }
          item.children = result
        }
        if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          findChildren(item.children)
        }
      })
      return arr
    }
    let pageInfo = allstore.panelStore().pageContainer
    // let pageInfo = $store.getters.getCurrentPage.children.default
    let msg: ComponentInstnace[] = JSON.parse(JSON.stringify(pageInfo))
    let treeData = findChildren(msg)
    allstore.panelStore().structuralData = []
    allstore.panelStore().structuralData = treeData
  }
  let styleClick = () => {
    showHide.styleShow = !showHide.styleShow
    allstore.panelStore().CompName = ''
  }
  let attributeClick = () => {
    showHide.attributeShow = !showHide.attributeShow
    //$store.state.PanelData.getCurrentPage = $store.getters.getCurrentPage
    allstore.panelStore().CompName = ''
  }
  let rightLeft = () => {
    isActive.value = !isActive.value
  }
  useKeypress({
    keyEvent: 'keydown',
    keyBinds: [
      {
        keyCode: 65, // or keyCode as integer, e.g. 40
        success: structureClick,
        modifiers: ['altKey']
      },
      {
        keyCode: 66, // or keyCode as integer, e.g. 40
        success: styleClick,
        modifiers: ['altKey']
      },
      {
        keyCode: 67, // or keyCode as integer, e.g. 40
        success: attributeClick,
        modifiers: ['altKey']
      },
      {
        keyCode: 68, // or keyCode as integer, e.g. 40
        success: rightLeft,
        modifiers: ['altKey']
      }
    ]
  })
</script>
<template>
  <div>
    <teleport :to="teleportTarget">
      <el-button size="small" @click="structureClick()"> 显示大纲 </el-button>
      <el-button size="small" @click="styleClick()"> 编辑样式 </el-button>
      <el-button size="small" @click="attributeClick()"> 属性面板 </el-button>
      <el-button size="small" @click="rightLeft()">《= =》</el-button>
    </teleport>
    <span>
      <CustomizedCompStyles :rawCss="rawCss" />
    </span>
    <span>
      <CustomizedExampleCompStyles :exampleRawCss="exampleRawCss" />
    </span>
    <div class="flexSupe">
      <div class="dra">
        <panel-of-drag></panel-of-drag>
      </div>
      <div v-bind:class="[isActive ? 'fixedRight' : 'fixedLeft']">
        <div class="dra-one" v-if="showHide.attributeShow">
          <attribute-panel></attribute-panel>
        </div>
        <div class="dra-two" v-if="showHide.styleShow">
          <style-panel></style-panel>
        </div>
        <div class="dra-three" v-if="showHide.structureShow">
          <StructuralPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .flexSupe {
    position: relative;
    /* display: flex; */
    padding: 10px;
    background: #f1f2f3;
  }
  .dra {
    /* overflow: hidden; */
    /* flex: 4; */
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .fixedRight {
    text-align: right;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    /* border: 1px solid black; */
  }
  .fixedLeft {
    text-align: right;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border: 1px solid black;
  }

  .dra-one {
    float: right;
    width: 900px;
    height: 100%;
    /* flex: 1; */
  }
  .dra-two {
    float: right;
    width: 200px;
    height: 100%;
    /* flex: 1; */
  }
  .dra-three {
    float: right;
    width: 200px;
    height: 100%;
    /* flex: 1; */
  }
</style>
