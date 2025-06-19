export const aiRoutes = [
    {
        path: '/influencer/recommendation',
        name: 'AiRecommend',
        component: () => import('@/features/ai/views/AIRecommendView.vue'),
    },
    {
        path: '/influencer/recommendation/:id',
        name: 'AiRecommendEdit',
        component: () => import('@/features/ai/views/AIRecommendView.vue'),
    },
];
