<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
// const tagAndTagSpacing = 4; // tagAndTagSpacing
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
const scrollContainer = ref();

const scrollWrapper = computed(() => {
  return scrollContainer.value.wrapRef;
});

const emit = defineEmits(["scroll"]);
const emitScroll = () => {
  emit("scroll");
};

const handleScroll = (e: any) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40;
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
};

onMounted(() => {
  scrollWrapper.value.addEventListener("scroll", emitScroll, true);
});
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener("scroll", emitScroll);
});
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  // :deep(.el-scrollbar__bar) {
  //   bottom: 0px;
  //   height: 49px;
  // }
}
</style>
