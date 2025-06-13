export const campaignRoutes = [
    {
        path: '/campaign',
        name: 'campaignList',
        component: () => import('@/features/campaign/views/CampaignList.vue'),
        meta: {
            layout: 'none',
        },
    },
];
