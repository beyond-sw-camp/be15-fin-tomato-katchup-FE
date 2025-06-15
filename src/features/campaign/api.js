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

export const getCampaignHistory = async (campaignId) => {
    return await api.get(`/campaign/history/${campaignId}`);
};

export const getQuotationDetail = async (quotationId) => {
    return await api.get(`/quotation/${quotationId}`);
};

export const getOpinion = async (targetId, targetType) => {
    return await api.get('/opinion', {
        params: {
            targetType,
            targetId,
        },
    });
};

// === 팝업용 API ===
export const getUser = async () => {
    return await api.get('/popup/user');
};

export const getClientCompany = async () => {
    return await api.get('/popup/client-company');
};

export const getClientManager = async () => {
    return await api.get('/popup/client-manager');
};

export const getProposalReference = async () => {
    return await api.get('/proposal/reference');
};
