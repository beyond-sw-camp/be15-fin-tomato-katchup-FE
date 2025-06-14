import { http, HttpResponse } from 'msw';

const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const baseDate = new Date();

const pipelineList = [
    {
        pipelineStep: 'chance',
        title: 'XYZ 패션 브랜드 시즌 프로모션 계약',
        createdAt: '2025-06-05',
    },
    {
        pipelineStep: 'listUp',
        title: 'XYZ 패션 브랜드 시즌 프로모션 캐스팅 리스트업',
        createdAt: '2025-06-06',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
    },
    {
        pipelineStep: 'proposal',
        title: 'XYZ 패션 브랜드 시즌 프로모션 캐스팅 제안',
        createdAt: '2025-06-06',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        startAt: '2025-06-12',
        endAt: '2025-06-17',
        username: '차은우',
    },
    {
        pipelineStep: 'quotation',
        title: ' XYZ 패션 브랜드 시즌 프로모션 캐스팅 견적 (1차)',
        createdAt: '2025-06-07',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        adPrice: 9600000,
    },
    {
        pipelineStep: 'quotation',
        title: 'XYZ 패션 브랜드 시즌 프로모션 캐스팅 견적 (2차) 패션 브랜드 시즌 프로모션 캐스팅 견적 (2차)패션 브랜드 시즌 프로모션 캐스팅 견적 (2차)',
        createdAt: '2025-06-08',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        adPrice: 9300000,
    },
    {
        pipelineStep: 'quotation',
        title: 'XYZ 패션 브랜드 시즌 프로모션 캐스팅 견적 (2차) 패션 브랜드 시즌 프로모션 캐스팅 견적 (2차)패션 브랜드 시즌 프로모션 캐스팅 견적 (2차)',
        createdAt: '2025-06-08',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        adPrice: 9300000,
    },
    {
        pipelineStep: 'quotation',
        title: 'XYZ 패션 브랜드 시즌 프로모션 캐스팅 견적 (2차) 패션 브랜드 시즌 프로모션 캐스팅 견적 (2차)패션 브랜드 시즌 프로모션 캐스팅 견적 (2차)',
        createdAt: '2025-06-08',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        adPrice: 9300000,
    },
    {
        pipelineStep: 'sales',
        title: ' 상품 이름 정보',
        createdAt: '2025-06-09',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        adPrice: 9300000,
    },
    {
        pipelineStep: 'contract',
        title: 'XYZ 패션 브랜드 시즌 프로모션 계약',
        createdAt: '2025-06-11',
        clientCompany: 'XYZ 패션',
        ClientManagerName: '송강',
        startAt: '2025-06-12',
        endAt: '2025-06-17',
        username: '차은우',
        adPrice: 9300000,
    },
];
const campaignDetail = {
    id: 1,
    status: '진행중',
    title: 'Campaign 1',
    clientCompany: 'Company 1',
    clientManagerName: '김동영',
    clientManagerPosition: '팀장',
    expectedRevenue: 1000000, // 예상 매출
    expectedProfitMargin: 20, // 예상 이익률
    startDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
    endDate: formatDate(new Date(baseDate.getFullYear() + 2, 3, 20)),
    address: '서울특별시 동작구 보라매로 87길 (신대방동)',
    addressDetail: '3층 강의실 15기',
    username: ['차은우', '김민수'],
    awarenessPath: '지인 소개',
    notes: '1231231212123123',
    pipeLine: {
        chance: { date: formatDate(new Date(baseDate.getFullYear(), 2, 20)) },
        listUp: { date: formatDate(new Date(baseDate.getFullYear(), 2, 23)) },
        proposal: { date: formatDate(new Date(baseDate.getFullYear(), 2, 25)) },
        negotiation: { date: formatDate(new Date(baseDate.getFullYear(), 2, 27)) },
    },
};

const campaignList = Array.from({ length: 50 }, (_, index) => {
    baseDate.setFullYear(baseDate.getFullYear() + index); // 기준 연도 설정

    return {
        id: index + 1,
        status: '진행중',
        title: `Campaign ${index + 1}`,
        clientCompany: `Company ${index + 1}`,
        clientManagerName: `김동영${index + 1}`,
        clientManagerPosition: '팀장',
        price: index * 1000,
        startDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        endDate: formatDate(new Date(baseDate.getFullYear() + 2, 3, 20)),
        username: '정재현',
        userPosition: '과장',
        productName: `Product ${index + 1}`,
        pipeLine: {
            chance: { date: formatDate(new Date(baseDate.getFullYear(), 2, 20)) },
            listUp: { date: formatDate(new Date(baseDate.getFullYear(), 2, 23)) },
            proposal: { date: formatDate(new Date(baseDate.getFullYear(), 2, 25)) },
            negotiation: { date: formatDate(new Date(baseDate.getFullYear(), 2, 27)) },
        },
    };
});

const CampaignHandler = [
    http.get('/api/v1/campaign', async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const size = parseInt(url.searchParams.get('size')) || 10;

        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const pagedData = campaignList.slice(startIndex, endIndex);

        return HttpResponse.json(
            {
                data: pagedData,
                page,
                size,
                total: campaignList.length,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/campaign/:id', async () => {
        return HttpResponse.json(
            {
                data: campaignDetail,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/campaign/history/:id', async () => {
        return HttpResponse.json(
            { data: pipelineList },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
];

export default CampaignHandler;
