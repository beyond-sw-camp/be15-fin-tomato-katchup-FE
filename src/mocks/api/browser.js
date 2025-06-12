import { setupWorker } from 'msw/browser'
import CampaignHandler from '@/mocks/api/handler/CampaignHandler.js'
import InfluencerHandler from "@/mocks/api/handler/InfluencerHandler.js";

export const worker = setupWorker(
  ...CampaignHandler,
  ...InfluencerHandler
)
