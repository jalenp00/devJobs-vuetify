import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UAboutView from '../views/user/UAboutView.vue'
import UserLoginView from '../views/user/UserLoginView.vue'
import UserSignupView from '../views/user/UserSignUpView.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
