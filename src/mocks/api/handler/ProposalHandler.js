import { http, HttpResponse } from 'msw';

// 날짜 포맷 함수
const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

// 더미 데이터 생성
const proposalList = Array.from({ length: 50 }, (_, index) => {
    const baseDate = new Date();
    baseDate.setFullYear(baseDate.getFullYear() + index);

    const statusArr = ['승인완료', '승인요청', '보류/대기', '승인거절'];

    return {
        id: index + 1,
        status: statusArr[Math.floor(Math.random() * 4)],
        title: `Proposal ${index + 1}`,
        createdDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        clientCompany: `Company ${index + 1}`,
        clientManagerName: '김동영',
        clientManagerPosition: '팀장',
        userName: '정재현',
        userPosition: '과장',
        requestDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
        presentDate: formatDate(new Date(baseDate.getFullYear() + 2, 2, 20)),
    };
});

// MSW 핸들러 정의
const ProposalHandler = [
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
];

export default ProposalHandler;
