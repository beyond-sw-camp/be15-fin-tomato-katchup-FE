import MainView from '@/features/main/views/Main.vue';

export const mainRoutes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    meta: { layout: 'none' },
  },
];
