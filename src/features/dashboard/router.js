import InstagramDashboardView from '@/features/dashboard/views/InstagramDashboardView.vue';
import YoutubeDashboardView from '@/features/dashboard/views/YoutubeDashboardView.vue';

export const dashboardRoutes = [
  {
    path: '/influencer/dashboard/youtube',
    name: 'youtube',
    component: YoutubeDashboardView,
    meta: { layout: 'none' },
  },
  {
    path: '/influencer/dashboard/instagram',
    name: 'instagram',
    component: InstagramDashboardView,
    meta: { layout: 'none' },
  },
]
