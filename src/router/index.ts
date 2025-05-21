import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import { Storage } from "@/utils/storage";
import { filterBreadCrumb } from "@/utils/filterBreadCrumb";
import { filterRoute } from "@/utils/filterRoute";
import home from "@/store";

// import { nextTick } from "vue";

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "",
      component: () =>
        import(/* webpackChunkName: "Layout" */ "../layout/index.vue"),
      children: [
        {
          path: "upload",
          name: "upload",
          component: () => import("../views/upload/index.vue"),
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/404.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/login.vue"),
    }
  ],
});
// TODO: 白名单逻辑有个问题，需要修复。
// 这里login登录成功后，这里跳转到默认主页upload，但是
// 
router.beforeEach(async (to, from, next) => {
  const token = Storage.get('token');


  // 未登录状态
  if (!token) {
    if (to.name === 'login') {
      next();
    } else {
      next({ name: 'login' });
    }
    return;
  }

  // 已登录状态下访问登录页面，重定向到首页
  if (to.name === 'login' || to.name === '') {
    next({ name: 'upload' });
    return;
  }

  const homeStore = home();

  // 首次访问，获取菜单数据
  if (!homeStore.menuList.length) {
    try {
      const data = await homeStore.GenerateRoutes();
      const routers = filterRoute(data);
      routers.forEach((route: RouteRecordRaw) => {
        router.addRoute('首页', route);
      });
      // 这里直接放行，不需要 replace
      next();
    } catch (error) {
      next({ name: 'login' });
    }
    return;
  }

  // 已有菜单数据，更新面包屑和标签
  homeStore.$patch({
    breadcrumbs: filterBreadCrumb(to.path, homeStore.menuList),
  });
  homeStore.addTags({ name: to.name as string, path: to.path });
  next();
});

export default router;
