import { http, HttpResponse } from 'msw';

const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const baseDate = new Date();

const quotationDetail = {
    title: '[2차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 견적',
    requestDate: '2025-06-05',
    clientCompany: { id: 1, name: 'UVW 뷰티' },
    clientManager: { id: 10, name: '송강' },
    period: '2주간',
    announcementDate: '2025-06-15',
    pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
    username: { id: 100, name: '차은우' },
    influencer: { id: 201, name: '나연' },
    status: '승인요청',
    price: 100000000,
    supplyAmount: 20000,
    extraProfit: 800000000,
    content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함',
    notes: '특이사항 없음',
    startDate: '2025-06-06',
    endDate: '2025-06-20',
};

const opinionList = [
    {
        id: 1,
        author: '차은우',
        content: '첫 번째 의견입니다.',
        createdAt: '2025-06-15 10:30:00',
    },
    {
        id: 2,
        author: '아이유',
        content: '두 번째 의견입니다.',
        createdAt: '2025-06-15 11:00:00',
    },
];

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
    productName: 'COMPACT 폴딩백 하이킹 경량 백팩 20L',
    productPrice: 16300,
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
const userList = [
    { id: 1, name: '차은우' },
    { id: 2, name: '아이유' },
    { id: 3, name: '김수현' },
    { id: 4, name: '장원영' },
    { id: 5, name: '정국' },
    { id: 6, name: '지민' },
    { id: 7, name: '박보검' },
    { id: 8, name: '손흥민' },
    { id: 9, name: '임영웅' },
];

const clientCompanyList = [
    { id: 1, name: 'UVW 뷰티' },
    { id: 2, name: 'XYZ 패션' },
    { id: 3, name: 'ABC 전자' },
    { id: 4, name: '카카오 엔터' },
    { id: 5, name: 'CJ ENM' },
    { id: 6, name: '네이버 쇼핑' },
    { id: 7, name: '하이마트' },
    { id: 8, name: '삼성전자' },
];

const clientManagerList = [
    { id: 101, name: '송강' },
    { id: 102, name: '김민지' },
    { id: 103, name: '이도현' },
    { id: 104, name: '박서준' },
    { id: 105, name: '정해인' },
    { id: 106, name: '서강준' },
    { id: 107, name: '문가영' },
    { id: 108, name: '한소희' },
    { id: 109, name: '신민아' },
];

const influencerList = [
    { id: 201, name: '나연' },
    { id: 202, name: '제니' },
    { id: 203, name: '장원영' },
    { id: 204, name: '윈터' },
    { id: 205, name: '아이유' },
    { id: 206, name: '수지' },
    { id: 207, name: '조이' },
    { id: 208, name: '유나' },
    { id: 209, name: '솔라' },
];

const proposalReferenceList = [
    { id: 1, title: '[1차] 광고 제안' },
    { id: 2, title: '[2차] 광고 마지막 제안' },
    { id: 3, title: '[3차] 광고 진짜 마지막 제안' },
    { id: 4, title: '[4차] 광고 제안ㅜㅜ' },
    { id: 5, title: '[5차] 계약 직전 최종안' },
];

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

const proposalList = Array.from({ length: 50 }, (_, index) => {
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() + index);

    const statusArr = ['승인완료', '승인요청', '보류/대기', '승인거절'];

    return {
        id: index + 1,
        status: statusArr[Math.floor(Math.random() * 4)],
        title: `Proposal ${index + 1}`,
        createdDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        campaignTitle: `XYZ 패션 브랜드 시즌 프로모션 계약`,
        clientCompany: `Company ${index + 1}`,
        clientManagerName: '김동영',
        clientManagerPosition: '팀장',
        userName: '정재현',
        userPosition: '과장',
        requestDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        presentDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
    };
});

const quotationList = Array.from({ length: 50 }, (_, index) => {
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() + index);

    const statusArr = ['승인완료', '승인요청', '보류/대기', '승인거절'];

    return {
        id: index + 1,
        status: statusArr[Math.floor(Math.random() * 4)],
        title: `Quotation ${index + 1}`,
        createdDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        campaignTitle: `XYZ 패션 브랜드 시즌 프로모션 계약`,
        clientCompany: `Company ${index + 1}`,
        clientManagerName: '김동영',
        clientManagerPosition: '팀장',
        userName: '정재현',
        userPosition: '과장',
        productName: '조던 브루클린 플리스 풀오버 후디',
        adPrice: 30000000,
        requestDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        presentDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
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
    http.get('/api/v1/opinion', async () => {
        return HttpResponse.json(
            {
                data: opinionList,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/sales/quotation/:id', async () => {
        return HttpResponse.json(
            {
                data: quotationDetail,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/popup/user', async () => {
        return HttpResponse.json(
            { data: userList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),

    http.get('/api/v1/popup/client-company', async () => {
        return HttpResponse.json(
            { data: clientCompanyList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),

    http.get('/api/v1/popup/client-manager', async () => {
        return HttpResponse.json(
            { data: clientManagerList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),
    http.get('/api/v1/popup/influencer', async () => {
        return HttpResponse.json(
            { data: influencerList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),
    http.get('/api/v1/proposal/reference', async () => {
        return HttpResponse.json(
            { data: proposalReferenceList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),
    http.get('/api/v1/sales/proposal', async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const size = parseInt(url.searchParams.get('size')) || 10;

        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const pagedData = proposalList.slice(startIndex, endIndex);

        return HttpResponse.json(
            {
                data: pagedData,
                page,
                size,
                total: proposalList.length,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/sales/quotation', async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const size = parseInt(url.searchParams.get('size')) || 10;

        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const pagedData = quotationList.slice(startIndex, endIndex);

        return HttpResponse.json(
            {
                data: pagedData,
                page,
                size,
                total: quotationList.length,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
];

export default CampaignHandler;
