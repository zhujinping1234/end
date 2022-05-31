<template>
    <div></div>
    <!--
谁邀请你参与哪个团队？
提醒谁邀请你参与某团队，是否接受？
如果未登录，请跳转登录界面

如果选择否，直接跳回默认首页
如果选择时，跳转到该团队项目首页
    -->

    <p>{{ invitation.who }}</p>邀请你参与<p>{{ invitation.team }}</p>
    <p>团队角色为:{{invitation.role}}</p>

    <button @click="acceptInvitation">接受</button>
    <button @click="declineInvitation">拒绝</button>
</template>
<script setup lang="ts">
import {useStore} from './store'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  inviteId: {
    type: String,
    required:true
  }
})

const invitation=useStore().getInvitation(props.inviteId);



//http://localhost:7777/home/invite/:invitid

const acceptInvitation=async function(){
   await useStore().acceptInvitation(props.inviteId);
   //如果选择时，跳转到该团队项目首页
   router.push('/home/'+invitation.teamId);
}

const declineInvitation=async function(){
   await useStore().declineInvitation(props.inviteId);
   //如果选择否，直接跳回默认首页
   router.push('/home/');
}




</script>

