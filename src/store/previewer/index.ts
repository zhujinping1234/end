//import { ReplStore } from './store'
import { AppInstance, Component, ComponentInstnace } from '../../model/AppInstanceModel'
import { compileFile } from './transform'

//import { compileModulesForPreview } from './moduleCompiler'
import {} from '../../components/code-editor/VueFileUtil'
import { createReplStore, ReplStore, compileModulesForPreview } from '@timshaw9791/repl'

let uid = 0
let previeweWindow: Window | null = null

function isRouterView(child: ComponentInstnace): boolean {
  return child.comp_id == 'db915494-64b1-4c51-baee-b3b0440f163f'
}

async function compileFiles(files: Record<string, string>): Promise<string> {
  const codeToEval: string[] = []
  const store: ReplStore = createReplStore(files, 'main.ts') //createReplStore(appInfo, currentPageIndex)
  await store.compileFiles()
  try {
    // compile code to simulated module system
    const modules = compileModulesForPreview(store)
    console.log(`[@vue/repl] successfully compiled ${modules.length} modules.`)

    codeToEval.push(
      `window.__modules__ = {};window.__css__ = '';` +
        `if (window.__app__) window.__app__.unmount();` +
        `document.body.innerHTML = '<div id="app"></div>'`,
      ...modules,
      `document.getElementById('__sfc-styles').innerHTML = window.__css__`
    )
  } catch (e: any) {
    console.log(e)
  }

  return JSON.stringify(codeToEval)
}

/**
 * 如果组件实例中含有路由视图组件，拆成多个文件及元数据，否则维持不变。
 * @param comp_inst 组件实例
 */
function splitMetaData(comp_inst: ComponentInstnace): Record<string, string> {
  const resiultRecord: Record<string, string> = {}

  // 将所有组件实例拍平成一维数组
  const compInstArray: ComponentInstnace[] = []
  const nestPush = function (node: ComponentInstnace) {
    if (node.children) {
      compInstArray.push(node)
      Object.keys(node.children).forEach((slotName) => {
        if (node.children) {
          const slotCompInsts: ComponentInstnace[] = node.children[slotName]
          slotCompInsts.forEach((childcompInst) => nestPush(childcompInst))
        }
      })
    }
  }
  nestPush(comp_inst)
  // 查找是否有路由组件实例
  const routerViewComp = compInstArray.find((compInst) => isRouterView(compInst))
  if (routerViewComp && routerViewComp.children) {
    let routerSnippet = ''
    let routerImport = ''
    Object.keys(routerViewComp.children).forEach((routerPath) => {
      //TODO  应该是要包上外部组件实例<component></component
      if (routerViewComp.children) {
        const subCompInst = routerViewComp.children[routerPath]
        const subCompInstName = comp_inst.name + routerPath
        resiultRecord[subCompInstName + '.vue'] = JSON.stringify(subCompInst)

        routerImport += `\n import ${subCompInstName} from './${subCompInstName}.vue'`
        routerSnippet += `,{path:'/${routerPath}', component: ${subCompInstName}}`
      }
    })

    //生成router.js
    resiultRecord[
      comp_inst.name + '_router.ts'
    ] = `import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
    ${routerImport}
const routes = [
  ${routerSnippet ? routerSnippet.substring(1) : ''}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router

`
    //让自己的组件为空
    delete routerViewComp?.children
  }

  resiultRecord[comp_inst.name + '.vue'] = JSON.stringify(comp_inst)
  return resiultRecord
}

/**
 * 将元数据文件名转化为多个原文件并保存在工作空间
 * @param metafile 元数据文件名
 * @returns
 */
export const compileWithRouter = async function (
  compApp: AppInstance,
  comp_inst: ComponentInstnace
): Promise<string> {
  //拆成多个元数据以及对应的路由文件
  //const compApp: AppInstance = JSON.parse(r[metafile]) as AppInstance
  // const comp_inst = compApp.comp_insts[compApp.currentPageIndex]

  const files: Record<string, string> = splitMetaData(comp_inst) //拆成多个元数据以及对应的路由文件

  //如果是.vue就生成字符串模板
  Object.keys(files)
    .filter((k) => k.endsWith('.vue'))
    .forEach((k) => {
      const compInst = JSON.parse(files[k]) as ComponentInstnace
      files[k] = createVueTemplate(compInst, compApp.comps)
    })

  const pageName = comp_inst.name
  const hasRouter = Object.keys(files).find((f) => f.endsWith('_router.ts'))
  const importRouter = hasRouter ? `import router from './${pageName}_router.ts'` : ''
  const useRouter = hasRouter ? `app=app.use(router)` : ''
  files['main.ts'] = `
import { createApp } from 'vue';
import MainPage from './${pageName}.vue';
${importRouter}


import * as Vue from 'vue';
(<any>window).Vue = Vue;
window.Vue=Vue;
let app = window.__app__ = createApp(MainPage)
app.config.unwrapInjectedRef = true
app.config.errorHandler = e => console.error(e)
${useRouter}
app.mount('#app');
  `

  files['externalComponent.js'] = `
  // src/utils/external-component.js
  // https://stackoverflow.com/questions/63581504/vue-3-external-component-plugin-loading-in-runtime
  export default async function externalComponent(url) {
    url="http://127.0.0.1:5500/public"+url;
    const name = url
      .split('/')
      .reverse()[0]
      .match(/^(.*?)\.umd/)[1]
  
    if (window[name]) return window[name]
  
    window[name] = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.async = true
      script.addEventListener('load', () => {
        resolve(window[name])
      })
      script.addEventListener('error', () => {
        reject(new Error("===="))
      })
      script.src = url
      document.head.appendChild(script)
    })
  
    return window[name]
  }
        `

  return await compileFiles(files)
}

const createVueTemplate = function (
  compInsts: ComponentInstnace[] | ComponentInstnace,
  comps: Component[]
): string {
  const pages = Array.isArray(compInsts) ? compInsts : [compInsts]

  let pageBegin = '<template>'
  let asynCompsSnipet = ''
  let asynCompsStyle = '<style>'
  const node = ''

  /**
   * 为一组组件实例获取生成的3类字符串：template、js、sytle
   * @param comp_insts
   * @returns
   */
  const stringModelParent = (comp_insts: ComponentInstnace[]) => {
    if (!comp_insts) {
      return
    }
    comp_insts.forEach((child: ComponentInstnace) => {
      //TODO有slot加有节点的node，没有slot把node设置为空
      pageBegin +=
        '\n' +
        `<component :is='ac${child.id}' v-bind='${
          !child.attrs ? '{}' : JSON.stringify(child.attrs)
        }'>` +
        stringModelSon(child) +
        `
              </component>`
      const url: string | undefined = comps.find((c: any) => c.id == child.comp_id)?.url
      asynCompsSnipet += `\nconst ac${child.id} = computed(() => defineAsyncComponent(() => externalComponent('${url}')));`

      const style = comps.find((c: any) => c.id == child.comp_id)?.style
      if (style) {
        asynCompsStyle += '\n' + style
      }
    })
    return node
  }

  /**
   * 获取某个组件实例对应的vue文件字符串
   * @param child
   * @returns
   */
  function stringModelSon(child: ComponentInstnace): string {
    let r = ''
    for (const key in child.children) {
      // let childData = child.children
      r += `<template v-slot:${key}>`
      child.children[key].forEach((son: ComponentInstnace) => {
        if (isRouterView(son)) {
          r += '<router-view/>'
          return
        }

        r +=
          '\n' +
          //  `<template v-slot:'${key}'>` +
          `<component :is='ac${son.id}' v-bind='${
            !son.attrs ? '{}' : JSON.stringify(son.attrs)
          }'>` +
          stringModelSon(son) +
          `</component>`

        const url: string | undefined = comps.find((c: any) => c.id == son.comp_id)?.url
        asynCompsSnipet +=
          '\n' +
          `const ac${son.id} = computed(() => defineAsyncComponent(() => externalComponent('${url}')));`

        const style: string | undefined = comps.find((c: any) => c.id == son.comp_id)?.style
        if (style) {
          asynCompsStyle += '\n' + style
        }
      })
      r += `</template>`
    }
    return r
  }

  stringModelParent(pages)

  return (
    pageBegin +
    `
        </template>
        <script setup lang='ts'>
          import { computed, defineAsyncComponent } from 'vue'
          import externalComponent from "./externalComponent.js"
          ${asynCompsSnipet}
        </script>
        ` +
    asynCompsStyle +
    `</style>`
  )
}

/**
 *
 * @param appInfo - 应用实例信息
 * @param currentPageIndex 当前页下标
 */
export const updatePreviewer = async function (appInfo: AppInstance, currentPageIndex: number) {
  //TODO 判断previeweWindow在不在?或者已经关闭了
  if (!previeweWindow || previeweWindow.closed) {
    return
  }
  // const compApp: AppInstance = JSON.parse(r[metafile]) as AppInstance;
  const comp_inst = JSON.parse(JSON.stringify(appInfo.comp_insts[appInfo.currentPageIndex]))
  let codeToEval = await compileWithRouter(appInfo, comp_inst)
  console.log(JSON.parse(codeToEval))

  try {
    return new Promise((resolve, reject) => {
      const cmd_id = uid++
      previeweWindow?.postMessage(
        { action: 'eval', cmd_id, args: { script: JSON.parse(codeToEval) } },
        '*'
      )
    })
  } catch (e: any) {}
}

export const openPreviewWindow = function (preivewWindowUrl: string) {
  const winUrl = '/previewer.html'
  previeweWindow = window.open(winUrl, '_blank') as Window
}

export const sendToPreview = function (data: string[]) {
  previeweWindow?.postMessage({ action: 'eval', cmd_id: uid++, args: { script: data } }, '*')
}
