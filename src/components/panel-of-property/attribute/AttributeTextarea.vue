<template>
  <div>
    <textarea rows="25" style="width: 90%" v-model="data.Json"></textarea>
    <!-- <input style="width: 200px; height: 400px;" @input="moveJson($event)" v-model='data.json'/> -->
  </div>
  <button @click="dataPush()">数据推送</button>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { reactive, onMounted, watch } from 'vue'
  import allstore from '../../../store/stores/StoreAll'

  const props = defineProps({
    JsonData: {
      type: String,
      required: true
    }
  })

  let $store = useStore()
  let data = reactive({
    Json: ''
  })

  watch(
    () => props.JsonData,
    (n, o) => {
      data.Json = n
    },
    { deep: true, immediate: true }
  )

  const dataPush = () => {
    allstore.panelStore().json = JSON.parse(data.Json)
  }
</script>

<style scoped></style>
