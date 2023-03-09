import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sphere-view',
      name: 'SphereView',
      component: () => import('../components/SphereView.vue'),
    },
    {
      path: '/square-view',
      name: 'SquareView',
      component: () => import('../components/SquareView.vue'),
    },
    {
      path: '/islands-view',
      name: 'IslandsView',
      component: () => import('../components/IslandsView.vue'),
    },
    {
      path: '/car-view',
      name: 'CarView',
      component: () => import('../components/CarView.vue'),
    },
  ],
});

export default router;
