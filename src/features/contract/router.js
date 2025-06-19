import ContractListView from '@/features/contract/views/ContractListView.vue';
import ContractTemplateView from '@/features/contract/views/ContractTemplateView.vue';

export const contractRoutes = [
    {
        path: '/contract/list',
        name: 'ContractDocumentList',
        component: ContractListView,
    },
  {
    path: '/contract/template',
    name: 'ContractTemplate',
    component: ContractTemplateView
  }
];
