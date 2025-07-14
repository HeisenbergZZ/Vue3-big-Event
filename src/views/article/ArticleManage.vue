<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatDate } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
//定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})
//控制抽屉的显示与隐藏
const loading = ref(false)
//定义文章列表
const articleList = ref([])
const total = ref(0) //总条数
const artGetList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
artGetList()

const onDeleteArticle = (row) => {
  console.log(row)
}
//每页条数变化
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  artGetList()
}
//当前页码变化
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  artGetList()
}
//搜索
const onSearch = () => {
  params.value.pagenum = 1
  artGetList()
}
//重置
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  artGetList()
}
const articleEditRef = ref()
//添加文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const onSuccess = (type) => {
  if (type === 'add') {
    //如果是新增，渲染最后一页
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
    artGetList()
  } else {
    ElMessage.success('编辑成功')
    artGetList()
  }
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <!-- inline表示内联表单，表单项水平排列.即都在一行显示 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 240px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          {{ formatDate(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            size="small"
            circle
            plain
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            type="danger"
            size="small"
            circle
            plain
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      style="margin-top: 20px; justify-content: flex-end"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:current-page="params.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      v-model:page-size="params.pagesize"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
