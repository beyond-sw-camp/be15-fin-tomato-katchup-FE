
import { http, HttpResponse } from 'msw'

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
]

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
    },
    {
      id: 202,
      name: '정유미',
      username: '@yumichannel',
      imageUrl: '/images/mock/tzuyang.png',
      tags: ['Food', 'Fashion & Beauty'],
      followers: '230만명',
      views: '28.2만명',
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
    },
    {
      id: 204,
      name: '제니',
      username: '@jennie_blackpink',
      imageUrl: '/images/mock/kitty.png',
      tags: ['Entertainment'],
      followers: '520만명',
      views: '42.1만회',
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
    },
    {
      id: 206,
      name: '도티',
      username: '@doti_kids',
      imageUrl: '/images/mock/rabbit.png',
      tags: ['Family & Kids', 'Gaming'],
      followers: '143만명',
      views: '18.2만회',
    },
  ],
}

const AiHandler = [

  http.get('/api/v1/ai/campaigns', () => {
    return HttpResponse.json({ data: aiCampaignList })
  }),

  http.get('/api/v1/ai/campaigns/:id/recommendations', ({ params }) => {
    const { id } = params
    const result = influencerMap[parseInt(id)] || []
    return HttpResponse.json({ data: result })
  }),
]

export default AiHandler
