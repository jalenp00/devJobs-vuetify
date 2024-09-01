import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobView from '../views/listing/NewListingView.vue'
import UserLoginView from '../views/user/UserLoginView.vue'
import UserSignupView from '../views/user/UserSignUpView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/job',
    name: 'job',
    component: JobView
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
