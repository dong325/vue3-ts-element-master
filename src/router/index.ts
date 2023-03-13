import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/Main.vue'
/*
  keepAlive: false, // 是否缓存当前页面
  transition: '', // 自定义组件加载动画
  affix // 选项卡是否允许关闭
*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            keepAlive: false,
            transition: '',
            affix: true,
          },
          component: () => import('../pages/Home.vue')
        },
        {
          path: '/oneLevel',
          name: 'oneLevel',
          meta: {
            keepAlive: false,
            transition: '',
          },
          component: () => import('../pages/Home7.vue')
        },
        {
          path: '/twoLevel1',
          name: 'twoLevel1',
          meta: {
            keepAlive: false,
            transition: '',
          },
          component: () => import('../pages/Home2.vue')
        },
        {
          path: '/twoLevel2',
          name: 'twoLevel2',
          meta: {
            keepAlive: false,
            transition: '',
          },
          component: () => import('../pages/Home3.vue')
        },
        {
          path: '/twoLevel3',
          name: 'twoLevel3',
          meta: {
            keepAlive: false,
            transition: '',
          },
          component: () => import('../pages/Home4.vue')
        },
        {
          path: '/threeLevel1',
          name: 'threeLevel1',
          meta: {
            keepAlive: false,
            transition: '',
          },
          component: () => import('../pages/Home5.vue')
        },
        {
          path: '/threeLevel2',
          name: 'threeLevel2',
          meta: {
            keepAlive: false, // 是否缓存当前页面
            transition: '', // 自定义组件加载动画
          },
          component: () => import('../pages/Home6.vue')
        },
        {
          path: '/redirect',
          name: 'redirect',
          meta: {
            keepAlive: false, // 是否缓存当前页面
            transition: '', // 自定义组件加载动画
          },
          component: () => import('../pages/Redirect.vue')
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    
  ]
})

export default router
