import { defineStore } from 'pinia'
import {
  Component,
  AppInstance,
  ComponentInstnace,
  ComponentAvatar
} from '../../model/AppInstanceModel'
import { updatePreviewer } from '../previewer'
import { createUuid } from '../../utils/UuidCreator'
import { deliveryToWecode, importComponents } from '../wecodesync/wecodesync'
import { importAppInfo, createCompInstId, saveAppInfo } from './MethodData'
import { post, get } from '../../axios/index'

// 所有组件
const components = importComponents()

const COMP_PAGE_ID: string = 'd8a972e540f34dce84dd48c4d6154b53'
const appid: string = 'vitejs-vite-jcy7tb'
// let x: any = await importAppInfo()
// *==========================================================================
export let moduleStore = defineStore('moduleMethod', {
  state: (): AppInstance => {
    return {
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
    }
  },
  getters: {
    // 获取页面
    getPages: (state: AppInstance): ComponentInstnace[] => state.comp_insts,
    // 根据id获取当前页面
    getPageById: (state: AppInstance) => (id: string) => {
      return state.comp_insts.filter((p: ComponentInstnace) => p.id == id)[0]
    },

    /**
     * 给定一个组件实例id，检查它是否有效，如果有效，则设置为当前页，并返回Id，如果无效，则返回第一页的id
     * @param state
     * @returns 返回当前页的id
     */
    getValidPageId:
      (state: AppInstance) =>
      (pageId: string): string => {
        //如果ID不存在或者页面不存在，就找当前的第一页面
        let matched: ComponentInstnace[] = state.comp_insts.filter(
          (p: ComponentInstnace) => p.id == pageId
        )
        if (matched.length < 1) {
          return state.comp_insts[0].id
        } else {
          // nextPage(state,currentPageId) //此处无法调用mutation中的nextPage，只能硬copy过来，希望pinia没有getter和mutation的隔阂
          state.currentPageIndex = state.comp_insts.findIndex((p) => p.id == pageId)
          return pageId
        }
      },

    // 获取当前页面
    getCurrentPage: (state: AppInstance): ComponentInstnace =>
      state.comp_insts[state.currentPageIndex],
    //根据组件id获取组件
    getCompById:
      (state: AppInstance) =>
      (compId: string): Component => {
        return components.filter((q) => q.id == compId)[0]
      },
    // 获取所有组件实例
    getCompData: () => {
      return components
    },
    //获取所有组件的样式
    getCompStyles: (state: AppInstance) =>
      JSON.parse(
        localStorage.getItem(appid) ||
          JSON.stringify({
            appId: appid,
            name: appid,
            comp_insts: [],
            comps: []
          })
      ).comps,
    /**获取可用组件的化身Avatar，用于显示在工具栏上 */
    getArrayOfAvaliableCompAvatar: (state: AppInstance) => (): ComponentAvatar[] => {
      return components.map((comp) => ({ id: comp.id, name: comp.name }))
    },

    /**根据组件ID获取生成的新组件实例 */
    getComponentInstanceByCompId:
      (state: AppInstance) =>
      (compId: string): ComponentInstnace => {
        let component = components.find((comp) => comp.id == compId)
        if (component) {
          let compInstId = createCompInstId() as string
          let defaultProps = component.attrs
          let defaultPropsStr: string = !defaultProps ? '' : JSON.stringify(defaultProps)

          return JSON.parse(
            JSON.stringify({
              id: compInstId,
              name: component.name,
              comp_id: component.id,
              children: component.children,
              style: component.style,
              attrs: defaultProps,
              finput: `let input${compInstId.substring(0, 3)} = ${defaultPropsStr};`
            })
          )
        } else {
          throw Error('没有找到跟匹配的Component，ID=' + compId)
        }
      },

    /**
     *   添加页面
     * @param state
     * @param compInstName  - 组件实例的名字
     */
    getNewPage:
      (state: AppInstance) =>
      (compInstName: string): ComponentInstnace => {
        const compInst: ComponentInstnace = {
          id: createUuid(),
          name: compInstName,
          comp_id: COMP_PAGE_ID,
          children: { default: [] },
          finput: ''
        }

        state.comp_insts.push(compInst)
        saveAppInfo(state)
        return compInst
      }
  },
  actions: {
    async importAppInfo(): Promise<void> {
      // 从服务器获取数据
      let params = { projectId: 6 }

      let res: { data: string } = (await get('project/data/get', params)) as unknown as {
        data: string
      }
      if (res.data != null) {
        let appinfo = JSON.parse(res.data)
        this.comp_insts = appinfo.comp_insts
        this.comps = appinfo.comps
        this.currentPageIndex = 0
      }
    },
    // 删除页面
    delPage(id: string) {
      // TODO 可以使用高阶函数完成
      for (let i: number = 0; i < this.comp_insts.length; i++) {
        if (this.comp_insts[i].id == id) {
          this.comp_insts.splice(i, 1)
        }
      }
      saveAppInfo(this.$state)
    },
    // 保存当前页面(包括组件实例样式和组件样式_
    /**
     *
     * @param state
     * @param ComponentInstnace
     * @param compStyles -{compId:stylestring}记录
     */
    saveCurrentPage(
      // ComponentInstnace: ComponentInstnace[],
      // compStyles: Record<string, string>
      data: any
    ): void {
      let children = this.comp_insts[this.currentPageIndex].children
      children?.default.splice(0, children?.default.length)
      children?.default.push(...data.ComponentInstnace)

      //保存定制的组件样式到components中
      for (let compId in data.compStyles) {
        let comp = components.find((c) => c.id == compId)
        if (comp) {
          comp.style = data.compStyles[compId]
        }
      }

      this.comps = components
      saveAppInfo(this.$state)
      // TODO 将保存的数据存到服务器
    },

    // 修改CurrentPageIndex值
    nextPage(pageid: string) {
      this.currentPageIndex = this.comp_insts.findIndex((p) => p.id == pageid)
      saveAppInfo(this.$state)
    },

    // ====================传值到iframe====================
    transmitLocal(codewindow: any) {
      codewindow.postMessage({ type: 'pagelocal', msg: this.$state }, '*')
    },
    // 保存comp_insts数据
    saveCompInsts(compdata: ComponentInstnace) {
      this.comp_insts.splice(this.currentPageIndex, 1, compdata)
      saveAppInfo(this.$state)
    }
  }
})
