<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="componentList"
        :group="{ name: 'people', pull: 'clone', put: false }"
        item-key="name"
        :clone="cloneDefault"
      >
        <template #item="{ element }">
          <div class="list-group-item">{{ element.name }}</div>
        </template>
      </draggable>
    </div>
    <div class="col-8">
      <h3>widget-container</h3>
      <widget :widgetData="pageContainer" class="col-10" />
    </div>

    <rawDisplayer class="col-3" :value="pageContainer" title="List" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, watchEffect, onMounted, getCurrentInstance } from 'vue'
  import rawDisplayer from './raw-displayer.vue'
  import draggable from 'vuedraggable'
  import Widget from './Widget.vue'
  //import { createUuid } from '../../utils/UuidCreator'
  import '../../../public/comp/containerStyle.css'

  let componentList = reactive([
    { name: '最简布局', url: '/comp/SimplestLayout.umd.js' },
    { name: '三栏组件', url: '/comp/container.umd.js' },
    { name: '输入框', url: '/comp/Input.umd.js' },
    { name: '按钮', url: '/comp/Button.umd.js' },
    { name: '扇形图', url: '/comp/piechart.umd.js' },
    {
      id: 'aaaaa',
      name: '后台标准布局',
      component: {
        name: '后台标准布局',
        url: '/comp/AdminLayoutStandard.umd.js',
        children: { left: 'left', top: 'top', right: 'right' }
      },
      url: '/comp/AdminLayoutStandard.umd.js',
      children: { left: 'left', top: 'top', right: 'right' }
    },
    {
      id: 'idOfWidgetLoginname',
      name: 'nameOfLogin',
      component: { name: '输入框', url: '/comp/Input.umd.js' }
    }
  ])

  let pageContainer = reactive({
    id: 'idOfThePage',
    name: 'Login',
    component: { name: '页面', url: '/comp/Page.umd.js', children: { default: 'default' } },
    children: {
      default: [
        {
          id: 'idOfWidgetLoginname',
          name: 'nameOfLogin',
          component: { name: '输入框', url: '/comp/Input.umd.js' }
        },
        {
          id: 'aaaaa',
          name: '后台标准布局',
          component: {
            name: '后台标准布局',
            url: '/comp/AdminLayoutStandard.umd.js',
            children: { left: 'left', top: 'top', right: 'right' }
          },
          children: { left: [], top: [], right: [] }
        }
      ]
    }
  })

  const cloneDefault = (draggedData: any) => {
    let result = {
     // id: createUuid(),
      name: draggedData.name,
      component: { nam: draggedData.name, url: draggedData.url },
      children: draggedData.children
    }
    return JSON.parse(JSON.stringify(result))
  }
  const initWidget = (draggedData: any) => {
    let result = {
     // id: createUuid(),
      name: draggedData.name,
      children: draggedData.children,
      draggedData
    }
    console.log(result)
    return result
  }
</script>
<style scoped>
  .col-10 {
    width: 700px;
    height: 300px;
  }

  .col-f {
    height: 100px;
    background-color: red;
  }
  .col-t {
    width: 100px;
    height: 100px;
    background-color: green;
  }
  .col-b {
    height: 100px;
    width: 100%;
    background-color: blue;
  }
  [data-slot] {
    height: 100px;
    width: 500px;
  }
</style>
