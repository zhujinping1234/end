import { ComponentInstnace, SlotChildren } from '../we-editor/AppInstanceModel'
import { routerAttr, Tree } from './structuralPanelModel'

const getRouter = (compInstnace: ComponentInstnace[] | undefined) => {
  let routeObj: SlotChildren | undefined = {}
  const findRouter = (arr: ComponentInstnace[] | undefined): void => {
    if (arr) {
      arr.forEach((item: ComponentInstnace) => {
        if (item.name == '路由组件') {
          routeObj = item.children
          return
        } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          for (let key in item.children) {
            findRouter(item.children[key])
          }
        }
      })
    }
  }
  findRouter(compInstnace)
  return routeObj
}

const getRestructureData = (slotChildren: SlotChildren): Tree[] => {
  let routerTree: Tree[] = []
  const restructureData = (slotChildren: SlotChildren | undefined) => {
    if (slotChildren) {
      Object.keys(slotChildren).forEach((slotName: string) => {
        const compInstArray = slotChildren[slotName]
        let v = { name: slotName }
        routerTree.push(v)
        if (compInstArray.children) {
          restructureData(compInstArray.children)
        }
      })
    }
    return
  }
  restructureData(slotChildren)
  return routerTree
}

const getFirstRouter = (pagecontainer: ComponentInstnace[] | undefined) => {
  let currentRouter = ''
  let getfirstrouter = (arr: ComponentInstnace[] | undefined) => {
    if (arr) {
      arr.forEach((item: ComponentInstnace) => {
        if (item.name == '路由组件') {
          for (let key in item.children) {
            currentRouter = key
            break
          }
          return
        } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          for (let key in item.children) {
            getfirstrouter(item.children[key])
          }
        }
      })
    }
  }

  getfirstrouter(pagecontainer)
  return currentRouter
}

const addRouterAttr = (pagecontainer: ComponentInstnace[] | undefined, attr: routerAttr) => {
  let addAttribute = (arr: ComponentInstnace[] | undefined, attr: routerAttr): void => {
    if (arr) {
      arr.forEach((item: ComponentInstnace) => {
        //TODOitem.id==点击对应路由父路由的id(加个递归找到父路由的id并放回)
        if (item.name == '路由组件') {
          item.attrs = attr
          return
        } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          for (let key in item.children) {
            addAttribute(item.children[key], attr)
          }
        }
      })
    }
  }
  addAttribute(pagecontainer, attr)
}

export { getRouter, getRestructureData, getFirstRouter, addRouterAttr }
