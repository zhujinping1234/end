import { type } from 'os'

/**组件*/
export type Component = {
  //组件id
  id: string
  /**组件名字 */
  name: string
  /**组件js网址*/
  url: string
  /**定制化组件样式 */
  style?: string
  //设置的初始默认值
  attrs?: any
  children?: { [slotName: string]: ComponentInstnace[] }
}
/**
 * 组件信息，用于展示在组件面板中的信息
 */
export type ComponentAvatar = {
  id: string
  name: string
}
/**
 * 如果是插槽Slot下的组件，那必须指定具名插槽以及对应的子组件。默认插槽也应该使用default
 */
export type SlotChildren = { [slotName: string]: ComponentInstnace[] }

/**组件实例 */
export type ComponentInstnace = {
  id: string
  name: string
  /**component id */
  comp_id: string

  //函数输入
  finput: string

  //属性对象，{属性名:任意类型的属性值}
  attrs?: any

  children?: SlotChildren
  /**组件实例定制的样式 */
  style?: string
}

/**
 * 应用实例
 */
export type AppInstance = {
  id: string
  name: string
  // 本应用创建的组件实例
  comp_insts: ComponentInstnace[]
  /**使用到的外部组件元数据 */
  comps: Component[]
  // 当前的页数
  currentPageIndex: number
}

/**
 * 内部数据
 */
export type InternalData = {
  $state: AppInstance
}

/**
 * 属性配置
 */
export type PanelInstance = {
  //组件id
  CompId: string
  //组件名称
  CompName: string
  //之前推送属性用的,目前没用到
  json: Object
  //实例组件样式
  cssJson: string
  //获取事实当前页组件的数据
  pageContainer: ComponentInstnace[] | undefined
  //获取实例组件的id
  compExampleId: string
  //目前没用
  attributePanelData: Object
  //组件样式
  structuralCssJson: string
  //组件实例样式
  structuralExampleStyleJson: string
  structuralData: ComponentInstnace[]
  current: ComponentInstnace
  getCurrentPage: Object
  //当前路由的名称
  currentRouter: string
}

/**
 * 结构面板数据实例
 */
export type Tree = {
  label: string
  children?: Tree[]
}

/**
 * 实例组件id于样式对应
 */
export type idAndStyle = { [compId: string]: string }

/**
 * 组件样式
 */
export type compStyle = { StyleData: idAndStyle }
