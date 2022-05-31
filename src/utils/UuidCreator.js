'use strict'

//https://cythilya.github.io/2017/03/12/uuid/
function createUuidByPerformanceAPI() {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
/**
 * 
 * @returns 生成带-号的完整的UUID串
 */
function createUuidWithSubtract() {
  //当环境中没有URL.createUUIDObject对象时（如jest-dom测试环境中就没有）退而求其次
  if (URL && URL.createObjectURL) {
    var temp_url = URL.createObjectURL(new Blob())
    var uuid = temp_url.toString()
    URL.revokeObjectURL(temp_url)
    return uuid.split(/[:\/]/g).pop()
  } else {
    return createUuidByPerformanceAPI()
  }
}

function createUuid() {
  return createUuidWithSubtract().replaceAll('-', '')
  //TODO 使用base64编码压缩32位的UUID ，如(去掉-号后剩余32位) 11b9e105-f5bc-48e8-b93d-bd51644fcadd
}

export { createUuid }
