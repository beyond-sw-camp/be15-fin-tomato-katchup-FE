export const campaignRoutes = [
    {
        path: '/campaign',
        name: 'campaignList',
        component: () => import('@/features/campaign/views/CampaignList.vue'),
    },
    {
        path: '/campaign/:campaignId',
        name: 'campaignDetail',
        component: () => import('@/features/campaign/views/CampaignDetail.vue'),
    },
    {
        path: '/quotation/:quotationId',
        name: 'quotationDetail',
        component: () => import('@/features/campaign/views/QuotationDetail.vue'),
    },

    /* === 공통 SearchPopup 하나로 통합 === */
    {
        path: '/search-popup',
        name: 'searchPopup',
        component: () => import('@/components/common/SearchPopup.vue'),
        meta: { useLayout: 'none' },
    },
];
