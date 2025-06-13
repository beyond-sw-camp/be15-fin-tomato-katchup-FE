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

export const getProposalList = async (page, size) => {
    return await api.get('/sales/proposal', {
        params: {
            page,
            size,
        },
    });
};
