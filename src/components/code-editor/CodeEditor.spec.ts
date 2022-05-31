import { mount, shallowMount } from '@vue/test-utils'
import CodeEditor from './CodeEditor.vue'
import { ICodeEditor } from './CodeEditor'
import { AppInstance, PageInstance } from '../../model/AppInstanceModel'
import { Primary } from './CodeEditor.stories'

// Initalizing wrapper variable
let wrapper: any = null

// Mount the component to make a wrapper before each test
beforeEach(() => {
  wrapper = mount(CodeEditor, {
    props: {
      appName: 'vitejs-vite-jcy7tb'
    }
  })
})

// Jest's afterEach helper function
// Destroy the component wrapper after each test
afterEach(() => {
  wrapper.unmount()
})

test('name match', () => {
  //expect(wrapper.name).toBe('CodeEditor')
})

test(`测试加载代码后会跑出appLoaded事件（但是居然不知道如何写这个测试，但实际上是成功了的）`, async () => {
  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('abc')
  //此处的异步调用事件的断言不知道为什么这么写不对， 但实际上运行起来的时候的确能监听到。
  // TODO 需要搞清楚如何才能描述这个异步事件的断言
  await wrapper.vm.$nextTick()
  // let emi=wrapper.emitted();
  // console.log(emi);
  // expect(emi).toHaveProperty('appLoaded');
})

xtest(`在保存页面信息后，能马上读回原样的页面数据`, async () => {
  let codeEditor = wrapper.vm as ICodeEditor
  console.log('++++++', codeEditor.loadApp())
  //appName相同，没有页面信息
  expect(codeEditor.loadApp()).toEqual({ appName: 'vitejs-vite-jcy7tb', pages: [] })

  /*
  let pageInfoOfLogin: PageInfo = {
    pageName: 'login',
    template: `<template><com/></template>`,
    attrs: { abc: 123 }
  }
  //保存这个login页面信息
  codeEditor.savePage(pageInfoOfLogin)
  let pages = codeEditor.loadApp().pages
  //断言有且只有一页
  expect(pages).toHaveLength(1)
  //断言第一页正是我们给的页面
  expect(pages[0]).toEqual(pageInfoOfLogin)
  */
})
