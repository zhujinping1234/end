<template>
  <div class="backimage">
    <el-form
      class="login-form"
      style="width: 500px; margin: 10 auto"
      :model="loginForm"
      :rules="rules"
    >
      <div class="title">
        <h3 style="color: white">weblock</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名">
          <template #prefix>
            <el-icon class="el-input__icon"><avatar style="width: 30px; height: 30px" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" show-password placeholder="密码">
          <template #prefix>
            <el-icon el-icon class="el-input__icon"
              ><briefcase style="width: 30px; height: 30px"
            /></el-icon>
          </template>
        </el-input>
        <div>
          <el-button style="width: 100%; margin-top: 5px" type="primary" @click="Login()"
            >登入</el-button
          >
        </div>
        <div>
          <p style="color: white"
            >没有账号？ <span class="register" @click="register()">点此注册</span></p
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import axios from 'axios'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { post } from '../../axios/index'
  import { useStore } from '../coworker/store'
  const rules = ref({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 1, max: 15, message: '长度在1 到 15 个字符之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 1, max: 15, message: '长度在1 到 15 个字符之间', trigger: 'blur' }
    ]
  })
  const loginForm = ref<any>({
    username: '',
    password: ''
  })

  onMounted(() => {
    window.sessionStorage.setItem('token', '')
  })
  const router = useRouter()
  const data = loginForm.value
  //如果有登录后需要跳转的链接，则跳转
  const redirectRoute=(router.currentRoute.value.params.redirect || '/home' ) as string
  const Login =  async () => {
  
    await useStore().login(data.username,data.password);
     //链接跳转
    router.push(redirectRoute);
  }
  const register = () => {
    router.push('/Register')
  }
</script>
<style lang="scss" scoped>
  .backimage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    position: relative;
    background-image: url('../../assets/4.jpg');
    background-size: 100% 100%;
    margin: auto;
    text-align: center;
  }
  .register {
    color: rgb(136, 173, 252);
    cursor: pointer;
  }
</style>
