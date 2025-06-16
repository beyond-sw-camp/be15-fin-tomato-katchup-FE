import { http, HttpResponse } from 'msw';

const youtubeDashboardMock = {
  '1': {
    id: '1',
    channel: {
      title: 'G Movie',
      thumbnails: { default: { url: '/src/assets/images/mock/gmovie.png' } },
      statistics: { subscriberCount: '760000', viewCount: '12000000', videoCount: '150' }
    },
    dailyAverageViews: 20000,
    monthlyAverageViews: 600000,
    reach: 125000,
    subscriberRate: 70.0,
    nonSubscriberRate: 30.0,
    shortsSummary: { count: 40, averageViewCount: 1500000, commentCount: 800, likeCount: 35000 },
    videosSummary: { videoCount: 110, averageViewCount: 300000, commentCount: 1200, likeCount: 50000 },
    audience: { subscriberCount: 760000, subscriberChange: 500, subscribeRate: 88.0, unsubscribeRate: 12.0 },
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
      countryTop: [{ country: 'KR', percentage: 60 }, { country: 'US', percentage: 25 }]
    },
    subscribersTrend: {
      daily: [{ date: '2025-06-01', value: 755000 }, { date: '2025-06-02', value: 757000 }, { date: '2025-06-03', value: 760000 }],
      weekly: [{ date: '2025-04-01', value: 740000 }, { date: '2025-04-08', value: 745000 }, { date: '2025-04-15', value: 750000 }],
      monthly: [{ date: '2025-01-01', value: 700000 }, { date: '2025-02-01', value: 710000 }, { date: '2025-03-01', value: 720000 }, { date: '2025-04-01', value: 730000 }, { date: '2025-05-01', value: 740000 }, { date: '2025-06-01', value: 760000 }]
    },
    popularVideos: [
      { videoId: 'abcd1234', title: '영화 요약 꿀잼', thumbnail: '/src/assets/images/mock/gmovie.png', viewCount: 2000000, likeCount: 55000, commentCount: 1200, publishedAt: '2024-06-02T10:00:00Z', videoUrl: 'https://youtube.com/watch?v=abcd1234' }
    ],
    popularShorts: [
      { videoId: 'shorts1111', title: '영화 스팟 라이트', thumbnail: '/src/assets/images/mock/gmovie.png', viewCount: 1200000, likeCount: 20000, commentCount: 400, publishedAt: '2024-06-05T12:00:00Z', shortsUrl: 'https://youtube.com/shorts/shorts1111' }
    ]
  },

  '2': {
    id: '2',
    channel: {
      title: 'tzuyang쯔양',
      thumbnails: { default: { url: '/src/assets/images/mock/tzuyang.png' } },
      statistics: { subscriberCount: '12000000', viewCount: '2000000000', videoCount: '350' }
    },
    dailyAverageViews: 500000,
    monthlyAverageViews: 15000000,
    reach: 2500000,
    subscriberRate: 85.5,
    nonSubscriberRate: 14.5,
    shortsSummary: { count: 100, averageViewCount: 4000000, commentCount: 3000, likeCount: 120000 },
    videosSummary: { videoCount: 250, averageViewCount: 3000000, commentCount: 8000, likeCount: 200000 },
    audience: { subscriberCount: 12000000, subscriberChange: 30000, subscribeRate: 95.0, unsubscribeRate: 5.0 },
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
      countryTop: [{ country: 'KR', percentage: 80 }, { country: 'JP', percentage: 10 }]
    },
    subscribersTrend: {
      daily: [{ date: '2025-06-01', value: 755000 }, { date: '2025-06-02', value: 757000 }, { date: '2025-06-03', value: 760000 }],
      weekly: [{ date: '2025-04-01', value: 740000 }, { date: '2025-04-08', value: 745000 }, { date: '2025-04-15', value: 750000 }],
      monthly: [{ date: '2025-01-01', value: 700000 }, { date: '2025-02-01', value: 710000 }, { date: '2025-03-01', value: 720000 }, { date: '2025-04-01', value: 730000 }, { date: '2025-05-01', value: 740000 }, { date: '2025-06-01', value: 760000 }]
    },
    popularVideos: [ { videoId: 'tzuy123', title: '먹방 대왕', thumbnail: '/src/assets/images/mock/tzuyang.png', viewCount: 4000000, likeCount: 70000, commentCount: 1000, publishedAt: '2024-06-01T14:00:00Z', videoUrl: 'https://youtube.com/watch?v=tzuy123' } ],
    popularShorts: [ { videoId: 'shorts2222', title: '엄청난 먹방쇼츠', thumbnail: '/src/assets/images/mock/tzuyang.png', viewCount: 5000000, likeCount: 90000, commentCount: 2500, publishedAt: '2024-06-02T10:00:00Z', shortsUrl: 'https://youtube.com/shorts/shorts2222' } ]
  },

  '3': {
    id: '3',
    channel: {
      title: '여단오_yeodano',
      thumbnails: { default: { url: '/src/assets/images/mock/yeodano.png' } },
      statistics: { subscriberCount: '304000', viewCount: '5000000', videoCount: '100' }
    },
    dailyAverageViews: 8000,
    monthlyAverageViews: 240000,
    reach: 90000,
    subscriberRate: 75.0,
    nonSubscriberRate: 25.0,
    shortsSummary: { count: 20, averageViewCount: 400000, commentCount: 200, likeCount: 15000 },
    videosSummary: { videoCount: 80, averageViewCount: 150000, commentCount: 500, likeCount: 25000 },
    audience: { subscriberCount: 304000, subscriberChange: 300, subscribeRate: 88.0, unsubscribeRate: 12.0 },
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
      countryTop: [{ country: 'KR', percentage: 80 }, { country: 'JP', percentage: 10 }]
    },
    subscribersTrend: {
      daily: [{ date: '2025-06-01', value: 755000 }, { date: '2025-06-02', value: 757000 }, { date: '2025-06-03', value: 760000 }],
      weekly: [{ date: '2025-04-01', value: 740000 }, { date: '2025-04-08', value: 745000 }, { date: '2025-04-15', value: 750000 }],
      monthly: [{ date: '2025-01-01', value: 700000 }, { date: '2025-02-01', value: 710000 }, { date: '2025-03-01', value: 720000 }, { date: '2025-04-01', value: 730000 }, { date: '2025-05-01', value: 740000 }, { date: '2025-06-01', value: 760000 }]
    },
    popularVideos: [ { videoId: 'yeo123', title: '다이어트 비법', thumbnail: '/src/assets/images/mock/yeodano.png', viewCount: 600000, likeCount: 18000, commentCount: 400, publishedAt: '2024-06-01T14:00:00Z', videoUrl: 'https://youtube.com/watch?v=yeo123' } ],
    popularShorts: [ { videoId: 'shorts3333', title: '운동하는 날', thumbnail: '/src/assets/images/mock/yeodano.png', viewCount: 900000, likeCount: 25000, commentCount: 700, publishedAt: '2024-06-02T10:00:00Z', shortsUrl: 'https://youtube.com/shorts/shorts3333' } ]
  },

  '4': {
    id: '4',
    channel: {
      title: '숏박스',
      thumbnails: { default: { url: '/src/assets/images/mock/shortbox.png' } },
      statistics: { subscriberCount: '3390000', viewCount: '400000000', videoCount: '180' }
    },
    dailyAverageViews: 30000,
    monthlyAverageViews: 900000,
    reach: 150000,
    subscriberRate: 80.0,
    nonSubscriberRate: 20.0,
    shortsSummary: { count: 50, averageViewCount: 1200000, commentCount: 600, likeCount: 20000 },
    videosSummary: { videoCount: 120, averageViewCount: 800000, commentCount: 1500, likeCount: 30000 },
    audience: { subscriberCount: 3390000, subscriberChange: 8000, subscribeRate: 92.0, unsubscribeRate: 8.0 },
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
      countryTop: [{ country: 'KR', percentage: 80 }, { country: 'JP', percentage: 10 }]
    },
    subscribersTrend: {
      daily: [{ date: '2025-06-01', value: 755000 }, { date: '2025-06-02', value: 757000 }, { date: '2025-06-03', value: 760000 }],
      weekly: [{ date: '2025-04-01', value: 740000 }, { date: '2025-04-08', value: 745000 }, { date: '2025-04-15', value: 750000 }],
      monthly: [{ date: '2025-01-01', value: 700000 }, { date: '2025-02-01', value: 710000 }, { date: '2025-03-01', value: 720000 }, { date: '2025-04-01', value: 730000 }, { date: '2025-05-01', value: 740000 }, { date: '2025-06-01', value: 760000 }]
    },
    popularVideos: [ { videoId: 'short123', title: '코미디 몰아보기', thumbnail: '/src/assets/images/mock/shortbox.png', viewCount: 1000000, likeCount: 25000, commentCount: 600, publishedAt: '2024-06-01T14:00:00Z', videoUrl: 'https://youtube.com/watch?v=short123' } ],
    popularShorts: [ { videoId: 'shorts4444', title: '단편 꽁트', thumbnail: '/src/assets/images/mock/shortbox.png', viewCount: 2000000, likeCount: 40000, commentCount: 800, publishedAt: '2024-06-02T10:00:00Z', shortsUrl: 'https://youtube.com/shorts/shorts4444' } ]
  },

  '5': {
    id: '5',
    channel: {
      title: '기우쌤',
      thumbnails: { default: { url: '/src/assets/images/mock/kiu.png' } },
      statistics: { subscriberCount: '1600000', viewCount: '90000000', videoCount: '120' }
    },
    dailyAverageViews: 15000,
    monthlyAverageViews: 450000,
    reach: 100000,
    subscriberRate: 85.0,
    nonSubscriberRate: 15.0,
    shortsSummary: { count: 30, averageViewCount: 600000, commentCount: 400, likeCount: 18000 },
    videosSummary: { videoCount: 90, averageViewCount: 400000, commentCount: 900, likeCount: 28000 },
    audience: { subscriberCount: 1600000, subscriberChange: 2000, subscribeRate: 90.0, unsubscribeRate: 10.0 },
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
      countryTop: [{ country: 'KR', percentage: 80 }, { country: 'JP', percentage: 10 }]
    },
    subscribersTrend: {
      daily: [{ date: '2025-06-01', value: 755000 }, { date: '2025-06-02', value: 757000 }, { date: '2025-06-03', value: 760000 }],
      weekly: [{ date: '2025-04-01', value: 740000 }, { date: '2025-04-08', value: 745000 }, { date: '2025-04-15', value: 750000 }],
      monthly: [{ date: '2025-01-01', value: 700000 }, { date: '2025-02-01', value: 710000 }, { date: '2025-03-01', value: 720000 }, { date: '2025-04-01', value: 730000 }, { date: '2025-05-01', value: 740000 }, { date: '2025-06-01', value: 760000 }]
    },
    popularVideos: [ { videoId: 'kiu123', title: '헤어스타일 비법', thumbnail: '/src/assets/images/mock/kiu.png', viewCount: 800000, likeCount: 22000, commentCount: 500, publishedAt: '2024-06-01T14:00:00Z', videoUrl: 'https://youtube.com/watch?v=kiu123' } ],
    popularShorts: [ { videoId: 'shorts5555', title: '스타일링 꿀팁', thumbnail: '/src/assets/images/mock/kiu.png', viewCount: 1200000, likeCount: 30000, commentCount: 700, publishedAt: '2024-06-02T10:00:00Z', shortsUrl: 'https://youtube.com/shorts/shorts5555' } ]
  }
};

export const YouTubeDashboardHandler = [
  http.get('/api/v1/dashboard/youtube', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const data = youtubeDashboardMock[id];

    if (!data) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json({ data });
  }),
];
