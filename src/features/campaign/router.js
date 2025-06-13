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
        path: '/sales/proposal',
        name: 'proposalList',
        component: () => import('@/features/campaign/views/ProposalList.vue'),
        meta: {
            layout: 'noe',
        },
    },
];
