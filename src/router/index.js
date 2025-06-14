import { createRouter, createWebHistory } from 'vue-router'
import { mainRoutes } from '@/features/main/router.js'
import { advertisementRoutes } from '@/features/advertisement/router'
import { calendarRoutes } from '@/features/calendar/router'
import { campaignRoutes } from '@/features/campaign/router'
import { chatRoutes } from '@/features/chat/router'
import { contractRoutes } from '@/features/contract/router'
import { userRoutes } from '@/features/user/router'
import { influencerRoutes } from '@/features/influencer/router.js';
import { myPageRoutes } from '@/features/mypage/router.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    ...advertisementRoutes,
    ...calendarRoutes,
    ...campaignRoutes,
    ...chatRoutes,
    ...contractRoutes,
    ...userRoutes,
    ...influencerRoutes,
    ...myPageRoutes,
  ],
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

export default router
