<script setup>
//定义props
defineProps({
  title: {
    required: true,
    type: String,
  },
})
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  // 设置最小高度为100%
  box-sizing: border-box;
  // 设置盒模型为border-box
  .card-header {
    display: flex;
    // 设置为flex布局
    justify-content: space-between;
    // 设置两端对齐
    align-items: center;
    // 设置垂直居中
  }
}
</style>
