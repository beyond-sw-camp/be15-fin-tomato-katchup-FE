export const campaignRoutes = [
    {
        path: '/campaign',
        name: 'CampaignList',
        component: () => import('@/features/campaign/views/CampaignList.vue'),
    },
    {
        path: '/campaign/:campaignId',
        name: 'CampaignDetail',
        component: () => import('@/features/campaign/views/CampaignDetail.vue'),
    },
    {
        path: '/sales/quotation/:quotationId',
        name: 'quotationDetail',
        component: () => import('@/features/campaign/views/QuotationDetail.vue'),
    },

    /* === 공통 SearchPopup 하나로 통합 === */
    {
        path: '/search-popup',
        name: 'SearchPopup',
        component: () => import('@/components/common/SearchPopup.vue'),
        meta: { useLayout: 'none' },
    },
    {
        path: '/sales/listup',
        name: 'ListUpList',
        component: () => import('@/features/campaign/views/ListUpList.vue'),
    },
    {
        path: '/sales/proposal',
        name: 'ProposalList',
        component: () => import('@/features/campaign/views/ProposalList.vue'),
    },
    {
        path: '/sales/quotation',
        name: 'QuotationList',
        component: () => import('@/features/campaign/views/QuotationList.vue'),
    },
    {
        path: '/sales/quotation/:quotationId',
        name: 'QuotationDetail',
        component: () => import('@/features/campaign/views/QuotationDetail.vue'),
    },
    {
        path: '/sales/revenue',
        name: 'RevenueList',
        component: () => import('@/features/campaign/views/RevenueList.vue'),
    },
    {
        path: '/sales/contract',
        name: 'ContractList',
        component: () => import('@/features/campaign/views/ContractList.vue'),
    },
];
