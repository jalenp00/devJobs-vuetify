import CompanyRegister from '../views/company/CompanyRegisterView.vue';
import CompanyUserRegister from '../views/companyUser/UserRegister.vue';

const companyRoutes = [
    {
        path:'/c-register',
        name: 'c-register',
        component: CompanyRegister,
        meta: { requiresAuth: false, userType: 'companyUser'}
      },
      {
        path: '/cu-register',
        name: 'cu-register',
        component: CompanyUserRegister,
        meta: { requiresAuth: false, userType: 'companyUser'}
      }
]

export default companyRoutes;