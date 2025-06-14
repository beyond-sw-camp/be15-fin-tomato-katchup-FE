import YoutubeDashboardView from '@/features/dashboard/views/YoutubeDashboardView.vue';
import InstagramDashboardView from '@/features/dashboard/views/InstagramDashboardView.vue';

export const dashboardRoutes = [
  {
    path: '/dashboard/youtube',
    name: 'youtube',
    component: YoutubeDashboardView,
    meta: { layout: 'none' },
  },
  {
    path: '/dashboard/instagram',
    name: 'instagram',
    component: InstagramDashboardView,
    meta: { layout: 'none' },
  },
]
