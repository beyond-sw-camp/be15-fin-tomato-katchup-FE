export const campaignRoutes = [
    {
        path: '/campaign',
        name: 'campaignList',
        component: () => import('@/features/campaign/views/CampaignList.vue'),
        meta: {
            layout: 'none',
        },
    },
    {
        path: '/campaign/:campaignId',
        name: 'campaignDetail',
        component: () => import('@/features/campaign/views/CampaignDetail.vue'),
        mete: {
            layout: 'none',
        },
    },
];
