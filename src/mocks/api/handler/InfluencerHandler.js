import { http, HttpResponse } from 'msw'

const influencerList = [
  {
    id: 1,
    name: '지무비 : G Movie',
    subscribers: '400만명',
    instagram: '@gmovie',
    instaFollowers: '76만명',
    targetGender: 'male',
    targetAgeGroup: '18-24',
    tags: [
      'Entertainment', 'LifeStyle', 'Food', 'Animation',
      'Pet', 'Family & kids', 'Fashion & Beauty',
      'Professional', 'Gaming'
    ],
    ownerName: '오유경',
    thumbnail: '/src/assets/images/gmovie.png'
  },
  {
    id: 2,
    name: 'tzuyang쯔양',
    subscribers: '1200만명',
    instagram: '정보없음',
    instaFollowers: '',
    targetGender: 'female',
    targetAgeGroup: '18-24',
    tags: ['Entertainment', 'LifeStyle', 'Food', 'Family & kids', 'Professional'],
    ownerName: '이승재',
    thumbnail: '/src/assets/images/tzuyang.png'
  },
  {
    id: 3,
    name: '여단오_yeodano',
    subscribers: '30.4만명',
    instagram: '@dano_day',
    instaFollowers: '8.1만명',
    targetGender: 'female',
    targetAgeGroup: '18-24',
    tags: ['Entertainment', 'LifeStyle', 'Food', 'Pet', 'Family & kids', 'Animation', 'Gaming', 'Professional', 'Fashion & Beauty'],
    ownerName: '윤채영',
    thumbnail: '/src/assets/images/yeodano.png'
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
