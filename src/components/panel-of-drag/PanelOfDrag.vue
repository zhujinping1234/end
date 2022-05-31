<template>
  <div class="row">
    <div class="drag">
      <widget :widgetData="pageContainer" class="col-10" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useStore } from 'vuex'

  import { ref, reactive, watch, inject, computed, Ref, onMounted } from 'vue'
  import draggable from 'vuedraggable'
  import Widget from '../widget/Widget.vue'
  import { findId, findCss } from './recursive'
  import '../../../public/comp/IdFrameStyle.css'
  import '../../../public/comp/AdGridTeststyle.css'
  import { ComponentInstnace } from '../../model/AppInstanceModel'
  import allstore from '../../store/stores/StoreAll'
  import { SlotChildren } from '../we-editor/AppInstanceModel'
  import {
    getRestructureData,
    getRouter,
    getFirstRouter,
    addRouterAttr
  } from '../panel-of-structure/structureDataProcessingFunction'
  import { Tree } from '../panel-of-structure/structuralPanelModel'

  let $store = useStore()
  let pageContainer: ComponentInstnace = reactive({
    id: 'idOfThePage',
    name: 'Login',
    attrs: {},
    finput: 'let finputd8a=null;',
    comp_id: 'd8a972e540f34dce84dd48c4d6154b53', //这个是Page组件的id
    children: {
      default: [
        // {
        //   id: 'idOfWidgetLoginname',
        //   name: 'nameOfLogin',
        //   component: { name: '输入框', url: '/comp/Input.umd.js' }
        // }
        // {
        //   id: "aaaaa", name: "后台标准布局",
        //   component: { name: '后台标准布局', url: '/comp/container.umd.js', children: { "left": "left", top: "top", right: "right" } },
        //   children: { left: [], top:[], right: [] }
        // }
        // {
        //   id: 'idOfWidgetLoginname',
        //   name: '扇形图',
        //   component: {
        //     name: '扇形图',
        //     url: '/comp/Piechart.umd.js',
        //   },
        //     attrs: {
        //       name: '扇形演示图',
        //       width: '800px',
        //       height: '350px',
        //       radiuswit: 20,
        //       radius: 120,
        //       borderRadius: 8,
        //       list: [
        //         { value: 40, name: 'rose 1' },
        //         { value: 38, name: 'rose 2' },
        //         { value: 32, name: 'rose 3' },
        //         { value: 30, name: 'rose 4' },
        //         { value: 28, name: 'rose 5' },
        //         { value: 26, name: 'rose 6' },
        //         { value: 22, name: 'rose 7' }
        //       ]
        //     }
        // }
      ]
    }
  })

  //获取上层提供的响应式数据
  const compInstanceId: Ref<string> = inject('compInstanceId') as Ref<string>
  //

  //TODO 生命周期问题，待解决（xyq）
  setTimeout(() => {
    loadComponentData()
    computed(loadComponentData)
  }, 1)
  const loadComponentData = () => {
    let pageInfo = allstore.moduleStore().getPageById(compInstanceId.value)
    pageContainer.children?.default.splice(0, pageContainer.children.default.length)
    pageContainer.children?.default.push(...pageInfo.children.default)
    
  }

  watch(
    () => allstore.panelStore().json,
    (attr) => {
      let id = allstore.panelStore().CompId
      findId(pageContainer.children?.default, id, attr)
    },
    { deep: true }
  )

  watch(
    () => allstore.panelStore().current,
    () => {
      let pageInfo = allstore.moduleStore().getPageById(compInstanceId.value)
      pageContainer.children?.default.splice(0, pageContainer.children.default.length)
      pageContainer.children?.default.push(...pageInfo.children.default)
    }
  )

  interface routerAttr {
    slotList: Tree[]
    page: string
    finput:''
  }

  // let result: Tree[] = []
  // const restructureData = (slotChildren: SlotChildren | undefined) => {
  //   if (slotChildren) {
  //     Object.keys(slotChildren).forEach((slotName: string) => {
  //       const compInstArray = slotChildren[slotName]
  //       let v = { name: slotName }
  //       result.push(v)
  //       if (compInstArray.children) {
  //         restructureData(compInstArray.children)
  //       }
  //     })
  //   }
  //   return
  // }

  // let routeObj: SlotChildren | undefined = {}
  // const findRouter = (arr: ComponentInstnace[] | undefined): void => {
  //   if (arr) {
  //     arr.forEach((item: ComponentInstnace) => {
  //       if (item.name == '路由组件') {
  //         routeObj = item.children
  //         return
  //       } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
  //         for (let key in item.children) {
  //           findRouter(item.children[key])
  //         }
  //       }
  //     })
  //   }
  // }

  // let getFirstRouter = (pagecontainer: ComponentInstnace[] | undefined) => {
  //  let currentRouter=''
  //   let getfirstrouter = (arr: ComponentInstnace[] | undefined) => {
  //     if (arr) {
  //       arr.forEach((item: ComponentInstnace) => {
  //         if (item.name == '路由组件') {
  //           for (let key in item.children) {
  //             currentRouter = key
  //             break
  //           }
  //           return
  //         } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
  //           for (let key in item.children) {
  //             getfirstrouter(item.children[key])
  //           }
  //         }
  //       })
  //     }
  //   }

  //   getfirstrouter(pagecontainer)
  // }
  let currentRouter = ''
  let routerData: Tree[] = []
  // const addRouterAttr = (pagecontainer:ComponentInstnace[]|undefined,attr: routerAttr) => {

  //   let addAttribute = (arr: ComponentInstnace[] | undefined, attr: routerAttr): void => {
  //     if (arr) {
  //       arr.forEach((item: ComponentInstnace) => {
  //         //TODOitem.id==点击对应路由父路由的id(加个递归找到父路由的id并放回)
  //         if (item.name == '路由组件') {
  //           item.attrs = attr
  //           return
  //         } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
  //           for (let key in item.children) {
  //             addAttribute(item.children[key], attr)
  //           }
  //         }
  //       })
  //     }
  //   }
  //   addAttribute(pagecontainer, attr)
  // }

  const setData = () => {
    allstore.panelStore().pageContainer = pageContainer.children?.default
  }
  const renderFirstRouter = () => {
    const CurrentPageData = allstore.moduleStore().getCurrentPage.children?.default
    const routeObj = getRouter(CurrentPageData)
    const routerTree = getRestructureData(routeObj)
    routerData = routerTree
    currentRouter = getFirstRouter(CurrentPageData)
    const attr: routerAttr = { slotList: routerData, page: currentRouter,finput:"" }
    addRouterAttr(CurrentPageData,attr)
    allstore.panelStore().currentRouter = currentRouter
  }

  onMounted(() => {
    setData()

    renderFirstRouter()
  })

  watch(
    () => allstore.panelStore().cssJson,
    (attr) => {
      let id = allstore.panelStore().CompId
      findCss(pageContainer.children?.default, id, attr)
    },
    { deep: true }
  )

  watch(
    () => pageContainer,
    (attr) => {
      allstore.panelStore().pageContainer = attr.children?.default
    },
    { deep: true }
  )
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .col-10 {
    width: 100%;
    height: 100%;
  }

  .col-f {
    height: 100px;
    background-color: red;
  }
  .col-t {
    width: 100px;
    height: 100px;
    background-color: green;
  }
  .col-b {
    height: 100px;
    width: 100%;
    background-color: rgb(140, 200, 255);
  }
  [data-slot] {
    height: 100px;
    width: 500px;
  }
</style>
