import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    // 아래로 쭉 추가해주세요
  ],
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
