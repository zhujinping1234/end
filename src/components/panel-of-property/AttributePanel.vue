<template>
  <div class="panel">
    <!-- <h3>属性面板</h3> -->
    <!-- <attributeTextarea v-if="data.title != ''" :JsonData="JSON.stringify(data.json)" /> -->
    <PropertiesEditor :compMeta="compMeta" :comps="comps"></PropertiesEditor>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { reactive, onMounted, watch, ref, onUnmounted } from 'vue'
  import attributeTextarea from './attribute/AttributeTextarea.vue'
  import PropertiesEditor from '../we-editor/PropertiesEditor.vue'
  import { findComponentAttributeById } from '../panel-of-drag/recursive'
  import allstore from '../../store/stores/StoreAll'

  const $store = useStore()

  let compMeta = ref({id:"",name:'',comp_id:'',finput:''})
  let comps = ref([])

  let data = reactive({
    title: '',
    json: {}
  })

  onMounted(() => {
    compMeta.value = allstore.moduleStore().getCurrentPage
    comps.value = allstore.moduleStore().getCompStyles
    console.log(compMeta.value)
  })
  // onUnmounted(() => {
  //   console.log('421')
  // })
  watch(
    () => allstore.panelStore().CompName,
    (n) => {
      data.title = n
      let compID = allstore.panelStore().CompId
      let pageInfo = allstore.moduleStore().getCurrentPage
      findComponentAttributeById(pageInfo, compID, data)
    },
    { deep: true }
  )

  // watch(
  //   () => $store.state.PanelData.attributePanelData,
  //   (n) => {
  //     data.title = n.name
  //     data.json = n
  //   },
  //   { deep: true }
  // )

  // watch(
  //   () => $store.state.PanelData.getCurrentPage,
  //   (n) => {
  //     compMeta.value = n
  //   },
  //   { deep: true }
  // )

  // watch(
  //   () => $store.state.PanelData.attributeChange,
  //   (n) => {
  //     compMeta.value = $store.getters.getCurrentPage
  //   },
  //   { deep: true }
  // )
</script>

<style scoped>
  .panel {
    background: rgb(255, 255, 255);
    text-align: left;
    border: 1px solid black;
    width: 100%;
    height: 100%;
  }
  .container {
    position: fixed;
    height: 100%;
    width: 1000px;
  }
</style>
