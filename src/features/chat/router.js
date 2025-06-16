export const chatRoutes = [
  {
    path: '/chat',
    name: 'ChatList',
    component: () => import('./components/ChatListModal.vue')
  },
  {
    path: '/chat/:chatId',
    name: 'ChatRoom',
    component: () => import('./components/ChatRoom.vue'),
    props: true
  }
]
