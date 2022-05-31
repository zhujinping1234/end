import { ComponentInstnace, Component } from '../../model/AppInstanceModel'

let findId = (arr: ComponentInstnace[] | undefined, id: String, attr: any) => {
  if (arr) {
    arr.forEach((item: ComponentInstnace) => {
      if (item.id == id) {
        if (item.name == '轮播组件') {
          let number = attr.slotNumber
          for (let index = 1; index <= number; index++) {
            if (item.children) {
              item.children[`page${index}`] = !item.children[`page${index}`]
                ? []
                : item.children[`page${index}`]
            }
          }
        }
        item.attrs = attr
        return
      } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        for (let key in item.children) {
          findId(item.children[key], id, attr)
        }
      }
    })
  }
}

let findCss = (arr: ComponentInstnace[] | undefined, id: String, attr: string | undefined) => {
  if (arr) {
    arr.forEach((item: ComponentInstnace) => {
      if (item.id == id) {
        item.style = attr
        return
      } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
        for (let key in item.children) {
          findCss(item.children[key], id, attr)
        }
      }
    })
  }
}

/**
 * TODO
 * @param pageInfo
 * @param compID
 * @param jsonWrapper 把找到的属性对象给它的json属性
 */
const findComponentAttributeById = function (
  pageInfo: ComponentInstnace,
  compID: string,
  jsonWrapper: { json: null | {} }
) {
  let find = (arr: ComponentInstnace[] | undefined, id: String) => {
    if (arr) {
      arr.forEach((item: ComponentInstnace) => {
        if (item.id == id) {
          if (!item.attrs) {
            jsonWrapper.json = {}
            return
          }
          jsonWrapper.json = item.attrs
          return
        } else if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          for (let key in item.children) {
            find(item.children[key], id)
          }
        }
      })
    }
  }

  find(pageInfo.children?.default, compID)
}

const findCompExampleStyle = (
  pageInfo: ComponentInstnace,
  compID: string,
  styleJsonWrapper: any
) => {
  let find = (arr: ComponentInstnace[] | undefined, id: String) => {
    if (arr) {
      arr.forEach((item: ComponentInstnace) => {
        if (item.id == id) {
          styleJsonWrapper.cssJson = item.style
          return
        } else if (item.hasOwnProperty('children')) {
          for (let key in item.children) {
            find(item.children[key], id)
          }
        }
      })
    }
  }
  find(pageInfo.children?.default, compID)
}

const findCompStyle = (compStyle: Component[], compExampleId: string, styleJsonWrapper: any) => {
  let findStyle = (arr: Component[], compExampleId: string) => {
    arr.forEach((item: Component) => {
      if (item.id == compExampleId) {
        styleJsonWrapper.exampleStyleJson = item.style
        return
      }
    })
  }
  findStyle(compStyle, compExampleId)
}

export { findId, findCss, findComponentAttributeById, findCompExampleStyle, findCompStyle }
