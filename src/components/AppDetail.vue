<template>
  <div class="box">
    <div style="display: flex;flex-flow: column ;align-items: stretch;">
      <app-service/>
      <div style="flex-basis:100%;display: flex;flex-flow: column ;align-items: stretch;overflow: hidden;">
        <router-view/> 
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppService from './AppService.vue';
import { provide, readonly, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

const routers = useRouter()
//设置响应式appInstanceId
const appInstanceId: Ref<string> = ref(routers.currentRoute.value.params.appInstanceId as string);

//当前APP实例的ID 只读响应式Ref<string>
provide("appInstanceId", readonly(appInstanceId));


</script>

