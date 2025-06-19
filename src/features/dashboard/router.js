import InstagramDashboardView from '@/features/dashboard/views/InstagramDashboardView.vue';
import YoutubeDashboardView from '@/features/dashboard/views/YoutubeDashboardView.vue';
import CampaignResultDashboardView from '@/features/dashboard/views/CampaignResultDashboardView.vue';
import CampaignResultListView from '@/features/dashboard/views/CampaignResultListView.vue';

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
    // TODO: dashboard/:id 형태로 수정하기
    {
        path: '/campaign/dashboard',
        name: 'campaign-dashboard',
        component: CampaignResultDashboardView,
    },
    // TODO: 위에 바뀌면 여기가 /dashboard로..
    {
        path: '/campaign/dashboard/list',
        name: 'campaign-dashboard-list',
        component: CampaignResultListView,
    },
];
