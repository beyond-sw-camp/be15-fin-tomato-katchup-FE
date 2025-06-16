import InfluencerListView from '@/features/influencer/views/InfluencerListView.vue';
import InstagramDashboardView from '@/features/influencer/views/InstagramDashboardView.vue';
import YoutubeDashboardView from '@/features/influencer/views/YoutubeDashboardView.vue';

export const influencerRoutes = [
  {
    path: '/influencer/list',
    name: 'influencer-list',
    component: InfluencerListView,
  },
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
