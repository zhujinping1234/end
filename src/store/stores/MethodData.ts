import {
  Component,
  AppInstance,
  ComponentInstnace,
  ComponentAvatar,
  InternalData
} from '../../model/AppInstanceModel'
import { updatePreviewer } from '../previewer'
import { createUuid } from '../../utils/UuidCreator'
import { post, get } from '../../axios/index'
import { deliveryToWecode, importComponents } from '../wecodesync/wecodesync'

// 所有组件
const components = importComponents()
const appid: string = 'vitejs-vite-jcy7tb'

// 保存应用
export function saveAppInfo(state: AppInstance) {
  let appInstString = JSON.stringify(state)
  localStorage.setItem('vitejs-vite-jcy7tb', appInstString)
  updatePreviewer(state, state.currentPageIndex)
  deliveryToWecode(appInstString)
  // *将数据上传到服务器
  let body = { projectId: 6, data: appInstString }
  post('project/data/save', body).then((res: any) => {
    console.log(res)
  })
}

// 递归查找出的所有组件实例
let allCompInstanceIds: string[] = []
/**
 * 生成符合条件的id：前四位不相同的
 * @returns 返回前四位没有重复的组件实例id
 */
export function createCompInstId(): String {
  let onlyUuid = createUuid() as string
  for (let i = 0; i < allCompInstanceIds.length; i++) {
    if (onlyUuid.substring(0, 3) === allCompInstanceIds[i].substring(0, 3)) {
      onlyUuid = createUuid()
      createCompInstId()
    }
  }
  allCompInstanceIds.push(onlyUuid)
  return onlyUuid
}

let serverData: any

// 重新加载，从LocalStorage获取数据
// *localStorage.getItem('vitejs-vite-jcy7tb')
export const importAppInfo = async function (): Promise<AppInstance> {
  // 从服务器获取数据
  let params = { projectId: 6 }

  let res: { data: string } = (await get('project/data/get', params)) as unknown as { data: string }
  serverData = res.data

  // get('project/data/get', params).then((res: any) => {
  //   serverData = res.data
  // })

  let appInstance: AppInstance = JSON.parse(
    serverData ||
      JSON.stringify({
        id: 'vitejs-vite-jcy7tb',
        name: 'vitejs-vite-jcy7tb',
        comp_insts: [
          {
            id: '0e8f2c8af85c4a548ebfe9b16dc297ab',
            name: 'Login',
            attrs: {},
            comp_id: 'd8a972e540f34dce84dd48c4d6154b53',
            children: { default: [] },
            finput: ''
          }
        ],
        comps: [],
        currentPageIndex: 0
      })
  ) as AppInstance

  // 创建app时先存一个空值到LocalStorage里
  // saveAppInfo()
  // 加载定制化的组件样式
  // appInstance.comps.forEach((comp) => {
  //   let c = components.find((c) => c.id == comp.id)
  //   if (c) {
  //     c.style = comp.style
  //   }
  // })
  // store.$state.comps = components

  // 递归查找所有页面的组件实例id
  function upDuplicateId(compInstnace: ComponentInstnace[]): void {
    for (let i = 0; i < compInstnace.length; i++) {
      let compInst = compInstnace[i]
      allCompInstanceIds.push(compInst.id)
      if (compInst.children != undefined) {
        let Subcomps = Object.keys(compInst.children)
        for (let i in Subcomps) {
          upDuplicateId(compInst.children[Subcomps[i]])
        }
      }
    }
  }
  upDuplicateId(appInstance.comp_insts)
  return appInstance
}
