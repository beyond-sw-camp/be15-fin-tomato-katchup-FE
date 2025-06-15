import { http, HttpResponse } from 'msw';

const instagramDashboardMock = {
  '1': {
    id: '1',
    title: '사나고 Sanago',
    description: '3D펜으로 만드는 다양한 창작 영상',
    thumbnail: '/src/assets/images/mock/kitty.png',
    tags: ['Entertainment', 'LifeStyle', 'Food', 'Animation'],
    instagram: { username: 'sanago', followers: 740000 },

    reach: 107000,
    followerReachRate: 72.5,
    nonFollowerReachRate: 27.5,

    reelsSummary: {
      count: 54, avgViews: 3200000, avgComments: 1700, avgLikes: 54000
    },

    dailyAverageViews: 15000,
    monthlyAverageViews: 450000,

    audience: {
      followerCount: 740000, followerChange: 320, followRate: 87.3, unfollowRate: 12.7
    },

    demographics: {
      ageGender: [
        { ageRange: '13-17', male: 5, female: 8, other: 1 },
        { ageRange: '18-24', male: 25, female: 45, other: 2 },
        { ageRange: '25-34', male: 35, female: 50, other: 3 },
        { ageRange: '35-44', male: 15, female: 20, other: 1 },
        { ageRange: '45-54', male: 5, female: 7, other: 0 },
        { ageRange: '55-64', male: 2, female: 3, other: 0 },
        { ageRange: '65+', male: 1, female: 1, other: 0 }
      ],
      countryTop: [
        { country: 'KR', percentage: 65 },
        { country: 'US', percentage: 20 }
      ]
    },

    followersTrend: {
      daily: [
        { end_time: '2025-06-01', value: 3790000 },
        { end_time: '2025-06-02', value: 3800000 },
        { end_time: '2025-06-03', value: 3815000 }
      ],
      weekly: [
        { end_time: '2025-04-01', value: 3600000 },
        { end_time: '2025-04-08', value: 3650000 },
        { end_time: '2025-04-15', value: 3700000 }
      ],
      monthly: [
        { end_time: '2025-01-01', value: 3200000 },
        { end_time: '2025-02-01', value: 3300000 },
        { end_time: '2025-03-01', value: 3400000 },
        { end_time: '2025-04-01', value: 3500000 },
        { end_time: '2025-05-01', value: 3600000 },
        { end_time: '2025-06-01', value: 3800000 }
      ]
    },

    popularPosts: [
      {
        id: 1,
        title: '냥냥이',
        thumbnail: '/src/assets/images/mock/냥냥이.png',
        likes: 32000,
        comments: 540,
        timestamp: '2024-06-01T14:23:00+0000',
        permalink: 'https://www.instagram.com/p/냥냥이123'
      },
      {
        id: 2,
        title: '윤머머와 친구들',
        thumbnail: '/src/assets/images/mock/윤머머.png',
        likes: 28000,
        comments: 430,
        timestamp: '2024-06-05T09:10:00+0000',
        permalink: 'https://www.instagram.com/p/윤머머456'
      }
    ],

    popularReels: [
      {
        "id": "123456",
        "title": "냥냥이 꾹꾹이 🐈",
        "thumbnail": "/src/assets/images/mock/냥냥이.png",
        "plays": 3200000,
        "likes": 54000,
        "comments": 1700,
        timestamp: '2024-06-02T15:10:00+0000',
        "permalink": "https://www.instagram.com/reel/123456/"
      },
      {
        "id": "654321",
        "title": "냥냥이 뽀뽀 😻",
        "thumbnail": "/src/assets/images/mock/냥냥이.png",
        "plays": 750000,
        "likes": 12000,
        "comments": 300,
        timestamp: '2024-06-06T10:20:00+0000',
        "permalink": "https://www.instagram.com/reel/654321/"
      }
    ],

  }
};

export const InstagramDashboardHandler = [
  http.get('/api/v1/dashboard/instagram', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const data = instagramDashboardMock[id];

    if (!data) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json({ data });
  }),
];
