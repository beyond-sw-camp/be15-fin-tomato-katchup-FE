import axios from 'axios';

export const fetchAICampaigns = async () => {
    const res = await axios.get('/api/v1/ai/campaigns');
    return res.data.data;
};

export const fetchListupDetail = async (id) => {
    try {
        const res = await axios.get(`/api/v1/listup/${id}`);
        return res.data.data;
    } catch (error) {
        console.error('리스트업 상세 조회 실패:', error);
        throw error;
    }
};
