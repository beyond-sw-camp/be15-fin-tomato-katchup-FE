import InstagramDashboardView from '@/features/dashboard/views/InstagramDashboardView.vue';
import YoutubeDashboardView from '@/features/dashboard/views/YoutubeDashboardView.vue';
import CampaignResultDashboardView
  from '@/features/dashboard/views/CampaignResultDashboardView.vue';

export const dashboardRoutes = [
  {
    path: '/influencer/dashboard/youtube',
    name: 'youtube',
    component: YoutubeDashboardView,
  },
  {
    path: '/influencer/dashboard/instagram',
    name: 'instagram',
    component: InstagramDashboardView,
  },
  {
    path: '/campaign/dashboard',
    name: 'campaign-dashboard',
    component: CampaignResultDashboardView,
  },
]
