<script setup>
import { ref } from 'vue'
import defaultAvatar from '@/assets/default.png'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'
import { userUpdateAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'
const uploadRef = ref()
const userStore = useUserStore()
const avatar = ref(userStore.user.user_pic)

// 处理文件选择变化
const handleAvatarChange = (file) => {
  // 创建 FileReader 对象来读取文件
  const reader = new FileReader()
  // 读取文件完成后的回调
  reader.onload = (e) => {
    // 将读取的文件内容设置为预览图片的源
    avatar.value = e.target.result
  }
  // 以 Base64 格式读取文件
  reader.readAsDataURL(file.raw)
}

const handleUpload = async () => {
  try {
    //发送请求
    await userUpdateAvatarService({ avatar: avatar.value })
    await userStore.getUser()
    ElMessage.success('上传成功')
  } catch (error) {
    ElMessage.error('上传失败')
  }
}
</script>
<template>
  <page-container title="更换头像">
    <!-- 头像预览区域 -->
    <div class="avatar-container">
      <el-upload
        ref="uploadRef"
        class="avatar-upload"
        :show-file-list="false"
        :on-change="handleAvatarChange"
        :auto-upload="false"
        accept=".jpg,.jpeg,.png,.gif"
      >
        <img v-if="avatar" :src="avatar" alt="头像预览" class="avatar-img" />
        <el-icon v-else class="avatar-upload"><Plus /></el-icon>
      </el-upload>
    </div>

    <!-- 按钮区域 -->
    <div class="button-container">
      <el-upload
        class="upload-btn"
        :auto-upload="false"
        :show-file-list="false"
        accept=".jpg,.jpeg,.png,.gif"
        :on-change="handleAvatarChange"
      >
        <el-button type="primary">选择头像</el-button>
      </el-upload>
      <el-button type="success" class="ml-4" @click="handleUpload">上传头像</el-button>
    </div>
  </page-container>
</template>

<style scoped>
.avatar-container {
  width: 350px;
  height: 350px;
  border: 1px dashed #ccc;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.avatar-img {
  width: 350px;
  height: 350px;
  object-fit: contain;
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.button-container {
  margin-top: 20px;
}

.ml-4 {
  margin-left: 16px;
}

.upload-btn {
  display: inline-block;
}

.avatar-upload {
  font-size: 28px;
  color: #8c939d;
}
</style>
