/*
 * @Descripttion:uni-api module
 * @Author: superman
 * @Date: 2022-01-17 09:13:02
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 15:17:50
 */
import _ from 'lodash'
import { REQUEST_COLOR, X_SQL } from '@/constant/uniApi'
import { get } from '@/utils/axios'
const GettersTypes = {
  cartProducts: 'cartProducts',
  cartTotalPrice: 'cartTotalPrice'
} as const
type VGettersTypes = keyof typeof GettersTypes
export default {
  namespaced: true,
  state: {
    apiMenu: [],
    allTags: [],
    dataModelMenu: [],
    projectList: []
  },
  getters: {
    getApiMenu(state: any) {
      const formatArr = []
      for (const pathName in state.apiMenu) {
        const pathItem = state.apiMenu[pathName]
        for (const requestType in REQUEST_COLOR) {
          const operation: any = pathItem[requestType]
          let sqlSentence = undefined
          if (_.findKey(operation, X_SQL)) {
            sqlSentence = operation.extensions[X_SQL]
          }
          if (!_.isEmpty(operation)) {
            formatArr.push({
              id: operation.operationId,
              type: requestType,
              summary: operation.summary,
              path: pathName,
              [X_SQL]: sqlSentence
            })
          }
        }
      }
      return formatArr
    },
    getAllTagsToSelect(state: any) {
      const formatArr: Array<any> = []
      state.allTags.forEach((tag: any) => {
        formatArr.push({
          value: tag.name,
          label: tag.name
        })
      })
      return formatArr
    },
    getDataModel(state: any) {
      return state.dataModelMenu
    }
  },
  mutations: {
    setApiMenu(state: any, response: any) {
      state.apiMenu = response
    },
    setAllTags(state: any, response: any) {
      state.allTags = response
    },
    setDataModelMenu(state: any, response: any) {
      state.dataModelMenu = response
    },
    setProjectList(state: any, response: any) {
      state.projectList = response
    }
  },
  actions: {
    pullProjectList(context: any) {
      const result = get('openapi/get/list')
        .then((res: any) => {
          context.commit('setProjectList', res.data)
          return res
        })
        .catch(() => {})
      return result
    },
    pullApiList(context: any) {
      const result = get('paths/list')
        .then((res: any) => {
          context.commit('setApiMenu', res.data)
          return res
        })
        .catch(() => {})
      return result
    },
    pullAllTags(context: any) {
      const result = get('tags/get-all')
        .then((res: any) => {
          let response = res.data
          if (_.isEmpty(response)) {
            response = []
          }
          context.commit('setAllTags', response)
          return res
        })
        .catch(() => {})
      return result
    },
    pullDataModelMenu(context: any) {
      const result = get('dataModel/list')
        .then((res: any) => {
          context.commit('setDataModelMenu', res.data)
          return res
        })
        .catch(() => {})
      return result
    }
  }
}
