export const campaignRoutes = [
  {
    path: '/campaign',
    name: 'campaignList',
    component: () => import('@/features/campaign/view/CampaignList.vue'),
    meta: {
      layout: 'none',
    },
  },
]
