import { Component, ComponentInstnace } from '../../model/AppInstanceModel'

/**
 * 为某个Page实例生成Vue Template模板文件
 * @param page 实例
 * @returns 模板文件字符串
 */

export const createVueTemplate = function (page: ComponentInstnace, comps: Component[]): string {
  let pageBegin = '<template>'
  let asynCompsSnipet = ''
  let asynCompsStyle = '<style>'
  let node = ''
  let stringModelParent = (comp: any) => {
    if (!comp) {
      return
    }
    comp.forEach((child: any) => {
      //TODO有slot加有节点的node，没有slot把node设置为空
      pageBegin +=
        '\n' +
        `<component :is='ac${child.id.replaceAll('-', '')}' v-bind='${
          !child.attrs ? '{}' : JSON.stringify(child.attrs)
        }'>` +
        stringModelSon(child) +
        `
          </component>`
      let url: string | undefined = comps.find((c: any) => c.id == child.comp_id)?.url
      asynCompsSnipet +=
        '\n' +
        `const ac${child.id.replaceAll(
          '-',
          ''
        )} = computed(() => defineAsyncComponent(() => externalComponent('${url}')));`

      let style = comps.find((c: any) => c.id == child.comp_id)?.style
      if (style) {
        asynCompsStyle += '\n' + style
      }
    })
    return node
  }
  function stringModelSon(child: any) {
    let r = ''
    for (let key in child.children) {
      // let childData = child.children
      r += `<template v-slot:${key}>`
      child.children[key].forEach((son: any) => {
        r +=
          '\n' +
          //  `<template v-slot:'${key}'>` +
          `<component :is='ac${son.id.replaceAll('-', '')}' v-bind='${
            !son.attrs ? '{}' : JSON.stringify(son.attrs)
          }'>` +
          stringModelSon(son) +
          `</component>`

        let url: string | undefined = comps.find((c: any) => c.id == son.comp_id)?.url
        asynCompsSnipet +=
          '\n' +
          `const ac${son.id.replaceAll(
            '-',
            ''
          )} = computed(() => defineAsyncComponent(() => externalComponent('${url}')));`

        let style: string | undefined = comps.find((c: any) => c.id == son.comp_id)?.style
        if (style) {
          asynCompsStyle += '\n' + style
        }
      })
      r += `</template>`
    }
    return r
  }
  stringModelParent([page])

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
 * 为某个组件生成模板字符串
 * @param compInst 组件实例
 * @returns
 */
export const createVueSnppetOfComponentInstance = function (compInst: ComponentInstnace): string {
  if (compInst.children == null) {
    return `<component :is= remoteUrl='${compInst.component.url}' v-bind='${JSON.stringify(
      compInst.attrs
    )}'/>`
  } else if (Array.isArray(compInst.children)) {
    let resultBegin = `<RemoteComponent remoteUrl='${
      compInst.component.url
    }' attrs='${JSON.stringify(compInst.attrs)}'>`
    let resultEnd = '</RemoteComponent>'
    let children: Array<ComponentInstnace> = <Array<ComponentInstnace>>compInst.children

    for (let child of children) {
      resultBegin += createVueSnppetOfComponentInstance(child)
    }
    return resultBegin + resultEnd
  } else {
    //TODO 如果是slotChildren，则也进行嵌套处理
    // throw new Error('TODO!')
  }
}
