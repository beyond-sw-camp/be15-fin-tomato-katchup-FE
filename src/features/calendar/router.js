export const calendarRoutes = [
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/features/calendar/components/Calendar.vue'),
    meta: {
      layout: 'none',
    },
  },
]
