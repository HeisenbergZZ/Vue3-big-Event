<script setup>
// 导入所需的 Element Plus 图标组件
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
// 导入默认头像
import avatar from '@/assets/default.png'
const userStore = useUserStore()
onMounted(() => {
  //在组件挂载时获取用户的基本信息
  userStore.getUser()
})
const router = useRouter()
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确定退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      userStore.removeToken()
      userStore.setUser({})
      router.push('/login')
    })
  } else {
    router.push(`/user/${command}`) //跳转到个人中心
  }
}
</script>

<template>
  <!-- 整体布局容器 -->
  <el-container class="layout-container">
    <!-- 左侧边栏 -->
    <el-aside width="200px">
      <!-- 左侧边栏顶部Logo -->
      <div class="el-aside__logo"></div>
      <!-- 左侧导航菜单 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <!--el-manu中router 开启路由模式 ,
        el-menu-item 的index属性是路由的path-->
        <!-- 文章分类菜单项 -->
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <!-- 文章管理菜单项 -->
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!-- 个人中心子菜单 -->
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <!-- 基本资料子菜单项 -->
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <!-- 更换头像子菜单项 -->
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <!-- 重置密码子菜单项 -->
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧内容区域 -->
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header>
        <!-- 用户信息显示 -->
        <div>
          程序员：<strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
        </div>
        <!-- 用户头像下拉菜单 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- 下拉菜单选项 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 主要内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部版权信息 -->
      <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
// 布局容器样式
.layout-container {
  height: 100vh;
  // 左侧边栏样式
  .el-aside {
    background-color: #232323;
    // Logo样式
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    // 移除菜单右侧边框
    .el-menu {
      border-right: none;
    }
  }
  // 顶部导航栏样式
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // 用户头像下拉框样式
    .el-dropdown__box {
      display: flex;
      align-items: center;
      // 下拉图标样式
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      // 移除点击时的轮廓
      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  // 底部版权信息样式
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
