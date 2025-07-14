<script setup>
import { getArticleListService, deleteArticleCateService } from '@/api/article'
import { onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const articleList = ref([])
const loading = ref(false)
const channelEditRef = ref()
const getArticleList = async () => {
  loading.value = true
  const res = await getArticleListService()
  articleList.value = res.data.data
  console.log(articleList.value)
  loading.value = false
}

getArticleList()

const handleEdit = (row, $index) => {
  // console.log(row, $index)
  channelEditRef.value.open(row)
}
const handleDelete = async (row, $index) => {
  await ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  await deleteArticleCateService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
const onAddChannel = () => {
  channelEditRef.value.open({})
}
const onSuccess = () => {
  getArticleList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="120" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="150">
        <!-- row是当前行数据，$index是当前行索引 -->
        <template #default="{ row, $index }">
          <el-button
            @click="handleEdit(row, $index)"
            type="primary"
            size="small"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="handleDelete(row, $index)"
            type="danger"
            size="small"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <channel-edit ref="channelEditRef" @success="onSuccess"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
