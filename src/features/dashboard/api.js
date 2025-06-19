import api from '@/plugin/axios.js';

export const getCampaignResultList = async (page, size, filters = {}) => {
    return await api.get('/campaign/dashboard', {
        params: { page, size, ...filters },
    });
};
