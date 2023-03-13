import { defineStore } from 'pinia'
import { getFirstMenu } from '@/util'
import settings from '../settings'
// 菜单
export const useMenuStore = defineStore('menu', {
  state: () => ({ 
    menuMap: {} as any, // 存储菜单index对应标题，用于面包屑回显
    menuList: [] as any, // 菜单列表
    isCollapse: false, // 菜单是否折叠
    defaltActive: '', // 菜单默认选中项
    breadList: [] as any, // 面包屑集合
    tagList: [] as any, // 选项卡集合
  }),
  getters: { 
    getIsCollapse: (state) => state.isCollapse,
    getDefaltActive: (state) => state.defaltActive,
    getMenuList: (state) => state.menuList,
    getBreadList: (state) => state.breadList,
    getTagList: (state) => state.tagList,
    getMenuMap: (state) => state.menuMap,
  },
  actions: {
    setIsCollapse(value: boolean) {
      this.isCollapse = value
    },
    setDefaltActive(value: string) {
      this.defaltActive = value
    },
    setMenuList(value: any[]) {
      this.menuList = value
      if (!value || !value.length) return
      // 根据菜单获取第一项
      let result = {
        defaltActive: '',
        breadList: [],
        tagList: [],
      }
      getFirstMenu(value[0], result)
      this.setDefaltActive(result.defaltActive)
      this.setBreadList(result.breadList)
      this.setTagList(result.tagList)
      
    },
    setBreadList(value: any[]) {
      this.breadList = value
    },
    setTagList(value: any[]) {
      this.tagList = value
    },
    setMenuMap(value: any) {
      this.menuMap = value
    },
    // 添加选项卡
    addTag(value: string) {
      // 1.判断是否已经添加过当前项
      const o = this.tagList.find((item: any) => {
        return item.index == value
      })
      // 2.未添加，则增加
      if (!o) {
        this.tagList.push(this.menuMap[value])
      }
      // 3.已增加，不处理
    },
    // 关闭当前项并返回打开项
    closeTagReturnPre(value: string) {
      let index = this.tagList.findIndex((item: any) => item.index == value)
      this.tagList.splice(index, 1)
      return this.tagList[index] || this.tagList[index-1]
    },
    // 关闭其他项，除去无法关闭项
    closeOthersTags(value: string) {
      this.tagList = this.tagList.filter((item:any) => {
        return item.index == value || item.affix
      })
    },
    // 关闭左边项
    closeLeftTags(value: string) {
      // 1.获取当前项下标
      let index = this.tagList.findIndex((item: any) => item.index == value)
      // 2.获取左边项
      let leftTags = this.tagList.slice(0, index)
      // 3.找到左边项不能关闭项
      let affixTag = leftTags.filter((item:any) => {
        return item.affix
      })
      // 4.获取右边项
      let rightTags = this.tagList.slice(index)
      // 5.合并无法删除项和右边项
      this.tagList = [...affixTag, ...rightTags]
    },
    // 关闭右边项
    closeRightTags(value: string) {
      // 1.获取当前项下标
      let index = this.tagList.findIndex((item: any) => item.index == value)
      // 2.获取右边项
      let rightTags = this.tagList.slice(index+1)
      // 3.找到右边项不能关闭项
      let affixTag = rightTags.filter((item:any) => {
        return item.affix
      })
      // 4.获取左边项
      let leftTags = this.tagList.slice(0, index+1)
      // 5.合并无法删除项和右边项
      this.tagList = [...leftTags, ...affixTag]
    },
    // 关闭所有项,并返回无法关闭项
    closeAllTags() {
      this.tagList = this.tagList.filter((item:any) => {
        return item.affix
      })
      return this.tagList[0] || {}
    }
  },
  // 配置本地存储
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})

// 设置
export const useSettingStore = defineStore('setting', {
  state: () => ({
    isShowTopNav: settings.isShowTopNav,
    isShowTags: settings.isShowTags,
    isShowLogo: settings.isShowLogo,
    isShowMenu: settings.isShowMenu,
  }),
  getters: { 
    getIsShowTopNav: (state) => state.isShowTopNav,
    getIsShowTags: (state) => state.isShowTags,
    getIsShowLogo: (state) => state.isShowLogo,
    getIsShowMenu: (state) => state.isShowMenu,
  },
})