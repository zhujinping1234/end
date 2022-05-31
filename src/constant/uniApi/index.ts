/*
 * @Descripttion: uni-Api配置
 * @Author: superman
 * @Date: 2022-01-05 14:12:53
 * @LastEditors: superman
 * @LastEditTime: 2022-01-17 09:21:27
 */
export const REQUEST_COLOR = {
  get: '#67C23A',
  post: '#E6A23C',
  delete: '#F56C6C',
  put: '#409EFF'
}
export function getRequestColor(key: string) {
  return REQUEST_COLOR[key as keyof typeof REQUEST_COLOR] || REQUEST_COLOR.get
}

export const PARAM_TYPE: Record<string, string> = {
  string: 'string',
  integer: 'integer',
  boolean: 'boolean',
  array: 'array',
  object: 'object',
  number: 'number',
  null: 'null',
  any: 'any'
}

export const X_SQL = 'x-sql'
