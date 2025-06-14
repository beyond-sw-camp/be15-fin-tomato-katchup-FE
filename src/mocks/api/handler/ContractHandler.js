import { http, HttpResponse } from 'msw'

const youtubeContracts = [
  { id: 1, date: '2025.01.03', amount: 450000, manager: '말왕', advertiser: '아디다스' },
  { id: 2, date: '2025.01.15', amount: 1000000, manager: '매미킴', advertiser: '나이키' },
  { id: 3, date: '2025.02.11', amount: 5000000, manager: '테스터훈', advertiser: '(주)곱창' }
]

const instagramContracts = [
  { id: 101, date: '2025.03.01', amount: 350000, manager: '하늘하늘', advertiser: '샤넬' },
  { id: 102, date: '2025.03.14', amount: 2000000, manager: '희재', advertiser: '디올' },
  { id: 103, date: '2025.04.01', amount: 750000, manager: '윤쨩', advertiser: '무신사' }
]

const ContractHandler = [
  http.get('/api/v1/contracts/youtube', () => {
    return HttpResponse.json({ data: youtubeContracts }, { status: 200 })
  }),
  http.get('/api/v1/contracts/instagram', () => {
    return HttpResponse.json({ data: instagramContracts }, { status: 200 })
  })
]

export default ContractHandler
