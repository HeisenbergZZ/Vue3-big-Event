<script setup>
import { ref } from 'vue'
import { addArticleCateService, editArticleCateService } from '@/api/article'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['success']) //定义一个success事件，用于通知父组件
const dialogVisible = ref(false)
//组件对外暴露一个open方法，基于open传来的数据，区分添加还是编辑
//open({})即传过来的为空，无需渲染，表示为添加
//open({...})即传过来的有内容，表示为编辑,需要渲染
//open调用后打开弹窗
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
  // 将row的值赋值给formModel
}
defineExpose({
  open,
})
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
const rules = ref({
  //required: true 表示必填
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^.{1,10}$/, message: '分类名称长度在1-10个字符之间', trigger: 'blur' },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名长度在1-15个字符之间', trigger: 'blur' },
  ],
})
const formRef = ref()
const onSubmit = async () => {
  await formRef.value.validate() //表单验证
  if (formModel.value.id) {
    //编辑
    await editArticleCateService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    //添加
    await addArticleCateService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success') //通知父组件，添加或编辑成功
}
</script>
<template>
  <el-dialog :title="formModel.id ? '编辑分类' : '添加分类'" width="30%" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
