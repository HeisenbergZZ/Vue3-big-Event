<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artAddService, artGetInfoService, artEditService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const emit = defineEmits(['success'])
const editorRef = ref()
const formModel = ref({
  title: '',
  content: '',
  cate_id: '',
  state: '',
  cover_img: '',
})
const drawer = ref(false)
const imgUrl = ref('')

async function getFile(imgUrl, fileName) {
  try {
    const res = await axios.get(imgUrl, { responseType: 'arraybuffer' })
    const blob = new Blob([res.data], { type: res.headers['content-type'] })
    const file = new File([blob], fileName, { type: res.headers['content-type'] })
    return file
  } catch (err) {
    console.log(err)
    return null
  }
}
const open = async (row) => {
  drawer.value = true
  if (row.id) {
    const res = await artGetInfoService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + res.data.data.cover_img
    //需要将网络图片地址转换为file对象存储起来
    const file = await getFile(imgUrl.value, res.data.data.cover_img)
    formModel.value.cover_img = file
    console.log(res)
    // formModel.value.content = res.data.content
    // imgUrl.value = res.data.cover_img
    // editorRef.value.setContents(res.data.content)
  } else {
    //重置表单数据,但图片的img地址，富文本编辑器的内容保留
    formModel.value = {
      title: '',
      content: '',
      cate_id: '',
      state: '',
      cover_img: '',
    }
    imgUrl.value = ''
    // 直接设置content为空字符串来清空编辑器
    editorRef.value.setContents('')
  }
}

const handleChangeFile = (uploadFile) => {
  // 设置预览图片
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 将文件对象赋值给 cover_img
  formModel.value.cover_img = uploadFile.raw
}

const onSubmit = async (state) => {
  const fd = new FormData()
  formModel.value.state = state
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  //编辑操作
  if (formModel.value.id) {
    await artEditService(fd)
    ElMessage.success('编辑成功')
    drawer.value = false
    //通知父组件刷新列表
    emit('success', 'edit')
  } else {
    await artAddService(fd)
    ElMessage.success('新增成功')
    drawer.value = false
    //通知父组件刷新列表
    emit('success', 'add')
    console.log('新增操作')
  }
}
// const onDraft = async (state) => {
//   formModel.value.state = state
//   const fd = new FormData()
//   for (let key in formModel.value) {
//     fd.append(key, formModel.value[key])
//   }
//   await artAddService(fd)
//   ElMessage.success('草稿保存成功')
//   drawer.value = false
// }
defineExpose({
  open,
})
</script>
<template>
  <!-- 抽屉 -->
  <el-drawer
    v-model="drawer"
    title="大标题"
    :direction="rtl"
    :before-close="handleClose"
    size="50%"
  >
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 需要关闭自动上传，不需要配置action参数 -->
        <!-- action:后端上传接口 -->
        <!-- 只需做本地文件预览：URL.createObjectURL(file) -->
        <el-upload
          :on-change="handleChangeFile"
          class="upload-demo"
          :show-file-list="false"
          :auto-upload="false"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- 富文本编辑器 -->
          <div class="editor">
            <quill-editor
              ref="editorRef"
              theme="snow"
              v-model:content="formModel.content"
              content-type="html"
            >
              <!-- content-type:html -->
            </quill-editor>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('已发布')">发布</el-button>
        <el-button type="info" @click="onSubmit('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.upload-demo {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
