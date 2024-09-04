import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UAboutView from '../views/user/UAboutView.vue'
import UserLoginView from '../views/user/UserLoginView.vue'
import UserSignupView from '../views/user/UserSignUpView.vue'
import UserSignOut from '../views/user/UserSignOutView.vue'
import { useStore } from 'vuex';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/about',
    name: 'about',
    component: UAboutView
  },
  {
    path: '/login',
    name: 'login',
    component: UserLoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: UserSignupView
  },
  {
    path: '/signout',
    name: 'signout',
    component: UserSignOut
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.state.user !== null;
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Always allow access to non-protected routes
  }
});

export default router
