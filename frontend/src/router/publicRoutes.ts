import HomeView from '../views/public/HomeView.vue';
import AboutView from '../views/public/AboutView.vue';
import UserLoginView from '../views/user/UserLoginView.vue';
import UserSignupView from '../views/user/UserSignUpView.vue';
import CompanyUserLogin from '../views/companyUser/UserLoginView.vue';
import SingleListingView from '../views/listing/SingleListing.vue';
import GetStartedView from '../views/general/GetStartedView.vue';
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
      path: '/get-started',
      name: 'get-started',
      component: GetStartedView,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    {
      path: '/user-signup',
      name: 'signup',
      component: UserSignupView,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    /*
    {
      path: '/login',
      name: 'login',
      component: UserLoginView,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    {
      path: '/cu-login',
      name: 'cu-login',
      component: CompanyUserLogin,
      meta: { requiresAuth: false, userType: 'guest'}
    },
    */
    {
      path: '/listing',
      name: 'listing',
      component: SingleListingView,
      meta: { requiresAuth: false, userType: 'all'}
    }
];

export default publicRoutes;