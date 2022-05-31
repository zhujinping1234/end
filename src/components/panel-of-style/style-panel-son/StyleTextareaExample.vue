<template>
  <div style="margin-top: 15px">
    <textarea rows="16" style="width: 90%" v-model="data.styleJson"></textarea>
    <button @click="cssPush">组件样式</button>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { reactive, onMounted, watch } from 'vue'
  import allstore from '../../../store/stores/StoreAll'

  const props = defineProps({
    exampleCssJson: {
      type: String,
      required: true
    }
  })

  let $store = useStore()
  let data = reactive({
    styleJson: ''
  })

  watch(
    () => props.exampleCssJson,
    (n, o) => {
      data.styleJson = n
    },
    { deep: true, immediate: true }
  )

  //TODO增加一个style vuex存放组件，点击提交后修改vuex里对应style的值，redan()监听到变化重新渲染组件样式

  const cssPush = () => {
    // $store.commit('setCompStyle', {
    //   compID: allstore.panelStore().compExampleId,
    //   compStyle: data.styleJson
    // })
    allstore.styleStore().setCompStyle({
      compID: allstore.panelStore().compExampleId,
      compStyle: data.styleJson
    })
  }
</script>

<style scoped></style>
