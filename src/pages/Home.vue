<template>
  <div class="page-container">首页{{ Math.random() }}</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

// 测试组件执行loading
// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("我异步执行了");
//   }, 5000);
// });
// let sss = await p;
// console.log(sss);

onMounted(() => {
  console.log("我加载了");
});
</script>

<style lang="" scoped></style>
