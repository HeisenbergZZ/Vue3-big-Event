<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { userUpdateService } from '@/api/user'

const userStore = useUserStore()
const {
  user: { email, nickname, id, username },
  getUser,
} = userStore

// 表单数据对象
const form = ref({
  id, // 用户id
  nickname, // 用户昵称
  email, // 用户邮箱
})

// 用户名展示
const usernameShow = ref(username)

// 表单验证规则
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称' },
    { min: 2, max: 10, message: '昵称长度必须是2-10位的非空字符串' },
  ],
  email: [
    { required: true, message: '请输入用户邮箱' },
    { type: 'email', message: '请输入正确的邮箱格式' },
  ],
}

// 表单ref
const formRef = ref()

// 提交方法
const onSubmit = async () => {
  //等待表单验证
  await formRef.value.validate()
  //调用接口更新用户信息
  await userUpdateService(form.value)
  getUser()
  //判断是否更新成功
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" size="large">
      <el-form-item label="登录名称">
        <el-input v-model="usernameShow" disabled />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped lang="scss">
.el-form {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}
</style>
