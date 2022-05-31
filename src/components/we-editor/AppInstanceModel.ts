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
  children?: { [index: string]: null }
  version?: string
  blocket?: string
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

/**
 * 组件实例属性配置
 */
export type CompInstAttrs = {
  /**组件属性综合变量名 */
  propsName: string
  /**组件属性综合值 */
  propsValue: any
}

/**组件实例 */
export type ComponentInstnace = {
  id: string
  name: string
  /**component id */
  comp_id: string
  //属性对象，{属性名:任意类型的属性值}
  attrs?: { finput: string }
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
