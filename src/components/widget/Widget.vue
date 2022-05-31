<template>
  <!-- <div
    style="width: 100%; height: 100%"
    :id="widgetData.comp_id"
    v-bind:class="[cssId == widgetData.id ? 'frame' : '']"
  > -->
  <component
    :is="extComponent"
    @click.stop="getMsg(widgetData.id, widgetData.name, widgetData.comp_id)"
    v-bind="widgetData.attrs"
    :class="widgetData.comp_id"
    v-bind:class="[cssId == widgetData.id ? 'frame' : '']"
  >
    <template v-for="(v, s) in slotChildrenObject" :key="s" v-slot:[s]>
      <widget-container :widgetDataArray="v" />
    </template>
  </component>
  <!-- </div> -->

  <!-- <div>{{ widgetData.name }}(类型:{{ widgetData.component.name }})</div> -->
</template>
<script setup lang="ts">
  import { useStore } from 'vuex'
  import { ElNotification } from 'element-plus'
  import externalComponent from './externalComponent.js'
  import WidgetContainer from './WidgetContainer.vue'
  import allstore from '../../store/stores/StoreAll'
  import {
    ref,
    shallowRef,
    watch,
    onBeforeMount,
    onMounted,
    computed,
    getCurrentInstance,
    defineAsyncComponent
  } from 'vue'
  import { mount } from '@vue/test-utils'
  import { debug } from 'console'

  const props = defineProps({
    widgetData: {
      type: Object,
      required: true
    }
  })

  let $store = useStore()

  const extComponent = computed(() =>
    defineAsyncComponent(() =>
      externalComponent(allstore.moduleStore().getCompById(props.widgetData.comp_id).url)
    )
  )

  let cssId = ref('')
  const getMsg = (id: string, name: string, comp_id: string) => {
    allstore.panelStore().CompId = id
    allstore.panelStore().CompName = name
    allstore.panelStore().compExampleId = comp_id
    open1()
  }

  watch(
    () => allstore.panelStore().CompId,
    (n, o) => {
      cssId.value = n
      // console.log(props.widgetData.id)
    },
    { deep: true }
  )

  const open1 = () => {
    ElNotification({
      title: 'Success',
      duration: 500,
      message: '点击成功',
      type: 'success'
    })
  }

  watch(
    () => props.widgetData,
    (n, o) => {},
    { deep: true, immediate: true }
  )
  /**
   * key/value的形式表示的某widget下的子slot，要保证value下必然是[]
   */
  const slotChildrenObject = computed(() => {
    if (!props.widgetData.children) {
      return null
    } else {
      let result = {}
      for (let k in props.widgetData.children) {
        let v = props.widgetData.children[k]
        //如果v不存在，则该slot是空白的，
        //TODO 需要考虑是否要给他拖拽，另外还要考虑如果后续有默认显示内容，如何将默认内容变为可以拖拽的对象？
        result[k] = !v ? [] : Array.isArray(v) ? v : [v]
      }
      return result
    }
  })
</script>

<style scoped>
  .frame {
    border: 1px blue solid !important;
  }
</style>
