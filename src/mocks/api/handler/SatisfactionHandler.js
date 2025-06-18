import { http, HttpResponse } from 'msw'

const satisfactionList = [
    {
        name : '조현승',
        company : '메가커피',
        campaign : 'MGC 컵팥빙수...',
        date_sent : '2025.06.01',
        date_reacted : '2025.06.17',
        status : '응답'
    },
    {
        name : '이승재',
        company : '메가커피',
        campaign : 'MGC 컵팥빙수...',
        date_sent : '2025.06.01',
        date_reacted : '2025.06.17',
        status : '응답'
    },
    {
        name : '윤채영',
        company : '메가커피',
        campaign : 'MGC 컵팥빙수...',
        date_sent : '2025.06.01',
        date_reacted : '2025.06.18',
        status : '응답'
    },
    {
        name : '오유경',
        company : '메가커피',
        campaign : 'MGC 컵팥빙수...',
        date_sent : '2025.06.01',
        date_reacted : '-',
        status : '미응답'
    },
    {
        name : '박준서',
        company : '메가커피',
        campaign : 'MGC 컵팥빙수...',
        date_sent : '2025.06.01',
        date_reacted : '-',
        status : '미응답'
    },
    {
        name : '박장우',
        company : '메가커피',
        campaign : 'MGC 컵팥빙수...',
        date_sent : '2025.06.01',
        date_reacted : '-',
        status : '미응답'
    }
]

const SatisfactionHandler = [
    http.get('/api/v1/management/survey', () => {
        return HttpResponse.json({ data: satisfactionList }, { status: 200 })
    })
]

export default SatisfactionHandler
