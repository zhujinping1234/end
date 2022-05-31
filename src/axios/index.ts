/*
 * @Descripttion: axios
 * @Author: superman
 * @Date: 2021-12-31 16:44:02
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 09:11:47
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage as elMsg } from 'element-plus'
import qs from 'qs'
import _ from 'lodash'
// import Router from '@/router/index'
import loading from './loading'

// const baseUrl = 'http://192.168.1.118:8080/'

// 服务器
//const baseUrl = 'http://127.0.0.1:4523/mock/674912/v1/'
//test服务器
//const baseUrl = 'http://192.168.1.118:8080/v1/'
//test服务器
//const baseUrl = 'http://192.168.1.118:8080/v1/'

//xyq服务器
const baseUrl = 'http://192.168.1.105:8080/v1/'

const timeout = 5000
// eslint-disable-next-line no-unused-vars
function developLog(response: any) {
  let requestParams = ''
  if (!_.isEmpty(response.config.data)) {
    requestParams = JSON.stringify(response.config.data)
  } else if (!_.isEmpty(response.config.params)) {
    requestParams = JSON.stringify(response.config.params)
  }
  if (_.isEmpty(response.data) || _.isEmpty(response.data.data)) {
    // eslint-disable-next-line no-console
    console.log(
      'requestUrl:',
      response.config.url,
      '\n',
      `requestParams:${requestParams}`,
      '\n',
      response.data
    )
  } else {
    // eslint-disable-next-line no-console
    console.log(
      'requestUrl:',
      response.config.url,
      '\n',
      `requestParams:${requestParams}`,
      '\n',
      response.data.data
    )
  }
}

function initRequest(config: AxiosRequestConfig<any>) {
  ;(config.headers as any).Authorization = window.sessionStorage.getItem('token')
  const projectId = window.localStorage.getItem('projectId')
  if (projectId && config.method && _.toLower(config.method) === 'get') {
    if (config.params === '') {
      config.params = { openApiId: projectId }
    } else if (_.isEmpty(config.params.openApiId)) {
      config.params.openApiId = projectId
    }
  } else if (projectId && config.method) {
    if (_.isEmpty(config.data.openApiId)) {
      config.data.openApiId = projectId
    }
  }
  if (config.headers!['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  } else if (config.headers!['Content-Type'] === 'application/json') {
    config.data = qs.stringify(config.data)
  }
  return config
}
const axiosInstance = axios.create({
  baseURL: `${baseUrl}`, // api的base_url
  timeout, // 请求超时时间,
  // params: { factoryId: window.sessionStorage.getItem('factoryId') }
  headers: { Authorization: window.sessionStorage.getItem('token') }
})

axiosInstance.interceptors.request.use((config) => initRequest(config))

axiosInstance.interceptors.response.use(
  (response) => responseSuccess(response),
  (error) => responseError(error)
)
function responseSuccess(response: AxiosResponse<any, any>) {
  // developLog(response)
  if (!_.isEmpty(response.data.status) && response.data.status !== 200) {
    elMsg.error(response.data.msg)
    return Promise.reject(response)
  }
  if (!_.isEmpty(response.data.code) && response.data.code !== 200) {
    elMsg.error(response.data.msg)
    return Promise.reject(response)
  }
  return response.data
}
function responseError(error: any) {
  try {
    const data = error.response.data
    if (!_.isEmpty(data.data) || !_.isEmpty(data.info)) {
      const data = error.response.data
      elMsg.error(data.data ? `${data.info},${data.data}` : `${data.info}`)
    } else {
      elMsg.error('系统错误:请联系管理员！')
    }
  } catch (e) {
    elMsg.error('系统错误:请联系管理员！')
  }

  return Promise.reject(error)
}
function request(configParam: AxiosRequestConfig<any>, msgTip = false, loadingTip = true) {
  loadingTip && loading.showLoading()
  return axiosInstance(configParam)
    .then(
      (res) =>
        new Promise((resolve) => {
          msgTip && elMsg.success('操作成功')
          resolve(res)
        }),
      (rej) =>
        new Promise((resolve, reject) => {
          reject(rej)
        })
    )
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    })
    .finally(() => {
      loadingTip && loading.hideLoading()
    })
}

function get(url: string, params = {}, msgTip = false, loadingTip = true) {
  return request({ url, params, method: 'get' }, msgTip, loadingTip).then(
    (res) => new Promise((resolve) => resolve(res)),
    (rej) => new Promise((resolve, reject) => reject(rej))
  )
}

function post(url: string, data = {}, msgTip = false, loadingTip = true) {
  return request({ url, data, method: 'post' }, msgTip, loadingTip).then(
    (res) => new Promise((resolve) => resolve(res)),
    (rej) => new Promise((resolve, reject) => reject(rej))
  )
}

export { get, post, request, axios }
