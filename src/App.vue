<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useUserStore } from './stores/index'
const userStore = useUserStore()
console.log(userStore)
</script>

<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
