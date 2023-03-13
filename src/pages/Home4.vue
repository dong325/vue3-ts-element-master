<template>
  <div class="page-container">首页{{ Math.random() }}</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("我加载了");
});
</script>

<style lang="" scoped></style>
