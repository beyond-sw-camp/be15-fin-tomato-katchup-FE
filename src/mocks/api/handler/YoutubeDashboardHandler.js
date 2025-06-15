import { http, HttpResponse } from 'msw';

const youtubeDashboardMock = [
  {
    id: 'UCXXXXXX',
    title: '사나고 Sanago',
    description: '3D펜으로 만드는 다양한 창작 영상',
    thumbnail: '/src/assets/images/mock/kitty.png',

    tags: ['Entertainment', 'LifeStyle', 'Food', 'Animation'],

    youtube: {
      subscribers: 4000000,
      viewCount: 120000000,
      videoCount: 542,
      subscriberChange: 2300
    },

    shortsSummary: {
      count: 80,
      avgViews: 4100000,
      avgComments: 2200,
      avgLikes: 61000
    },

    dailyAverageViews: 25000,
    monthlyAverageViews: 750000,

    audience: {
      followRate: 85.4,
      nonFollowRate: 14.6
    },

    demographics: {
      ageGender: [
        { ageRange: '13-17', male: 3, female: 4, other: 0 },
        { ageRange: '18-24', male: 27, female: 42, other: 1 },
        { ageRange: '25-34', male: 38, female: 45, other: 2 },
        { ageRange: '35-44', male: 15, female: 16, other: 1 },
        { ageRange: '45-54', male: 6, female: 5, other: 0 },
        { ageRange: '55-64', male: 2, female: 3, other: 0 },
        { ageRange: '65+', male: 1, female: 1, other: 0 }
      ],
      countryTop: [
        { country: 'KR', percentage: 60 },
        { country: 'US', percentage: 25 },
        { country: 'JP', percentage: 10 },
        { country: 'ETC', percentage: 5 }
      ]
    },

    popularVideos: [
      { id: 1, title: '3D펜으로 고양이 만들기', thumbnail: '/src/assets/images/mock/냥냥이.png', viewCount: 850000 },
      { id: 2, title: '3D펜으로 케이크 만들기', thumbnail: '/src/assets/images/mock/윤머머.png', viewCount: 720000 }
    ],

    popularShorts: [
      { id: 1, title: '짧은 먹방 쇼츠 🍰', thumbnail: '/src/assets/images/mock/물토마토.png', viewCount: 950000 },
      { id: 2, title: '고양이 쇼츠 🐱', thumbnail: '/src/assets/images/mock/물딸기.png', viewCount: 880000 }
    ]
  }
];

export const YouTubeDashboardHandler = [
  http.get('/api/v1/dashboard/youtube', () => {
    return HttpResponse.json(
      { data: youtubeDashboardMock, total: youtubeDashboardMock.length },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }),
];
