<template>
    <div class="box" >
        <Team></Team>
        <Add></Add>

        <Profile></Profile>
    </div>
    <!--
        logo,团队，个人
    -->
</template>
<script setup lang="ts" >
import Team from './Team.vue';
import Add from './Add.vue';
import Profile from './Profile.vue';
import Vue from 'vue'
import { useStore } from './store'




</script>
<style scoped>
.box{
    display: flex;
    flex-direction:row;
  flex-wrap: nowrap | wrap | wrap-reverse;
}
</style>