import { http, HttpResponse } from 'msw'
const influencerList = [
  {
    id: 1,
    name: '지무비 : G Movie',
    realName: '박규남',
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
    thumbnail: '/src/assets/images/mock/gmovie.png'
  },
  {
    id: 2,
    name: 'tzuyang쯔양',
    realName: '조쯔양',
    subscribers: '1200만명',
    instagram: '정보없음',
    instaFollowers: '',
    targetGender: 'female',
    targetAgeGroup: '18-24',
    tags: ['Entertainment', 'LifeStyle', 'Food', 'Family & kids', 'Professional'],
    ownerName: '이승재',
    thumbnail: '/src/assets/images/mock/tzuyang.png'
  },
  {
    id: 3,
    name: '여단오_yeodano',
    realName: '윤다노',
    subscribers: '30.4만명',
    instagram: '@dano_day',
    instaFollowers: '8.1만명',
    targetGender: 'female',
    targetAgeGroup: '18-24',
    tags: ['Entertainment', 'LifeStyle', 'Food', 'Pet', 'Family & kids', 'Animation', 'Gaming', 'Professional', 'Fashion & Beauty'],
    ownerName: '윤채영',
    thumbnail: '/src/assets/images/mock/yeodano.png'
  },
  {
    id: 4,
    name: '숏박스',
    realName: '정광재',
    subscribers: '339만명',
    instagram: '@shortbox.official',
    instaFollowers: '2.8만명',
    targetGender: 'male',
    targetAgeGroup: '18-24',
    tags: ['Entertainment', 'LifeStyle'],
    ownerName: '조현승',
    thumbnail: '/src/assets/images/mock/shortbox.png'
  },
  {
    id: 5,
    name: '기우쌤',
    realName: '기우',
    subscribers: '160만명',
    instagram: '@kiu_design_',
    instaFollowers: '44.7만명',
    targetGender: 'female',
    targetAgeGroup: '18-24',
    tags: ['Professional', 'Fashion & Beauty'],
    ownerName: '조현승',
    thumbnail: '/src/assets/images/mock/kiu.png'
  },
]

const InfluencerHandler = [
  // 전체 목록
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
  }),

  http.get('/api/v1/influencer/:id', async ({ params }) => {
    const id = parseInt(params.id);
    const influencer = influencerList.find(item => item.id === id);

    if (!influencer) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json({ data: influencer }, { status: 200 });
  })
]

export default InfluencerHandler
