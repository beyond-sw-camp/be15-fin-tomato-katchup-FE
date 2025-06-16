import ClientListView from './views/ClientListView.vue'

export const advertisementRoutes = [
  {
    path: '/management/client',
    name: 'ClientList',
    component: ClientListView,
    meta: {
      layout: 'default',
      requiresAuth: true,
    }
  }
]
