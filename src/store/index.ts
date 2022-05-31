import { createStore } from "vuex";
import ModuleData from './store-page/ModuleData.js'
import PanelData from './store-page/PanelData.js'
import uniApi from './modules/uniApi'
import StylePanelData from "./store-page/StylePanelData.js";
import CurrentPageIndex from './store-page/shuju.js'
export default createStore({
  modules: {
    ModuleData,
    PanelData,
    uniApi,
    StylePanelData,
    CurrentPageIndex
  }
})

// export default createStore({
//   state: {
//     inputVal: "",
//     val: "",
//     Button: {},
//     Input: {},
//     flage:"",
//     dragafter: [],
//     flageId:""
//   },
//   mutations: {
//     // 进行数据更新，改变数据状态
//   },
//   actions: {
//     //执行动作，数据请求
//   },
//   getters: {
//     // 获取到最终的数据结果
//   },
// });