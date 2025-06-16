import { setupWorker } from 'msw/browser'
import CampaignHandler from '@/mocks/api/handler/CampaignHandler.js'
import InfluencerHandler from "@/mocks/api/handler/InfluencerHandler.js";
import ContractHandler from "@/mocks/api/handler/ContractHandler.js";
import { InstagramDashboardHandler } from '@/mocks/api/handler/InstagramDashboardHandler.js';
import { YouTubeDashboardHandler } from '@/mocks/api/handler/YoutubeDashboardHandler.js';

export const worker = setupWorker(
  ...CampaignHandler,
  ...InfluencerHandler,
  ...ContractHandler,
  ...InstagramDashboardHandler,
  ...YouTubeDashboardHandler
)
