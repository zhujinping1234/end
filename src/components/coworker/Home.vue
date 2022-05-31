<template>
<home-header></home-header>
    <router-view/>
 
</template>
<script setup lang="ts">

import { ref } from 'vue'
import HomeHeader from './HomeHeader.vue';

import {useStore} from './store'
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 如果未登录，则跳转到登录页面，并且带上跳转链接
 */
const fullPath=router.currentRoute.value.fullPath;
 console.log(fullPath);
 const currentUser=useStore().currentUser
if(currentUser){
    if(fullPath.toLowerCase()=='/home'){
        useStore().switchTeam(currentUser.username);
        router.replace('/home/'+currentUser.username);
    }
}else{
    //把当前链接copy过来并保存到跳转
    //跳转到登录界面
    router.push({name:'login',params:{redirect:fullPath} })
}








</script>
