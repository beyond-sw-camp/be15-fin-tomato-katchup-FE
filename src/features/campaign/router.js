export const campaignRoutes = [
    {
        path: '/campaign',
        name: 'CampaignList',
        component: () => import('@/features/campaign/views/CampaignList.vue'),
    },
    {
        path: '/campaign/create',
        name: 'CampaignCreate',
        component: () => import('@/features/campaign/views/CampaignCreate.vue'),
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
        path: '/sales/proposal/:proposalId',
        name: 'ProposalDetail',
        component: () => import('@/features/campaign/views/ProposalDetail.vue'),
    },
    {
        path: '/sales/proposal/create',
        name: 'ProposalCreate',
        component: () => import('@/features/campaign/views/ProposalCreate.vue'),
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
        path: '/sales/quotation/create',
        name: 'QuotationCreate',
        component: () => import('@/features/campaign/views/QuotationCreate.vue'),
    },
    {
        path: '/sales/revenue',
        name: 'RevenueList',
        component: () => import('@/features/campaign/views/RevenueList.vue'),
    },
    {
        path: '/sales/revenue/:revenueId',
        name: 'RevenueDetail',
        component: () => import('@/features/campaign/views/RevenueDetail.vue'),
    },
    {
        path: '/sales/revenue/create',
        name: 'RevenueCreate',
        component: () => import('@/features/campaign/views/RevenueCreate.vue'),
    },
    {
        path: '/sales/contract',
        name: 'ContractList',
        component: () => import('@/features/campaign/views/ContractList.vue'),
    },
    {
        path: '/sales/contract/:contractId',
        name: 'ContractDetail',
        component: () => import('@/features/campaign/views/ContractDetail.vue'),
    },
    {
        path: '/sales/contract/create',
        name: 'ContractCreate',
        component: () => import('@/features/campaign/views/ContractCreate.vue'),
    },
];
