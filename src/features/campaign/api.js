import api from '@/plugin/axios.js';

export const getCampaignList = async (page, size, company) => {
    return await api.get('/campaign', {
        params: {
            page,
            size,
            ...(company && { company }),
        },
    });
};

export const getCampaignDetail = async (campaignId) => {
    return await api.get(`/campaign/${campaignId}`);
};
