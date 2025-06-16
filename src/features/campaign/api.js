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

export const getOpinion = async (targetId, targetType) => {
    return await api.get('/opinion', {
        params: { targetType, targetId },
    });
};

export const getProposalList = async (page, size, filters = {}) => {
    return await api.get('/sales/proposal', {
        params: { page, size, ...filters },
    });
};

export const getProposalDetail = async (proposalId) => {
    return await api.get(`/sales/proposal/${proposalId}`);
};

export const getListUpList = async (page, size, filters = {}) => {
    return await api.get('/sales/list-up', {
        params: { page, size, ...filters },
    });
};

export const getListUpDetail = async (listUpId) => {
    return await api.get(`/sales/list-up/${listUpId}`);
};

export const getQuotationList = async (page, size, filters = {}) => {
    return await api.get('/sales/quotation', {
        params: { page, size, ...filters },
    });
};

export const getQuotationDetail = async (quotationId) => {
    return await api.get(`/sales/quotation/${quotationId}`);
};

export const getSalesList = async (page, size, filters = {}) => {
    return await api.get('/sales/sale', {
        params: { page, size, ...filters },
    });
};

export const getSalesDetail = async (salesId) => {
    return await api.get(`/sales/sale/${salesId}`);
};

export const getContractList = async (page, size, filters = {}) => {
    return await api.get('/sales/contract', {
        params: { page, size, ...filters },
    });
};

export const getContractDetail = async (contractId) => {
    return await api.get(`/sales/contract/${contractId}`);
};

/* === 팝업 ===*/

export const getUser = async () => {
    return await api.get('/popup/user');
};

export const getClientCompany = async () => {
    return await api.get('/popup/client-company');
};

export const getClientManager = async () => {
    return await api.get('/popup/client-manager');
};

export const getInfluencer = async () => {
    return await api.get('/popup/influencer');
};

export const getProposalReference = async () => {
    return await api.get('/proposal/reference');
};
