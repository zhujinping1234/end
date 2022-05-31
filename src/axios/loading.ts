/*
 * @Descripttion: element loading
 * @Author: superman
 * @Date: 2021-12-31 16:45:08
 * @LastEditors: superman
 * @LastEditTime: 2021-12-31 16:49:39
 */
// 加载弹框，详见el-loading
import { ElLoading as Loading } from 'element-plus'

let loadingCount = 0
let loading: any

const startLoading = (options = {}) => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)',
    ...options
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = (options?: any) => {
  if (loadingCount === 0) {
    startLoading(options)
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
export default { showLoading, hideLoading }
// export default function(Vue) {
//       //添加全局API
//      Vue.prototype.$loading = {
//         showLoading,
//         hideLoading
//     }
// }
