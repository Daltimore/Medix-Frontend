import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'authLayout',
      component: () => import('../layouts/AuthLayout.vue'),
      redirect: { name: 'LoginView' },
      children: [
        {
          path: 'login',
          name: 'LoginView',
          component: () => import('../views/auth/Login.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboardLayout',
      component: () => import('../layouts/DashboardLayout.vue'),
      redirect: { name: 'DashboardOverview' },
      children: [
        {
          path: 'home',
          name: 'DashboardOverview',
          component: () => import('../views/dashboard/overview/Overview.vue'),
        },
        {
          path: 'records',
          name: 'DashboardRecords',
          component: () => import('../layouts/Routes.vue'),
          children: [
            {
              path: 'patients',
              name: 'DashboardPatients',
              component: () =>
                import('../views/dashboard/records/Patients.vue'),
            },
            {
              path: 'out-patients',
              name: 'DashboardOutPatients',
              component: () =>
                import('../views/dashboard/records/OutPatients.vue'),
            },
          ],
        },
        {
          path: 'practitioners',
          name: 'DashboardPractitioners',
          component: () => import('../layouts/Routes.vue'),
          children: [
            {
              path: 'doctors',
              name: 'DashboardDoctors',
              component: () =>
                import('../views/dashboard/records/Patients.vue'),
            },
            {
              path: 'nurses',
              name: 'DashboardNurses',
              component: () =>
                import('../views/dashboard/records/OutPatients.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
