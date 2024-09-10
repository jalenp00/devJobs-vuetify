import CompanyRegister from '../views/company/CompanyRegisterView.vue';
import CompanyUserRegister from '../views/companyUser/UserRegister.vue';
import CreateListing from '../views/listing/CreateListingView.vue';
import CompanyListingDashboardView from '../views/listing/CompanyListingDashboardView.vue';

const companyRoutes = [
    {
        path:'/company-signup',
        name: 'company-signup',
        component: CompanyRegister,
        meta: { requiresAuth: false, userType: 'guest'}
      },
      {
        path: '/companyuser-signup',
        name: 'companyuser-signup',
        component: CompanyUserRegister,
        meta: { requiresAuth: false, userType: 'guest'}
      },
      {
        path: '/create-listing',
        name: 'create-listing',
        component: CreateListing,
        meta: { requiresAuth: true, userType: 'companyUser'}
      },
      {
        path: '/company-dashboard',
        name: 'CompanyDashboard',
        component: CompanyListingDashboardView,
        meta: { requiresAuth: true, userType: 'companyUser'}
      }
]

export default companyRoutes;