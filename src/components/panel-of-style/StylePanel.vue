<template>
  <div class="stylePanel">
    <h3>样式面板</h3>
    <!-- <textarea rows="25" cols="30" v-model="data.cssJson" ></textarea>
      <button @click="cssPush">修改样式</button> -->
    <StyleTextareaExample v-if="data.title != ''" :exampleCssJson="data.exampleStyleJson" />
    <styleTextarea v-if="data.title != ''" :sonCssJson="data.cssJson" />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { reactive, onMounted, watch, ref } from 'vue'
  import styleTextarea from './style-panel-son/StyleTextarea.vue'
  import StyleTextareaExample from './style-panel-son/StyleTextareaExample.vue'
  import { findCompExampleStyle, findCompStyle } from '../panel-of-drag/recursive'
  import allstore from '../../store/stores/StoreAll'

  let $store = useStore()
  let data = reactive({
    title: '',
    cssJson: '',
    exampleStyleJson: ''
  })

  watch(
    () => allstore.panelStore().CompName,
    (n) => {
      data.title = n
      let compID = allstore.panelStore().CompId
      let pageInfo = allstore.moduleStore().getCurrentPage
      findCompExampleStyle(pageInfo, compID, data)

      //TODO点击后获取根据id获取对应组件的style
      let compStyle = allstore.moduleStore().getCompStyles
      let compExampleId = allstore.panelStore().compExampleId
      findCompStyle(compStyle, compExampleId, data)
    },
    { deep: true }
  )

  watch(
    () => allstore.panelStore().structuralCssJson,
    (n) => {
      try {
        // data.title = n.name
        data.cssJson = n
      } catch (e) {
        console.log('值可能不存在')
      }
    },
    { deep: true }
  )
  watch(
    () => allstore.panelStore().structuralExampleStyleJson,
    (n) => {
      try {
        // data.title = n.name
        data.exampleStyleJson = n
      } catch (e) {
        console.log('值可能不存在')
      }
      // data.title = n.name
      data.exampleStyleJson = n
    },
    { deep: true }
  )
</script>

<style scoped>
  .stylePanel {
    background: rgb(255, 255, 255);
    text-align: center;
    border: 1px solid black;
    width: 99%;
    height: 100%;
  }
</style>
