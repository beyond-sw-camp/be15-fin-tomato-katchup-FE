import { setupWorker } from 'msw/browser'
import CampaignHandler from '@/mocks/api/handler/CampaignHandler.js'
import InfluencerHandler from "@/mocks/api/handler/InfluencerHandler.js";
import ContractHandler from "@/mocks/api/handler/ContractHandler.js";

export const worker = setupWorker(
  ...CampaignHandler,
  ...InfluencerHandler,
  ...ContractHandler
)
