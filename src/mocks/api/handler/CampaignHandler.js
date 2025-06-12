import { http, HttpResponse } from 'msw';

const campaignList = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Campaign ${index + 1}`,
  clientCompany: `Company ${index + 1}`,
  clientManagerName: `This is campaign number ${index + 1}`,
  clientManagerRole: "팀장",
  price: index * 1000,
  startDate: new Date().getFullYear() + index,
  endDate: new Date().getFullYear() + index + 30,
  username: "정재현",
  productName: `Product ${index + 1}`,
  pipeLine: {
    chance: { date: new Date().getFullYear() + index + 2 },
    listUp: { date: new Date().getFullYear() + index + 3 },
    proposal: { date: new Date().getFullYear() + index + 4 },
    negotiation: { date: new Date().getFullYear() + index + 5 }
  }
}));

const CampaignHandler = [
  http.get('/api/v1/campaign', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const size = parseInt(url.searchParams.get('size')) || 10;

    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const pagedData = campaignList.slice(startIndex, endIndex);

    return HttpResponse.json(
      {
        data: pagedData,
        page,
        size,
        total: campaignList.length
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      }
    );
  })
];

export default CampaignHandler;
