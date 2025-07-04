<script setup>
import { useUserStore } from './stores/index'
const userStore = useUserStore()
</script>

<template>
  <div>
    我是App
    <router-view></router-view>
    <hr />
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('123456')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
