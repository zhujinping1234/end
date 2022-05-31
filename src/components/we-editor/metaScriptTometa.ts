import { AppInstance, ComponentInstnace } from '../../model/AppInstanceModel'

export const codeToData = (arr: ComponentInstnace[], compFunction: string) => {
  arr.forEach((item: ComponentInstnace) => {
    let id = item.id
    let name = item.name

    let top = compFunction.indexOf(id.substring(0, 3))

    let end = compFunction.indexOf(name)

    let attrs = compFunction.substring(top, end)

    if (top == -1 && end == -1) {
      attrs = '无此id且无次组件名'
    } else if (top == -1) {
      attrs = '无此id'
    } else if (end == -1) {
      attrs = '无此组件名'
    }

    let joinAttrs = 'let input' + attrs

    item.finput = joinAttrs

    if (Object.prototype.hasOwnProperty.call(item, 'children')) {
      for (let key in item.children) {
        codeToData(item.children[key], compFunction)
      }
    }
  })
  return arr
}

export const upDuplicateId = (
  compInstnace: ComponentInstnace[],
  compFunction: string
): ComponentInstnace[] => {
  for (let i = 0; i < compInstnace.length; i++) {
    let compInst = compInstnace[i]

    let id = compInst.id
    let name = compInst.name

    let top = compFunction.indexOf(id.substring(0, 3))

    let end = compFunction.indexOf(name)

    let attrs = compFunction.substring(top, end)

    if (top == -1 && end == -1) {
      attrs = '无此id且无次组件名'
    } else if (top == -1) {
      attrs = '无此id'
    } else if (end == -1) {
      attrs = '无此组件名'
    }

    let joinAttrs = 'let input' + attrs

    compInst.finput = joinAttrs

    if (compInst.children != undefined) {
      let Subcomps = Object.keys(compInst.children)
      for (let i in Subcomps) {
        upDuplicateId(compInst.children[Subcomps[i]], compFunction)
      }
    }
  }
  return compInstnace
}
