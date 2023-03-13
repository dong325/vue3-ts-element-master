<template>
  <el-sub-menu :index="item.index" v-if="item.children && item.children.length">
    <template #title>
      <el-icon>
        <location />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <menu-item
      v-for="child in item.children"
      :key="child.index"
      :item="child"
    ></menu-item>
  </el-sub-menu>
  <el-menu-item :index="item.index" v-else>
    <el-icon><location /></el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { Location } from "@element-plus/icons-vue";
// const props = defineProps({
//         item: Object,
// })

// 给props指定默认值
interface Props {
  item: any;
}
withDefaults(defineProps<Props>(), {
  item: () => ({}),
});
</script>

<style lang="" scoped></style>
