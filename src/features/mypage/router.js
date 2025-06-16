export const myPageRoutes = [
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('@/features/mypage/views/MyPageView.vue'),
    meta: {
      layout: 'none',
    },
  },
]
