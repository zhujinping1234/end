<template>
  <div>
    <textarea rows="16" style="width: 90%" v-model="data.Json"></textarea>
    <button @click="cssPush">组件实例样式</button>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { reactive, onMounted, watch } from 'vue'
  import allstore from '../../../store/stores/StoreAll'

  const props = defineProps({
    sonCssJson: {
      type: String,
      required: true
    }
  })

  let $store = useStore()
  let data = reactive({
    Json: ''
  })

  watch(
    () => props.sonCssJson,
    (n, o) => {
      data.Json = n
    },
    { deep: true, immediate: true }
  )

  const cssPush = () => {
    allstore.panelStore().cssJson = data.Json
  }
</script>

<style scoped></style>
