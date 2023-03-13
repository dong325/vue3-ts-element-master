import router from "./router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from "@/util/auth";
import { useMenuStore } from "@/stores/counter";
import menuList from "@/util/menu";
NProgress.configure({ showSpinner: false })
const whiteList = ['/login'] // 路由白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  const meta = to.meta || {};
  if (getToken()) {
    if (to.path === "/login") {
      //如果登录成功访问登录页跳转到主页
      next({ path: "/" });
      NProgress.done()
    } else {
      // 若没有菜单，则存储
      const menuStore = useMenuStore();
      if (!menuStore.getMenuList.length) {
        menuStore.setMenuList(menuList);
      }
      // 若对接后台获取用户信息，则可在此进行判断
      next();
    }
  } else {
    // 若跳过验证或存在白名单，则进行访问
    if (meta.isAuth === false || whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
