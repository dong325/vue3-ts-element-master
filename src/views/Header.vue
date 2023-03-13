<template>
  <div class="header-container f_r_s_b h100">
    <div class="f_r_s_c">
      <el-icon class="cursor_pointer">
        <expand v-if="isCollapse" @click="collapseHandle(false)" />
        <fold v-else @click="collapseHandle(true)" />
      </el-icon>
      <el-icon class="mL10 cursor_pointer mR10" @click="refreshHandle()"
        ><RefreshRight
      /></el-icon>
      <BreadcrumnVue />
    </div>
    <el-dropdown @command="commandHandle">
      <span class="f_r_c_c">
        <el-avatar
          class="mR5"
          :size="30"
          src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
        />
        admin
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="out">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/counter";
import { Fold, Expand, RefreshRight } from "@element-plus/icons-vue";
import BreadcrumnVue from "./Breadcrumb.vue";
import { removeToken } from "@/util/auth";
// 获取路由实例
const router = useRouter();
// 初始化menuStore
const menuStore = useMenuStore();
// 获取getter
const isCollapse = computed(() => menuStore.getIsCollapse);
// 设置isCollapse值
const collapseHandle = (type: boolean) => {
  menuStore.setIsCollapse(type);
};
// 刷新当前页面
const refreshHandle = () => {
  router.replace("/redirect?fullPath=" + router.currentRoute.value.fullPath);
};
// 下拉菜单
const commandHandle = (command: string) => {
  // 注销
  if (command == "out") {
    removeToken();
    // router.push("/login");
    window.location.reload();
  }
};
</script>

<style lang="scss" scoped>
.header-container {
}
</style>
