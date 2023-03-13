<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
      item.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/counter";
// 状态管理
const menuStore = useMenuStore();
// 菜单展开/隐藏
const breadList = computed(() => menuStore.getBreadList);
</script>

<style lang="" scoped></style>
