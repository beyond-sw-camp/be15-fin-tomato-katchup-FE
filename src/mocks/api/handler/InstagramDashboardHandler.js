import { http, HttpResponse } from 'msw';

const instagramDashboardMock = {
  '1': {
    id: '1',
    instagram: { username: 'sanago', followers: 740000 },
    dailyAverageViews: 15000,
    monthlyAverageViews: 450000,
    reach: 107000,
    followerReachRate: 72.5,
    nonFollowerReachRate: 27.5,
    reelsSummary: { count: 54, avgViews: 3200000, avgComments: 1700, avgLikes: 54000 },
    audience: { followerCount: 740000, followerChange: 320, followRate: 87.3, unfollowRate: 12.7 },
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
        permalink: "https://www.instagram.com/p/냥냥이123"
      },
      {
        id: 2,
        title: '윤머머와 친구들',
        thumbnail: '/src/assets/images/mock/윤머머.png',
        likes: 28000,
        comments: 430,
        timestamp: '2024-06-05T09:10:00+0000',
        permalink: "https://www.instagram.com/p/윤머머456"
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
  },

  '2': {
    id: '2',
    instagram: { username: '', followers: 0 },
    dailyAverageViews: 50000,
    monthlyAverageViews: 1500000,
    reach: 250000,
    followerReachRate: 75.5,
    nonFollowerReachRate: 24.5,
    reelsSummary: { count: 60, avgViews: 2000000, avgComments: 1200, avgLikes: 45000 },
    audience: { followerCount: 0, followerChange: 0, followRate: 0, unfollowRate: 0 },
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
        { country: 'KR', percentage: 80 },
        { country: 'JP', percentage: 10 }
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
        title: '먹방 대왕',
        thumbnail: '/src/assets/images/mock/tzuyang.png',
        likes: 70000,
        comments: 1000,
        timestamp: '2024-06-01T14:00:00+0000',
        permalink: 'https://www.instagram.com/p/tzuyang123'
      }
    ],
    popularReels: [
      {
        id: "2222",
        title: "엄청난 먹방",
        thumbnail: '/src/assets/images/mock/tzuyang.png',
        plays: 2000000,
        likes: 50000,
        comments: 1000,
        timestamp: '2024-06-02T10:00:00+0000',
        permalink: "https://www.instagram.com/reel/2222/"
      }
    ],
  },

  '3': {
    id: '3',
    instagram: { username: 'dano_day', followers: 81000 },
    dailyAverageViews: 3000,
    monthlyAverageViews: 90000,
    reach: 20000,
    followerReachRate: 78.0,
    nonFollowerReachRate: 22.0,
    reelsSummary: { count: 30, avgViews: 100000, avgComments: 300, avgLikes: 8000 },
    audience: { followerCount: 81000, followerChange: 50, followRate: 88.0, unfollowRate: 12.0 },
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
        { country: 'KR', percentage: 85 }
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
        title: '다이어트 비법',
        thumbnail: '/src/assets/images/mock/yeodano.png',
        likes: 10000,
        comments: 200,
        timestamp: '2024-06-01T14:00:00+0000',
        permalink: 'https://www.instagram.com/p/yeodano123'
      }
    ],
    popularReels: [
      {
        id: "3333",
        title: "운동하는 날",
        thumbnail: '/src/assets/images/mock/yeodano.png',
        plays: 150000,
        likes: 8000,
        comments: 300,
        timestamp: '2024-06-02T10:00:00+0000',
        permalink: "https://www.instagram.com/reel/3333/"
      }
    ],
  },

  '4': {
    id: '4',
    instagram: { username: 'shortbox.official', followers: 28000 },
    dailyAverageViews: 8000,
    monthlyAverageViews: 240000,
    reach: 60000,
    followerReachRate: 65.0,
    nonFollowerReachRate: 35.0,
    reelsSummary: { count: 20, avgViews: 600000, avgComments: 400, avgLikes: 12000 },
    audience: { followerCount: 28000, followerChange: 100, followRate: 80.0, unfollowRate: 20.0 },
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
        { country: 'KR', percentage: 70 },
        { country: 'US', percentage: 10 }
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
        title: '코미디 몰아보기',
        thumbnail: '/src/assets/images/mock/shortbox.png',
        likes: 15000,
        comments: 300,
        timestamp: '2024-06-01T14:00:00+0000',
        permalink: 'https://www.instagram.com/p/shortbox123'
      }
    ],
    popularReels: [
      {
        id: "4444",
        title: "단편 꽁트",
        thumbnail: '/src/assets/images/mock/shortbox.png',
        plays: 600000,
        likes: 12000,
        comments: 400,
        timestamp: '2024-06-02T10:00:00+0000',
        permalink: "https://www.instagram.com/reel/4444/"
      }
    ],
  },

  '5': {
    id: '5',
    instagram: { username: 'kiu_design_', followers: 447000 },
    dailyAverageViews: 20000,
    monthlyAverageViews: 600000,
    reach: 140000,
    followerReachRate: 82.0,
    nonFollowerReachRate: 18.0,
    reelsSummary: { count: 50, avgViews: 1200000, avgComments: 600, avgLikes: 20000 },
    audience: { followerCount: 447000, followerChange: 150, followRate: 89.0, unfollowRate: 11.0 },
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
        { country: 'KR', percentage: 75 },
        { country: 'US', percentage: 10 }
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
        title: '헤어스타일 비법',
        thumbnail: '/src/assets/images/mock/kiu.png',
        likes: 25000,
        comments: 400,
        timestamp: '2024-06-01T14:00:00+0000',
        permalink: 'https://www.instagram.com/p/kiu123'
      }
    ],
    popularReels: [
      {
        id: "5555",
        title: "스타일링 꿀팁",
        thumbnail: '/src/assets/images/mock/kiu.png',
        plays: 1200000,
        likes: 20000,
        comments: 600,
        timestamp: '2024-06-02T10:00:00+0000',
        permalink: "https://www.instagram.com/reel/5555/"
      }
    ],
  }
}

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
