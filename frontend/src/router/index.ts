import userRoutes from './userRoutes';
import companyRoutes from './companyUserRoutes';
import publicRoutes from './publicRoutes';

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Cookies from 'js-cookie';

const routes: Array<RouteRecordRaw> = [
  ...publicRoutes,
  ...userRoutes,
  ...companyRoutes
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.userType == 'guest') {
    next();
  } else {
    const user = Cookies.get('user');
    const companyUser = Cookies.get('companyUser');

    if (to.meta.requiresAuth) {
      if (user && to.meta.userType == 'user') {
        next();
      } else if (companyUser && to.meta.userType == 'companyUser') {
        next();
      } else {
        next('/login');
      }
    } else {
      next();
    }
  }
  
});

export default router;
