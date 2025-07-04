import InfluencerManagementView from '@/features/user/views/InfluencerManagementView.vue';
import EmailSystemView from '@/features/user/views/EmailSystemView.vue';
import SurveyListView from '@/features/user/views/SurveyListView.vue';

export const userRoutes = [
    {
        path: '/management/influencer',
        name: 'InfluencerManagement',
        component: InfluencerManagementView,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/features/user/views/LoginView.vue'),
        meta: {
            useLayout: 'none'
        },
    },
    {
        path: '/findPassword',
        name: 'findPassword',
        component: () => import('@/features/user/views/FindPasswordView.vue'),
        meta: {
            useLayout: 'none',
        },
    },

    {
        path: '/management/email',
        name: 'emailSystem',
        component: EmailSystemView,
    },

    {
        path: '/management/survey',
        name: 'surveyList',
        component: SurveyListView,
    },
];
