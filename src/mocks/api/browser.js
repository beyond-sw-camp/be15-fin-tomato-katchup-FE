import { setupWorker } from 'msw/browser'
import CampaignHandler from '@/mocks/api/handler/CampaignHandler.js'

export const worker = setupWorker(
  ...CampaignHandler
)
