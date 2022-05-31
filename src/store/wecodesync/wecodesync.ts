import { Component } from '@/model/AppInstanceModel'
import { sendToPreview } from '../previewer/index'
import useStore from '../store-page/ModuleData'

let wecodeWindow: Window // 建立联系的子页面

/**
 * 函数目的：将localstorage里的数据传输到iframe里
 * @param deliveryToWecode - story保存方法里的appInString
 */
export const deliveryToWecode = function (deliveryToWecode: String) {
  wecodeWindow?.postMessage({ type: 'pagelocal', msg: deliveryToWecode }, '*')
}

let allWindow: Window[] = []
window.addEventListener(
  'message',
  function (e) {
    if (e.data.type == 'fixindex') {
      wecodeWindow = allWindow[e.data.msg]
    } else if (e.data.type == 'wecodeready') {
      allWindow = transDimension(window)
      allWindow.forEach((win, i) => win.postMessage({ type: 'fixindex', msg: i }, '*'))
    } else if (e.data.type == 'compileResult') {
      // 接收wecode传递过来的设计界面数据postMessage到预览界面***封装***
      sendToPreview(JSON.parse(e.data.msg))
    } else if (e.data.type == 'appMetadataExporting') {
      localStorage.setItem('components', e.data.msg)
    }
  },
  false
)

/**
 * TODO
 */
export function importComponents(): Component[] {
  const test = localStorage.getItem('components')
  let result = []
  if (test != null) {
    result = JSON.parse(test)
  }
  return result
}

/**
 * 遍历函数，将多维数组遍历成一维
 * @param winobject
 * @returns
 */
function transDimension(winobject: Window): Window[] {
  let rearray = []
  if (winobject.frames && winobject.frames.length) {
    for (let i = 0; i < winobject.length; i++) {
      rearray.push(winobject.frames[i])
      rearray.push(...transDimension(winobject.frames[i]))
    }
  }
  return rearray
}

const sendMockdataToPreviewWindow = function (data: string[]) {
  window.setTimeout(function () {
    //TODO 发送到预览窗口
    sendToPreview(data)
  }, 10000)
}
