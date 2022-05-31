<template>
  <div class="tree">
    <div class="routerTree">
      <h3>路由结构面板</h3>
      <el-button type="primary" size="small" round @click="dialogVisible = true"
        >添加路由</el-button
      >
      <el-dialog v-model="dialogVisible" title="添加项目" width="30%" :before-close="handleClose">
        <el-form
          :label-position="labelPosition"
          ref="formRef"
          :model="addModel"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="name"
            prop="name"
            :rules="[
              { required: true, message: 'name is required' },
              { type: 'string', message: 'name must be a number' }
            ]"
          >
            <el-input v-model="addModel.name" type="text" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item label="msg">
            <el-input v-model="addModel.projectForm.msg" />
          </el-form-item> -->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click=";(dialogVisible = false), addRouter()"
              >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-tree
        ref="tree"
        node-key="name"
        :data="routerData"
        :props="routerDefaultProps"
        highlight-current
        @node-click="handleRouterNodeClick"
        v-menus:right="menus"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="deleteRouter"
      />
    </div>
    <!-- 以下为组件结构面板区域 -->
    <h3>结构面板</h3>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      highlight-current
      v-menus:right="menus"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { watch, ref, onMounted, reactive, Ref, nextTick } from 'vue'
  import {
    findComponentAttributeById,
    findCompExampleStyle,
    findCompStyle
  } from '../panel-of-drag/recursive'
  import allstore from '../../store/stores/StoreAll'
  import { ComponentInstnace, SlotChildren } from '../../model/AppInstanceModel'
  import { ElMessageBox } from 'element-plus'
  import { getRestructureData, getRouter ,addRouterAttr} from './structureDataProcessingFunction'
  import { Tree } from './structuralPanelModel'
  //TODO1.有子路由问题，2.函数return没有返回值3.函数封装到文件
  let currentRouter = '' //全局的当前router
  let changeSign = false //解决添加属性重新会给路由结构数据赋值得问题
  let data: Ref<ComponentInstnace[]> = ref([]) //组件的渲染数据
  const dialogVisible = ref(false)
  const labelPosition = ref('top')
  const addModel = ref({ name: '' })
  const routerData: Ref<Tree[]> = ref([])
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }

  // interface Tree {
  //   [x: string]: any
  //   name: string
  //   children?: Tree[]
  // }

  interface routerAttr {
    slotList: Tree[]
    page: string
    finput:string
  }

  let compRouteId = ''
  //点击路由后获取路由所对应的路由组件id(后面做子路由用)
  const getCorrespondingRouterId = (arr: ComponentInstnace[], routerName: string) => {
    arr.forEach((item: ComponentInstnace) => {
      if (item.children) {
        for (let k in item.children) {
          if (k == routerName) {
            compRouteId = item.id
            return item.id
          }
        }
      }
      if (item.children) {
        for (let key in item.children) {
          getCorrespondingRouterId(item.children[key], routerName)
        }
      }
    })
    return
  }

  // const addRouterAttr = (handlRouterData: Tree) => {
  //   let pagecontainer = allstore.panelStore().pageContainer
  //   // console.log(pagecontainer)
  //   // getCorrespondingRouterId(pagecontainer, handlRouterData.name)

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
  //   let attr: routerAttr = { slotList: routerData.value, page: handlRouterData.name }
  //   addAttribute(pagecontainer, attr)
  // }
  const displayCorrespondingRouter = (arr: ComponentInstnace[], routerName: string) => {
    arr.forEach((item: any) => {
      if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        let result: any[] = []
        for (let k in item.children) {
          if (item.name == '路由组件') {
            if (k == routerName) {
              let v = item.children[k]
              result.push.apply(result, v)
            }
          } else {
            let v = item.children[k]
            result.push.apply(result, v)
          }
        }
        item.children = result
      }
      if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        displayCorrespondingRouter(item.children, routerName)
      }
    })
    return
  }
  const tree: Ref<any> = ref(null)
  //有一个异步的bug可以看看（目前以解决）
  async function handleRouterNodeClick(handlRouterData: Tree) {
    changeSign = false //为false说明是添加属性改变了源数据不重新渲染
    //设置属性改变了pagecontainer,watch监听到了pagecontainer改变重新渲染了路由结构数据导致点完后背景没了
    const pagecontainer = allstore.panelStore().pageContainer
    const attr: routerAttr = { slotList: routerData.value, page: handlRouterData.name,finput:'' }
    await addRouterAttr(pagecontainer,attr)

    allstore.panelStore().currentRouter = handlRouterData.name //获取当前点击路由保存到vuex
    let msg = JSON.parse(JSON.stringify(allstore.panelStore().pageContainer))
    displayCorrespondingRouter(msg, handlRouterData.name)
    data.value = msg
  }

  const addRouter = () => {
    routerData.value.push(addModel.value)
    //不清空的话会有bug
    addModel.value = { name: '' }
    changeSign = true

    let pagecontainer = allstore.panelStore().pageContainer
    let addSlot = (arr: ComponentInstnace[] | undefined, routerArrly: Tree[]) => {
      if (arr) {
        arr.forEach((item: ComponentInstnace) => {
          if (item.name == '路由组件') {
            let number = routerArrly.length
            for (let index = 0; index < number; index++) {
              if (item.children) {
                item.children[`${routerArrly[index].name}`] = !item.children[
                  `${routerArrly[index].name}`
                ]
                  ? []
                  : item.children[`${routerArrly[index].name}`]
              }
            }
            return
          } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
            for (let key in item.children) {
              addSlot(item.children[key], routerArrly)
            }
          }
        })
      }
    }

    addSlot(pagecontainer, routerData.value)
  }

  // const getRouter = (compInstnace: ComponentInstnace[] | undefined) => {
  //   let routeObj: SlotChildren | undefined = {}
  //   const findRouter = (arr: ComponentInstnace[] | undefined): void => {
  //     if (arr) {
  //       arr.forEach((item: ComponentInstnace) => {
  //         if (item.name == '路由组件') {
  //           routeObj = item.children
  //           return
  //         } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
  //           for (let key in item.children) {
  //             findRouter(item.children[key])
  //           }
  //         }
  //       })
  //     }
  //   }
  //   findRouter(compInstnace)
  //   return routeObj
  // }

  // const getRestructureData = (slotChildren: SlotChildren) => {
  //   let routerTree: Tree[] = []
  //   const restructureData = (slotChildren: SlotChildren | undefined) => {
  //     if (slotChildren) {
  //       Object.keys(slotChildren).forEach((slotName: string) => {
  //         const compInstArray = slotChildren[slotName]
  //         let v = { name: slotName }
  //         routerTree.push(v)
  //         if (compInstArray.children) {
  //           restructureData(compInstArray.children)
  //         }
  //       })
  //     }
  //     return
  //   }
  //   restructureData(slotChildren)
  //   return routerTree
  // }

  watch(
    () => allstore.panelStore().pageContainer,
    (attr) => {
      //TODO这两个清空之后需要改进
      if (changeSign) {
        // routeObj = {}
        // result = []
        let msg = JSON.parse(JSON.stringify(attr)) //不破坏原来的数据结构
        let routerObj = getRouter(msg)
        let routerTree = getRestructureData(routerObj)
        routerData.value = routerTree
      }
      changeSign = true

      nextTick(() => {
        tree.value.setCurrentNode({ name: allstore.panelStore().currentRouter })
      })
    },
    { deep: true }
  )

  const removeRoute = (node: Node, data: ComponentInstnace) => {
    changeSign = true

    let pagecontainer = allstore.panelStore().pageContainer
    let findId = (arr: ComponentInstnace[] | undefined, routerName: string) => {
      if (arr) {
        arr.forEach((item: ComponentInstnace) => {
          if (item.name == '路由组件') {
            for (let key in item.children) {
              if (key == routerName) {
                // console.log(item.children[routerName])
                delete item.children[key]
                return
              }
            }
          } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
            for (let key in item.children) {
              findId(item.children[key], routerName)
            }
          }
        })
      }
    }

    findId(pagecontainer, data.name)
  }

  const routerDefaultProps = {
    children: 'children',
    label: 'name'
  }

  const deleteRouter = (
    h: any,
    {
      node,
      data,
      store
    }: {
      node: any
      data: ComponentInstnace
      store: any
    }
  ) => {
    return h(
      'span',
      {
        class: 'custom-tree-node'
      },
      h('span', null, node.label),
      h(
        'span',
        {
          style: {
            fontSize: '14px',
            padding: '0 0 0 35px',
            cursor: 'pointer',
            textAlign: 'right'
          }
        },
        h(
          'a',
          {
            onClick: () => removeRoute(node, data)
          },
          'Delete'
        )
      )
    )
  }

  // 以下为组件结构面板区域----------------------------------------------------------------------------------------
  // let data: Ref<ComponentInstnace[]> = ref([])
  const menus = ref({
    menus: [
      {
        label: '返回(B)',
        tip: 'Alt+向左箭头',
        click: () => {
          window.history.back()
        }
      },
      {
        label: '点击不关闭菜单',
        tip: '不关闭菜单',
        click: () => {
          return false
        }
      }
    ]
  })
  const findChildren = (arr: ComponentInstnace[]) => {
    arr.forEach((item: any) => {
      if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        let result: any[] = []
        for (let k in item.children) {
          let v = item.children[k]
          result.push.apply(result, v)
        }
        item.children = result
      }
      if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        //传入的数据不带slost，children整合为数组对象
        findChildren(item.children)
      }
    })
    return
  }

  watch(
    () => allstore.panelStore().pageContainer,
    (attr) => {
      let msg = JSON.parse(JSON.stringify(attr))
      // findChildren(msg)
      // data.value = msg
      displayCorrespondingRouter(msg, allstore.panelStore().currentRouter)
      data.value = msg
    },
    { deep: true }
  )

  //获取第一个路由
  // let getFirstRouter = (pagecontainer: ComponentInstnace[] | undefined) => {
  //   let getfirstrouter = (arr: ComponentInstnace[] | undefined) => {
  //     if (arr) {
  //       arr.forEach((item: ComponentInstnace) => {
  //         if (item.name == '路由组件') {
  //           for (let key in item.children) {
  //             allstore.panelStore().currentRouter = key
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

  onMounted(() => {
    let pageInfo = allstore.moduleStore().getCurrentPage.children?.default
    // let msg = JSON.parse(JSON.stringify(pageInfo))
    // findChildren(msg)
    // data.value = msg

    //以下为路由结构面板区域
    let routerObj = getRouter(pageInfo)
    let routerTree = getRestructureData(routerObj)
    routerData.value = routerTree

    //打开面板默认显对应路由的数据
    //getFirstRouter(pageInfo)
    let msg = JSON.parse(JSON.stringify(allstore.panelStore().pageContainer))
    displayCorrespondingRouter(msg, allstore.panelStore().currentRouter)
    data.value = msg

    nextTick(() => {
      tree.value.setCurrentNode({ name: allstore.panelStore().currentRouter })
    })
  })

  watch(
    () => allstore.panelStore().structuralData,
    (attr) => {
      data.value = attr
    },
    { deep: true }
  )

  const defaultProps = {
    children: 'children',
    label: 'name'
  }

  let panelData = reactive({
    json: {},
    cssJson: '',
    exampleStyleJson: ''
  })
  const handleNodeClick = (data: ComponentInstnace) => {
    // console.log(data)

    //TODO点击结构面板vuex没有compid，不能设置属性
    let compID = data.id
    allstore.panelStore().CompId = data.id
    let pageInfo = allstore.moduleStore().getCurrentPage
    findComponentAttributeById(pageInfo, compID, panelData)
    allstore.panelStore().attributePanelData = panelData.json

    findCompExampleStyle(pageInfo, compID, panelData)
    allstore.panelStore().structuralCssJson = panelData.cssJson

    let compStyle = allstore.moduleStore().getCompStyles
    let compExampleId = allstore.panelStore().compExampleId
    findCompStyle(compStyle, compExampleId, panelData)
    allstore.panelStore().structuralExampleStyleJson = panelData.exampleStyleJson
  }
  //把pagecontainer里对应删除后，因为监听了pagecontainer会重新渲染树所对应的结构
  const remove = (node: Node, data: ComponentInstnace) => {
    let pagecontainer = allstore.panelStore().pageContainer

    let findId = (arr: ComponentInstnace[] | undefined, id: String) => {
      if (arr) {
        arr.forEach((item: ComponentInstnace) => {
          if (item.id == id) {
            const index = arr.findIndex((d: ComponentInstnace) => d.id === data.id)
            arr.splice(index, 1)
            return
          } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
            for (let key in item.children) {
              findId(item.children[key], id)
            }
          }
        })
      }
    }

    findId(pagecontainer, data.id)
  }

  const renderContent = (
    h: any,
    {
      node,
      data,
      store
    }: {
      node: any
      data: ComponentInstnace
      store: any
    }
  ) => {
    return h(
      'span',
      {
        class: 'custom-tree-node'
      },
      h('span', null, node.label),
      h(
        'span',
        {
          style: {
            fontSize: '14px',
            padding: '0 0 0 35px',
            cursor: 'pointer'
          }
        },
        h(
          'a',
          {
            onClick: () => remove(node, data)
          },
          'Delete'
        )
      )
    )
  }
</script>

<style scoped>
  .tree {
    background: rgb(255, 255, 255);
    text-align: center;
    border: 1px solid black;
    height: 100%;
    padding-left: 5px;
  }
  /* .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  } */
  .routerTree {
    height: 200px;
  }
</style>
