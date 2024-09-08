import UserSignOut from '../views/user/UserSignOutView.vue';

const userRoutes = [
    {
      path: '/signout',
      name: 'signout',
      component: UserSignOut,
      meta: { requiresAuth: true, userType: 'user'}
    }
];

export default userRoutes;