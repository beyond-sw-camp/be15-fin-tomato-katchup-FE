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

const contractDetail = {
    title: '[2차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 계약',
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
    adPrice: 9300000,
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
    influencerId: 1,
};
const userList = [
    { id: 1, name: '차은우' },
    { id: 2, name: '아이유' },
    { id: 3, name: '김수현' },
    { id: 4, name: '장원영' },
    { id: 5, name: '전정국' },
    { id: 6, name: '박지민' },
    { id: 7, name: '박보검' },
    { id: 8, name: '손흥민' },
    { id: 9, name: '김정우' },
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
    {
        id: 1,
        title: '[1차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 제안',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-15',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 2,
        title: '[2차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 제안',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-15',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!!!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 3,
        title: '[3차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 제안',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-17',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인99',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 4,
        title: '[4차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 제안 - 최종',
        requestDate: '2025-06-03',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-21',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-05',
        endDate: '2025-06-19',
    },
    {
        id: 5,
        title: '[5차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 제안 - 최최종',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '3주간',
        announcementDate: '2025-06-12',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 350000000,
        supplyAmount: 70000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
];

const quotationReferenceList = [
    {
        id: 1,
        title: '[1차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 견적',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-15',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 2,
        title: '[2차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 견적',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-15',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!!!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 3,
        title: '[3차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 견적',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-17',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인99',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 4,
        title: '[4차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 견적 - 최종',
        requestDate: '2025-06-03',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '2주간',
        announcementDate: '2025-06-21',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 300000000,
        supplyAmount: 50000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-05',
        endDate: '2025-06-19',
    },
    {
        id: 5,
        title: '[5차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 견적 - 최최종',
        requestDate: '2025-06-05',
        clientCompany: { id: 1, name: 'UVW 뷰티2' },
        clientManager: { id: 10, name: '김민지' },
        period: '3주간',
        announcementDate: '2025-06-12',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 201, name: '나연' },
        status: '승인요청',
        price: 350000000,
        supplyAmount: 70000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함!!!',
        notes: '특이사항 없음',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
];

const contractReferenceList = [
    {
        id: 1,
        title: '[1차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 계약',
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
        notes: '특이사항 없음!',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 2,
        title: '[2차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 계약',
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
        notes: '특이사항 없음!!',
        startDate: '2025-06-06',
        endDate: '2025-06-20',
    },
    {
        id: 3,
        title: '[3차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 계약',
        requestDate: '2025-06-06',
        clientCompany: { id: 1, name: 'UVW 뷰티' },
        clientManager: { id: 10, name: '송강' },
        period: '2주간',
        announcementDate: '2025-06-16',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인99',
        username: { id: 100, name: '차은우' },
        influencer: { id: 205, name: '아이유' },
        status: '승인요청',
        price: 100000000,
        supplyAmount: 20000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함',
        notes: '특이사항 없음!',
        startDate: '2025-06-08',
        endDate: '2025-06-08',
    },
    {
        id: 4,
        title: '[4차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 계약',
        requestDate: '2025-06-06',
        clientCompany: { id: 1, name: 'UVW 뷰티' },
        clientManager: { id: 10, name: '송강' },
        period: '2주간',
        announcementDate: '2025-06-16',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인99',
        username: { id: 100, name: '차은우' },
        influencer: { id: 205, name: '아이유' },
        status: '승인요청',
        price: 100000000,
        supplyAmount: 20000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함',
        notes: '특이사항 없음!',
        startDate: '2025-06-08',
        endDate: '2025-06-08',
    },
    {
        id: 5,
        title: '[5차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 계약',
        requestDate: '2025-06-12',
        clientCompany: { id: 1, name: 'UVW 뷰티' },
        clientManager: { id: 10, name: '송강' },
        period: '3주간',
        announcementDate: '2025-06-26',
        pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
        username: { id: 100, name: '차은우' },
        influencer: { id: 205, name: '아이유' },
        status: '승인요청',
        price: 100000,
        supplyAmount: 20000,
        extraProfit: 800000000,
        content: '진행 내용: 인플루언서 선정 및 콘텐츠 제작 일정 포함',
        notes: '특이사항 없음!',
        startDate: '2025-06-11',
        endDate: '2025-06-13',
    },
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

const contractList = Array.from({ length: 50 }, (_, index) => {
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() + index);

    const statusArr = ['승인완료', '승인요청', '보류/대기', '승인거절'];

    return {
        id: index + 1,
        status: statusArr[Math.floor(Math.random() * 4)],
        title: `Contract ${index + 1}`,
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

const revenueList = Array.from({ length: 50 }, (_, index) => {
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() + index);

    const statusArr = ['승인완료', '승인요청', '보류/대기', '승인거절'];

    return {
        id: index + 1,
        status: statusArr[Math.floor(Math.random() * 4)],
        title: `Revenue ${index + 1}`,
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

const ListUpList = Array.from({ length: 50 }, (_, index) => {
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() + index);

    const statusArr = ['승인완료', '승인요청', '보류/대기', '승인거절'];

    return {
        id: index + 1,
        status: statusArr[Math.floor(Math.random() * 4)],
        title: `ListUp ${index + 1}`,
        createdDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        campaignTitle: `XYZ 패션 브랜드 시즌 프로모션 계약`,
        clientCompany: `Company ${index + 1}`,
        clientManagerName: '김동영',
        clientManagerPosition: '팀장',
        userName: '정재현',
        userPosition: '과장',
        productName: '조던 브루클린 플리스 풀오버 후디',
        influencers: [
            { id: 1, name: '지무비' },
            { id: 2, name: '감자탕' },
            { id: 3, name: '맛피자' },
            { id: 4, name: '감스트' },
        ],
        requestDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        presentDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
    };
});

const revenueDetail = {
    title: '[2차] UVW 뷰티 디바이스 안멸성 캠페인 인플루언서 매출',
    requestDate: '2025-06-05',
    clientCompany: { id: 1, name: 'UVW 뷰티' },
    clientManager: { id: 10, name: '송강' },
    period: '2주간',
    announcementDate: '2025-06-15',
    pipeline: 'UVW 뷰티 디바이스 언박싱 캠페인',
    username: { id: 100, name: '차은우' },
    influencer: { id: 201, name: '나연' },
    status: '승인요청',
    adPrice: 100000000,
    productPrice: 20000,
    salesQuantity: 1000,
    content: '판매 내용: 제품 판매 수익 기록',
    notes: '특이사항 없음',
    startDate: '2025-06-06',
    endDate: '2025-06-20',
};

const eventList = [
  {
    title: '워크샵',
    scheduleDate: '2025-06-04',
    startTime: '09:00:00',
    endTime: '18:00:00',
    hexCode: '#f87171'
  },
  {
    title: '휴가',
    scheduleDate:'2025-06-04',
    startTime:'09:00:00',
    endTime:'18:00:00',
    hexCode:'#f97316'
  }
]

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
    http.get('/api/v1/contract/reference', async () => {
        return HttpResponse.json(
            { data: contractReferenceList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),
    http.get('/api/v1/sales/listup', async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const size = parseInt(url.searchParams.get('size')) || 10;

        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const pagedData = ListUpList.slice(startIndex, endIndex);

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
    http.get('/api/v1/sales/contract', async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const size = parseInt(url.searchParams.get('size')) || 10;

        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const pagedData = contractList.slice(startIndex, endIndex);

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
    http.get('/api/v1/sales/contract/:id', async () => {
        return HttpResponse.json(
            {
                data: contractDetail,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/quotation/reference', async () => {
        return HttpResponse.json(
            { data: quotationReferenceList },
            { status: 200, headers: { 'Cache-Control': 'no-store' } },
        );
    }),
    http.get('/api/v1/sales/revenue', async ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const size = parseInt(url.searchParams.get('size')) || 10;

        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const pagedData = revenueList.slice(startIndex, endIndex);

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
    http.get('/api/v1/sales/revenue/:id', async () => {
        return HttpResponse.json(
            {
                data: revenueDetail,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
    http.get('/api/v1/calendar/:date', async () => {
        return HttpResponse.json(
            {
                data: eventList,
            },
            {
                status: 200,
                headers: { 'Cache-Control': 'no-store' },
            },
        );
    }),
];

export default CampaignHandler;
