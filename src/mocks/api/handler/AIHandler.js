import { http, HttpResponse } from 'msw';
import { ref } from 'vue';

const aiCampaignList = [
    {
        id: 1,
        status1: '진행중',
        status2: '제안',
        company: '바르닭',
        title: '여름맞춤 닭가슴살 캠페인',
        product: '제로 닭가슴살',
        tags: ['Food', 'Lifestyle'],
    },
    {
        id: 2,
        status1: '진행중',
        status2: '리스트업',
        company: '에버밴드',
        title: '콜라보 캠페인',
        product: '자유이용권',
        tags: ['Entertainment'],
    },
    {
        id: 3,
        status1: '보류',
        status2: '제안',
        company: '오션월드',
        title: '테마파크 제안',
        product: '프리패스권',
        tags: ['Family & Kids', 'Entertainment'],
    },
    {
        id: 4,
        status1: '진행중',
        status2: '제안',
        company: '스킨푸드',
        title: '여름 뷰티 캠페인',
        product: '자외선 차단제',
        tags: ['Beauty', 'Lifestyle'],
    },
    {
        id: 5,
        status1: '보류',
        status2: '리스트업',
        company: '컬처랜드',
        title: '문화상품권 캠페인',
        product: '문화상품권',
        tags: ['Culture', 'Gift'],
    },
    {
        id: 6,
        status1: '진행중',
        status2: '제안',
        company: '다이소',
        title: '생활용품 캠페인',
        product: '다용도 정리함',
        tags: ['Lifestyle'],
    },
    {
        id: 7,
        status1: '진행중',
        status2: '제안',
        company: '버거킹',
        title: '와퍼 콜라보',
        product: '불고기와퍼 세트',
        tags: ['Food'],
    },
    {
        id: 8,
        status1: '진행중',
        status2: '리스트업',
        company: '이니스프리',
        title: '여름 스킨케어 캠페인',
        product: '수분크림',
        tags: ['Beauty'],
    },
    {
        id: 9,
        status1: '보류',
        status2: '제안',
        company: '놀이의 발견',
        title: '키즈 테마파크 캠페인',
        product: '입장권',
        tags: ['Kids', 'Entertainment'],
    },
    {
        id: 10,
        status1: '진행중',
        status2: '제안',
        company: '스타벅스',
        title: '여름음료 홍보',
        product: '수박 프라푸치노',
        tags: ['Food', 'Lifestyle'],
    },
    {
        id: 11,
        status1: '보류',
        status2: '제안',
        company: '무신사',
        title: '여름 패션 캠페인',
        product: '셔츠 + 반바지 세트',
        tags: ['Fashion'],
    },
    {
        id: 12,
        status1: '진행중',
        status2: '리스트업',
        company: '올리브영',
        title: '건강식품 홍보',
        product: '오메가3',
        tags: ['Health'],
    },
    {
        id: 13,
        status1: '진행중',
        status2: '제안',
        company: '넷플릭스',
        title: '오리지널 콘텐츠 홍보',
        product: '1개월 이용권',
        tags: ['Entertainment'],
    },
    {
        id: 14,
        status1: '진행중',
        status2: '리스트업',
        company: '배달의민족',
        title: '푸드 딜리버리 캠페인',
        product: '할인 쿠폰',
        tags: ['Food', 'App'],
    },
    {
        id: 15,
        status1: '보류',
        status2: '제안',
        company: 'ABC마트',
        title: '신발 브랜드 콜라보',
        product: '운동화',
        tags: ['Fashion'],
    },
    {
        id: 16,
        status1: '진행중',
        status2: '리스트업',
        company: '라인프렌즈',
        title: '캐릭터 상품 홍보',
        product: '에어팟 케이스',
        tags: ['Character', 'Gift'],
    },
    {
        id: 17,
        status1: '진행중',
        status2: '제안',
        company: '쿠팡',
        title: '와우 멤버십 캠페인',
        product: '무료배송 체험권',
        tags: ['Shopping'],
    },
    {
        id: 18,
        status1: '보류',
        status2: '제안',
        company: '티빙',
        title: '오리지널 드라마 홍보',
        product: '1개월 이용권',
        tags: ['Entertainment'],
    },
    {
        id: 19,
        status1: '진행중',
        status2: '리스트업',
        company: 'CGV',
        title: '여름 영화 캠페인',
        product: '영화관람권',
        tags: ['Entertainment'],
    },
    {
        id: 20,
        status1: '진행중',
        status2: '제안',
        company: '빙그레',
        title: '바나나우유 콜라보',
        product: '바나나맛우유',
        tags: ['Food'],
    },
];

const mockListupData = {
    1: {
        id: 1,
        campaignName: '피지컬갤러리 캠페인',
        title: '운동 콘텐츠 리스트업',
        influencers: [
            { id: 101, name: '피지컬갤러리', nickname: 'physicalgallery', imageUrl: '/img/pg.jpg' },
        ],
    },
    2: {
        id: 2,
        campaignName: '스브스뉴스 협찬',
        title: '뉴스 콘텐츠 홍보 리스트업',
        influencers: [
            { id: 102, name: '스브스뉴스', nickname: 'sbsnews', imageUrl: '/img/sbs.jpg' },
            { id: 103, name: 'ITSub잇섭', nickname: 'itsub', imageUrl: '/img/itsub.jpg' },
        ],
    },
    3: {
        id: 3,
        campaignName: '딩고 스타일 캠페인',
        title: '브이로그 중심 리스트업',
        influencers: [{ id: 104, name: '딩고', nickname: 'dingo', imageUrl: '/img/dingo.jpg' }],
    },
    4: {
        id: 4,
        campaignName: '문명특급 광고',
        title: '예능 기반 콘텐츠 리스트업',
        influencers: [
            { id: 105, name: '문명특급', nickname: 'civilization', imageUrl: '/img/mmtg.jpg' },
            { id: 106, name: '워크맨', nickname: 'workman', imageUrl: '/img/workman.jpg' },
        ],
    },
    5: {
        id: 5,
        campaignName: '침착맨 브랜드 협업',
        title: '토크형 콘텐츠 리스트업',
        influencers: [
            { id: 107, name: '침착맨', nickname: 'calmdownman', imageUrl: '/img/calm.jpg' },
        ],
    },
};

const influencerMap = {
    1: [
        {
            id: 201,
            name: '피지컬갤러리',
            username: '@physical_gallery_egg',
            imageUrl: '/images/mock/profile.png',
            tags: ['Food', 'LifeStyle', 'Pet', 'Family & Kids', 'Gaming'],
            followers: '309만명',
            views: '37.8만명',
            categories: ['푸드', '키즈', '게임'],
        },
        {
            id: 202,
            name: '정유미',
            username: '@yumichannel',
            imageUrl: '/images/mock/tzuyang.png',
            tags: ['Food', 'Fashion & Beauty'],
            followers: '230만명',
            views: '28.2만명',
            categories: ['푸드', '뷰티/패션'],
        },
        {
            id: 207,
            name: '침착맨',
            username: '@calmdownman',
            imageUrl: '/images/mock/calm.png',
            tags: ['Gaming', 'Entertainment'],
            followers: '198만명',
            views: '22.4만회',
            categories: ['게임', '엔터테인먼트'],
        },
    ],
    2: [
        {
            id: 203,
            name: '나연',
            username: '@nayeon_twice',
            imageUrl: '/images/mock/yeodano.png',
            tags: ['Entertainment', 'Fashion & Beauty'],
            followers: '309만명',
            views: '37.8만회',
            categories: ['엔터테인먼트', '뷰티/패션'],
        },
        {
            id: 204,
            name: '제니',
            username: '@jennie_blackpink',
            imageUrl: '/images/mock/kitty.png',
            tags: ['Entertainment'],
            followers: '520만명',
            views: '42.1만회',
            categories: ['엔터테인먼트'],
        },
        {
            id: 208,
            name: '지수',
            username: '@sooyaaa__',
            imageUrl: '/images/mock/jisoo.png',
            tags: ['Fashion & Beauty', 'Entertainment'],
            followers: '495만명',
            views: '38.5만회',
            categories: ['뷰티/패션', '엔터테인먼트'],
        },
    ],
    3: [
        {
            id: 205,
            name: '보겸',
            username: '@bokyumTV',
            imageUrl: '/images/mock/shortbox.png',
            tags: ['Family & Kids', 'Entertainment'],
            followers: '89만명',
            views: '15.6만회',
            categories: ['키즈', '엔터테인먼트'],
        },
        {
            id: 206,
            name: '도티',
            username: '@doti_kids',
            imageUrl: '/images/mock/rabbit.png',
            tags: ['Family & Kids', 'Gaming'],
            followers: '143만명',
            views: '18.2만회',
            categories: ['키즈', '게임'],
        },
        {
            id: 209,
            name: '헤이지니',
            username: '@heizni_world',
            imageUrl: '/images/mock/heizni.png',
            tags: ['Kids', 'Entertainment'],
            followers: '110만명',
            views: '14.7만회',
            categories: ['키즈', '엔터테인먼트'],
        },
    ],
};

const allInfluencers = ref([
    // 위에서 정의한 동일한 10명 (불필요하게 중복 복사하지 않음)
    ...influencerMap[1],
    ...influencerMap[2],
    ...influencerMap[3],
    {
        id: 210,
        name: '영국남자',
        username: '@koreanenglishman',
        imageUrl: '/images/mock/british.png',
        tags: ['Food', 'Culture'],
        followers: '300만명',
        views: '25.5만회',
        categories: ['푸드', '지식/정보'],
    },
]);

const AiHandler = [
    http.get('/api/v1/ai/campaigns', () => {
        return HttpResponse.json({ data: aiCampaignList });
    }),

    http.get('/api/v1/ai/campaigns/:id/recommendations', ({ params }) => {
        const { id } = params;
        const result = influencerMap[parseInt(id)] || [];
        return HttpResponse.json({ data: result });
    }),
    http.get('/api/v1/influencers', () => {
        return HttpResponse.json({ data: allInfluencers.value }); // 또는 그냥 allInfluencers
    }),
    http.get('/api/v1/listup/:id', ({ params }) => {
        const { id } = params;
        const data = mockListupData[id];

        return HttpResponse.json({ data: data, status: 200 });
    }),
];

export default AiHandler;
