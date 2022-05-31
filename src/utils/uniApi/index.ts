/*
 * @Descripttion:通用工具
 * @Author: superman
 * @Date: 2022-01-10 16:26:47
 * @LastEditors: superman
 * @LastEditTime: 2022-01-13 15:06:40
 */
export function getSqlParams(sqlstr: string) {
  let result: Array<any> = []
  let f = (x: string, y: string, z: string) =>
    result.push({ name: x, type: y, desc: z })

  var script = `(function getParams(){
      let annostr=\`${sqlstr}\`;
      return result;
  })`
  let getParams = eval(script)
  getParams(f)
  return result
}

export function getSqlForMybatis(sqlstr: string) {
  let f = (x: string, y: string, z: string) => `#{${x}}`

  var script = `(function getSqlForMybatis(){
      return \`${sqlstr}\`;
  })`
  let getForMybatis = eval(script)
  return getForMybatis(f)
}

export function getSqlForParser(sqlstr: string) {
  let f = (x: string, y: string, z: string) => `${x}`
  var script = `(function getSqlForParser(){
      return \`${sqlstr}\`;
  })`
  let getForParser = eval(script)

  return getForParser(f)
}
