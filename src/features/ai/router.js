export const aiRoutes = [
  {
    path: '/influencer/recommendation',
    name: 'aiRecommend',
    component: () => import('@/features/ai/views/AIRecommendView.vue'),
  },
];
