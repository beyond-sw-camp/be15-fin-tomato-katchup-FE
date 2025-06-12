import { http, HttpResponse } from 'msw'

const influencerList = [
  {
    id: 1,
    name: '지무비 : G Movie',
    subscriberCount: '400만명',
    instagram: 'gmovie',
    instaFollowers: '76만명',
    tags: [
      'Entertainment', 'LifeStyle', 'Food', 'Animation',
      'Pet', 'Family & kids', 'Fashion & Beauty',
      'Professional', 'Gaming'
    ],
    ownerName: '오유경',
    thumbnail: '/src/assets/icons/logo.png'
  },
  {
    id: 2,
    name: 'tzuyang쯔양',
    subscriberCount: '1200만명',
    instagram: '정보없음',
    instaFollowers: '',
    tags: ['Entertainment', 'LifeStyle', 'Food', 'Family & kids', 'Professional'],
    ownerName: '이승재',
    thumbnail: '/src/assets/icons/logo.png'
  }
]

const InfluencerHandler = [
  http.get('/api/v1/influencer', async () => {
    return HttpResponse.json(
      {
        data: influencerList,
        total: influencerList.length
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      }
    )
  })
]

export default InfluencerHandler
