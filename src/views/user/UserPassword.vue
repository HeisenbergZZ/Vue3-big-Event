<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdatePasswordService } from '@/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()
// 表单数据
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

// 表单ref
const formRef = ref()

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
}

// 校验新密码和原密码不能相同
const validateNewPwd = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

// 校验确认密码必须和新密码相同
const validateRePwd = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 表单校验规则
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度应为6-15位', trigger: 'blur' },
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度应为6-15位', trigger: 'blur' },
    { validator: validateNewPwd, trigger: 'blur' },
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度应为6-15位', trigger: 'blur' },
    { validator: validateRePwd, trigger: 'blur' },
  ],
}

// 提交表单
const submitForm = async () => {
  await formRef.value?.validate()
  await userUpdatePasswordService(pwdForm.value)
  ElMessage.success('修改密码成功')
  resetForm()
  // 跳转到登录页
  router.push('/login')
}
</script>

<template>
  <page-container title="重置密码">
    <el-form
      ref="formRef"
      :model="pwdForm"
      :rules="rules"
      label-width="100px"
      size="large"
      status-icon
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password" placeholder="请输入原密码" />
      </el-form-item>

      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password" placeholder="请输入新密码" />
      </el-form-item>

      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password" placeholder="请确认新密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">修改密码</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
.el-form {
  width: 500px;
  margin: 20px 0;
}
</style>
