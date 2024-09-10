import GetStartedView from "views/general/GetStartedView.vue";

const userRoutes = [
    {
      path: '/something',
      name: 'something',
      component: GetStartedView,
      meta: { requiresAuth: true, userType: 'user'}
    } 
];

export default userRoutes;