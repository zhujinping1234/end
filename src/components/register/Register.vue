<template>
  <div class="backimage">
    <el-form
      class="login-form"
      style="width: 500px; margin: 10 auto"
      :model="registerForm"
      :rules="rules"
    >
      <div class="title">
        <h3 style="color: white">欢迎注册weblock</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名">
          <template #prefix>
            <el-icon class="el-input__icon"><avatar style="width: 30px; height: 30px" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="registerForm.name" placeholder="名称">
          <template #prefix>
            <el-icon class="el-input__icon"><avatar style="width: 30px; height: 30px" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="registerForm.phone" placeholder="手机号">
          <template #prefix>
            <el-icon class="el-input__icon"><avatar style="width: 30px; height: 30px" /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="registerForm.password" show-password placeholder="密码">
          <template #prefix>
            <el-icon el-icon class="el-input__icon"
              ><briefcase style="width: 30px; height: 30px"
            /></el-icon>
          </template>
        </el-input>
        <div>
          <el-button style="width: 100%; margin-top: 5px" type="primary" @click="register()"
            >立即注册</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import axios from 'axios'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { post } from '../../axios/index'
  const rules = ref({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 1, max: 15, message: '长度在1 到 15 个字符之间', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 1, max: 15, message: '长度在1 到 15 个字符之间', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 15, message: '长度在5 到 15 个字符之间', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
    ]
  })
  const registerForm = ref<any>({
    username: '',
    name: '',
    password: '',
    phone: ''
  })
  const router = useRouter()
  const data = registerForm.value
  const register = () => {
    post('/user/signup', data).then((res: any) => {
      console.log('注册成功')
    })
    router.push('/')
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
    background-image: url('../../assets/15.jpg');
    background-size: 100% 100%;
    margin: auto;
    text-align: center;
  }
</style>
