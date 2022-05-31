import {
  AppInstance,
  PageInstance,
  Component as WbComp,
  ComponentInstnace as WbCompInst
} from '../../model/AppInstanceModel'

/**登录页页面实例
 *
 * 请补充完整的用例
 *
 */
const inputComp: WbComp = {
  url: '/input.umd.js',
  name: '输入框'
}

const buttonComp: WbComp = {
  url: '/button.umd.js',
  name: '按钮'
}

const loginPage: PageInstance = {
  id: 'adadsfasf',
  name: 'Login',
  children: [
    {
      id: 'asdfasdfasdfasf',
      component: inputComp,
      attrs: {}
    },
    {
      id: 'asdfasdfasdfasf',
      component: inputComp,
      attrs: { type: 'password' }
    },
    {
      id: 'asdfasdfasdfasf',
      component: buttonComp,
      attrs: { text: '提交' }
    }
  ]
}

/**
 * 后台标准布局组件
 *
 */
const layoutComp: WbComp = {
  url: '/?.umd.js',
  name: '后台标准布局'
}
/**
 *
 */
const chartComp: WbComp = {
  url: '/?.umd.js',
  name: '饼图组件'
}

/**
 * 后台首页
 */
const mainPage: PageInstance = {
  id: 'idOfMainPage',
  name: 'MainPage',
  children: [
    {
      id: 'idOfThisLayoutComp',
      component: layoutComp,
      attrs: {},
      children: {
        //"top":null 这两个具名插槽没有内容就无需天蝎
        //"left":null,
        //right是右下角的具名插槽。
        right: {
          id: 'idOfThisChartComp',
          component: chartComp,
          attrs: {
            /*属性面板设置的数据JSON对象  TODO 可以填写捡来
             */
          }
        }
      }
    }
  ]
}

const firstAppInst: AppInstance = {
  id: 'idofthisApp',
  name: '演示DEMO',
  pages: [loginPage, mainPage]
}

test('请给登录页和后台首页，填充完整的TODO信息,这个Demo应用有两页', () => {
  expect(firstAppInst.pages).toHaveLength(2)
})
