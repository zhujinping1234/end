import { ComponentInstnace } from '../../model/AppInstanceModel'
import { createVueSnppetOfComponentInstance, createVueTemplate } from './VueFileUtil'
const prettier = require('prettier')
import { PageInstance, Component as WbComp } from '../../model/AppInstanceModel'

const inputComp: WbComp = {
  url: '/input.umd.js',
  name: '输入框'
}

const buttonComp: WbComp = {
  url: '/button.umd.js',
  name: '按钮'
}

// ==============================测试组件====================================
const compInstnace: ComponentInstnace = {
  id: 'idOfCompInst01',
  component: inputComp,
  attrs: {}
}
const compButton: ComponentInstnace = {
  id: 'idOfCompInst02',
  component: buttonComp,
  attrs: {}
}
// ==============================测试页面====================================
const loginPage: PageInstance = {
  id: 'idOfLoginPage',
  name: 'Login',
  children: [compInstnace]
}

const mainPage: PageInstance = {
  id: 'idOfLoginPage',
  name: 'Login',
  children: [compInstnace, compInstnace, compButton]
}
// ==============================测试========================================
const vueSnppitOfFirstChildOfLoginPage: string = `<RemoteComponent remoteUrl='/input.umd.js' attrs='{}'/>`
const vueTemplateOfLoginPage: string = `<template>
          <RemoteComponent remoteUrl='/input.umd.js' attrs='{}'/>
        </template > 
        <script setup lang='ts'>
          import RemoteComponent from '../components/RemoteComp.vue'
        </script>`
const vueTemplateOfMainPage: string = `<template>
          <RemoteComponent remoteUrl='/input.umd.js' attrs='{}'/>
          <RemoteComponent remoteUrl='/input.umd.js' attrs='{}'/>
          <RemoteComponent remoteUrl='/button.umd.js' attrs='{}'/>
        </template > 
        <script setup lang='ts'>
          import RemoteComponent from '../components/RemoteComp.vue'
        </script>`

test('单个Input组件实例输出正确', () => {
  expect(createVueSnppetOfComponentInstance(compInstnace)).toEqual(vueSnppitOfFirstChildOfLoginPage)
})

test('含有单个Input组件实例的LoginPage实例生成vue输出正确', () => {
  const formatedVueTemplateOfLoginPage: string = prettier.format(vueTemplateOfLoginPage, {
    semi: false,
    parser: 'vue'
  })
  const formatedVueTemplate: string = prettier.format(createVueTemplate(loginPage), {
    semi: false,
    parser: 'vue'
  })
  expect(formatedVueTemplate).toEqual(formatedVueTemplateOfLoginPage)
})
// =========================================放置多个组件实例测试===========================================
test('含有多个组件实例的MainPage实例生成vue输出正确', () => {
  const formatedVueTemplateOfMainPage: string = prettier.format(vueTemplateOfMainPage, {
    semi: false,
    parser: 'vue'
  })
  // 格式化测试代码
  const formatedVueTemplate1: string = prettier.format(createVueTemplate(mainPage), {
    semi: false,
    parser: 'vue'
  })
  expect(formatedVueTemplate1).toEqual(formatedVueTemplateOfMainPage)
})
