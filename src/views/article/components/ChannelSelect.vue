<script setup>
//文章分类组件
import { getArticleListService } from '@/api/article'
import { onMounted, ref } from 'vue'
//定义props
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  width: {
    type: String,
  },
})
//定义emit
const emit = defineEmits(['update:modelValue'])

const articleList = ref([])
const getArticleList = async () => {
  const res = await getArticleListService()
  articleList.value = res.data.data
  console.log(articleList.value)
}
getArticleList()
</script>
<template>
  <!-- 双向绑定 -->
  <el-select
    :style="{ width }"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <!-- label是显示的值，value是提交给后台的值 -->
    <el-option
      v-for="item in articleList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
