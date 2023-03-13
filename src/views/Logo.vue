<template>
  <div class="logo-container f_r_c_c h100">
    <span v-if="!isCollapse">{{ title }}</span>
    <img v-else style="width: 30px; height: 30px" src="@/assets/logo.svg" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useMenuStore } from "@/stores/counter";
const t = import.meta.env.VITE_APP_TITLE;
const title = ref();
const menuStore = useMenuStore();

const isCollapse = computed(() => menuStore.getIsCollapse);

watch(
  isCollapse,
  (newVal, oldVal) => {
    setTimeout(() => {
      if (!newVal) {
        title.value = t;
      } else {
        title.value = "";
      }
    }, 300);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.logo-container {
  color: #fff;
}
</style>
