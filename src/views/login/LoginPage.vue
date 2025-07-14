<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService } from '@/api/user'
import { userLoginService } from '@/api/user'
import { watch } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 获取路由实例，用于页面跳转
const router = useRouter()
// 获取用户状态管理store
const userStore = useUserStore()
// 控制注册/登录表单的显示
const isRegister = ref(true)
// 用于表单校验的ref对象
const form = ref()

// 表单数据对象
const fromModel = ref({
  username: '',
  password: '',
  repassword: '',
})

// 表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    //非空校验,失去焦点时校验. required: true 非空校验
    { min: 5, max: 10, message: '用户名长度在5-10个字符之间', trigger: 'blur' },
    //长度校验,失去焦点时校验. min: 5 最小长度, max: 10 最大长度
    { pattern: /^[a-zA-Z0-9]+$/, message: '用户名只能包含字母和数字', trigger: 'blur' },
    //正则校验,失去焦点时校验. pattern: /^[a-zA-Z0-9]+$/ 正则表达式
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度在6-12个字符之间', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含字母和数字', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度在6-12个字符之间', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含字母和数字', trigger: 'blur' },
    {
      trigger: 'blur',
      validator: (rule, value, callback) => {
        // 自定义校验：确保两次输入的密码一致
        if (value !== fromModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
    },
  ],
}

// 注册方法
const Register = async () => {
  await form.value.validate() // 校验表单
  await userRegisterService(fromModel.value) // 调用注册接口
  ElMessage.success('注册成功') // 提示注册成功
  isRegister.value = false // 切换到登录表单
}

// 监听表单切换，重置表单内容
watch(isRegister, () => {
  fromModel.value = {
    username: '',
    password: '',
    repassword: '',
  }
})

// 登录方法
const Login = async () => {
  await form.value.validate() // 校验表单
  const res = await userLoginService(fromModel.value) // 调用登录接口
  userStore.setToken(res.data.token) // 存储token到store中
  ElMessage.success('登录成功') // 提示登录成功
  router.push('/') // 跳转到首页
}
</script>

<template>
  <!-- 校验相关：
   （1）el-form => :model ="fromModel" 绑定的整个form的数据对象
    (2) el-form => :rules="rules" 绑定的整个rules规则对象
    (3) 表单元素 =>v-model ="ruleForm.xxx" 给表单元素绑定form的子属性
    (4) prop配置生效的是哪个校验规则(和rules中的字段对应) -->

  <!-- 登录注册页面布局 -->
  <!-- 使用 el-row 和 el-col 栅格系统进行页面布局 -->
  <el-row class="login-page">
    <!-- 左侧背景图列，占据12列宽度 -->
    <el-col :span="12" class="bg"></el-col>
    <!-- 右侧表单列，占据6列宽度，向右偏移3列 -->
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <!-- 通过 v-if 控制表单的显示和隐藏 -->
      <el-form
        :rules="rules"
        :model="fromModel"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <!-- 表单标题 -->
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="fromModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="fromModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 确认密码输入框 -->
        <el-form-item prop="repassword">
          <el-input
            v-model="fromModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button @click="Register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <!-- 返回登录链接 -->
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录表单 -->
      <el-form :model="fromModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <!-- 表单标题 -->
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="fromModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="fromModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 记住我和忘记密码区域 -->
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="Login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <!-- 注册链接 -->
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
