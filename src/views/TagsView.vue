<template>
  <div id="tags-view-container" class="tags-view-container" ref="tagsView">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <div
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.index"
        :class="isActive(tag) ? 'active' : ''"
        tag="span"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.stop="jumpMenu(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <el-icon
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
          ><CloseBold
        /></el-icon>
      </div>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <el-icon><RefreshRight /></el-icon> 刷新页面
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <el-icon><Close /></el-icon> 关闭当前
      </li>
      <li @click="closeOthersTags(selectedTag)">
        <el-icon><CircleClose /></el-icon> 关闭其他
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags(selectedTag)">
        <el-icon><Back /></el-icon> 关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags(selectedTag)">
        <el-icon><Right /></el-icon> 关闭右侧
      </li>
      <li @click="closeAllTags">
        <el-icon><CircleClose /></el-icon> 全部关闭
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  CloseBold,
  RefreshRight,
  Close,
  CircleClose,
  Back,
  Right,
} from "@element-plus/icons-vue";
import ScrollPane from "@/components/ScrollPane.vue";
import { useMenuStore } from "@/stores/counter";
import { forIndexGetTitle } from "@/util";
const menuStore = useMenuStore();
const route = useRoute();
const router = useRouter();
const tagsView = ref();
const left = ref<number>();
const top = ref<number>();
const visible = ref(false);
let selectedTag = reactive({} as any);
const visitedViews: any = computed(() => menuStore.getTagList);
// 获取菜单数据
const menuList = computed(() => menuStore.getMenuList);

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

const isActive = (tag: any) => {
  return tag.index === route.path;
};
const isAffix = (tag: any) => {
  return tag.affix;
};

const isFirstView = () => {
  try {
    return (
      selectedTag.index === visitedViews.value[0].index ||
      selectedTag.index === "/home"
    );
  } catch (err) {
    return false;
  }
};
const isLastView = () => {
  try {
    return (
      selectedTag.index ===
      visitedViews.value[visitedViews.value.length - 1].index
    );
  } catch (err) {
    return false;
  }
};
// 选项卡选中样式
const activeStyle = (tag: any) => {
  if (!isActive(tag)) return {};
  return {
    "background-color": "#409EFF",
    "border-color": "#409EFF",
  };
};
// 跳转页面
const jumpMenu = (tag: any) => {
  let path = tag.index;
  if (path.includes("/redirect")) return;
  let arr = [] as any;
  forIndexGetTitle(menuList.value, path, arr);
  menuStore.setBreadList(arr);
  menuStore.setDefaltActive(path);
  router.push(path);
};
// 关闭当前项
const closeSelectedTag = (tag: any) => {
  closeMenu();
  let preTag = menuStore.closeTagReturnPre(tag.index);
  if (tag.index != route.path) return;
  jumpMenu(preTag);
};
// 打开下拉菜单
const openMenu = (tag: any, e: any) => {
  const menuMinWidth = 105;
  const offsetLeft = tagsView.value.getBoundingClientRect().left; // container margin left
  const offsetWidth = tagsView.value.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const l = e.clientX - offsetLeft + 15; // 15: margin right
  if (l > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = l;
  }
  top.value = e.clientY - 60;
  visible.value = true;
  selectedTag = tag;
};
// 隐藏下拉项
const closeMenu = () => {
  visible.value = false;
};

// 滚动隐藏下拉菜单
const handleScroll = () => {
  closeMenu();
};

// 刷新
const refreshSelectedTag = (tag: any) => {
  closeMenu();
  router.replace("/redirect?fullPath=" + tag.index);
};
// 关闭其他项
const closeOthersTags = (tag: any) => {
  closeMenu();
  menuStore.closeOthersTags(tag.index);
  // 关闭项不是打开项，则跳转
  if (tag.index != route.path) {
    jumpMenu(tag);
  }
};
// 关闭左边
const closeLeftTags = (tag: any) => {
  closeMenu();
  menuStore.closeLeftTags(tag.index);
  // 关闭项不是打开项，则跳转
  if (tag.index != route.path) {
    jumpMenu(tag);
  }
};
// 关闭右边
const closeRightTags = (tag: any) => {
  closeMenu();
  menuStore.closeRightTags(tag.index);
  // 关闭项不是打开项，则跳转
  if (tag.index != route.path) {
    jumpMenu(tag);
  }
};
// 关闭所有
const closeAllTags = () => {
  closeMenu();
  let preTag = menuStore.closeAllTags();
  if (!preTag.index) return;
  jumpMenu(preTag);
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    :deep(.el-scrollbar__view) {
      display: flex;
    }
    .tags-view-item {
      display: flex;
      width: fit-content;
      align-items: center;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      margin-left: 5px;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
