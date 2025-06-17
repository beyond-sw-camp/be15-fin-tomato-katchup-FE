import { http, HttpResponse } from 'msw';

const youtubeTrafficSourcesMock = {
  '1': {
    'daily': {
      columnHeaders: [
        { name: "insightTrafficSourceType", columnType: "DIMENSION", dataType: "STRING" },
        { name: "views", columnType: "METRIC", dataType: "INTEGER" }
      ],
      rows: [
        ["YT_SEARCH", 12000],
        ["RELATED_VIDEO", 8000],
        ["EXTERNAL", 3000],
        ["PLAYLIST", 1500],
        ["NOTIFICATION", 500]
      ]
    },
    'weekly': {
      columnHeaders: [
        { name: "insightTrafficSourceType", columnType: "DIMENSION", dataType: "STRING" },
        { name: "views", columnType: "METRIC", dataType: "INTEGER" }
      ],
      rows: [
        ["YT_SEARCH", 85000],
        ["RELATED_VIDEO", 56000],
        ["EXTERNAL", 21000],
        ["PLAYLIST", 9000],
        ["NOTIFICATION", 2500]
      ]
    },
    'monthly': {
      columnHeaders: [
        { name: "insightTrafficSourceType", columnType: "DIMENSION", dataType: "STRING" },
        { name: "views", columnType: "METRIC", dataType: "INTEGER" }
      ],
      rows: [
        ["YT_SEARCH", 350000],
        ["RELATED_VIDEO", 260000],
        ["EXTERNAL", 130000],
        ["PLAYLIST", 55000],
        ["NOTIFICATION", 12000]
      ]
    }
  }
};

export const YoutubeTrafficSourcesHandler = [
  http.get('/api/v1/youtube/traffic-sources', ({ request }) => {
    const url = new URL(request.url);
    const campaignId = url.searchParams.get('campaignId');
    const groupType = url.searchParams.get('groupType') || 'daily';

    const data = youtubeTrafficSourcesMock[campaignId];

    if (!data || !data[groupType]) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json({
      kind: "youtubeAnalytics#resultTable",
      columnHeaders: data[groupType].columnHeaders,
      rows: data[groupType].rows
    });
  }),
];
