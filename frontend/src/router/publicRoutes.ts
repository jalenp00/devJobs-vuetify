import HomeView from '../views/public/HomeView.vue';
import AboutView from '../views/public/AboutView.vue';
import UserLoginView from '../views/user/UserLoginView.vue';
import UserSignupView from '../views/user/UserSignUpView.vue';
import companyUserLogin from '../views/companyUser/UserLoginView.vue';

const publicRoutes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: { requiresAuth: false, userType: 'guest'}
    },
    {
      path: '/signup',
      name: 'signup',
      component: UserSignupView,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    {
      path: '/login',
      name: 'login',
      component: UserLoginView,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    {
      path: '/cu-login',
      name: 'cu-login',
      component: companyUserLogin,
      meta: { requiresAuth: false, userType: 'guest'}
    }
];

export default publicRoutes;