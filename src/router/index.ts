import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import { filterBreadCrumb } from "@/utils/filterBreadCrumb";
import { filterRoute } from "@/utils/filterRoute";
import home from "@/store";
import { nextTick } from "vue";

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
      name: "首页",
      component: () =>
        import(/* webpackChunkName: "Layout" */ "../layout/index.vue"),
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
    },
  ],
});
const writeLists = ["login", "首页", ""];
router.beforeEach(async (to, from, next) => {
  // 通过路由name来判断当前的名称白名单:先进入系统。
  if (writeLists.includes(to.name as string)) {
    next();
    return;
  }
  await nextTick();

  // note:动态路由快速判断
  const homeStore = home();
  debugger

  if (homeStore.menuList.length) {
    homeStore.$patch({
      breadcrumbs: filterBreadCrumb(to.path, homeStore.menuList),
    });
    homeStore.addTags({ name: to.name as string, path: to.path });

    next();
    return;
  }
  const data = await homeStore.GenerateRoutes();
  const routers = filterRoute(data);
  routers.forEach((route: RouteRecordRaw) => {
    router.addRoute("首页", route);
  });

  next({ ...to, replace: true });
});

export default router;
