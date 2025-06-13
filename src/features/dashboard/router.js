import YoutubeDashboardView from '@/features/dashboard/views/YoutubeDashboardView.vue';

export const dashboardRoutes = [
  {
    path: '/dashboard/youtube',
    name: 'youtube',
    component: YoutubeDashboardView,
    meta: { layout: 'none' },
  },
]
