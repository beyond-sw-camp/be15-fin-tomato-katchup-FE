import { setupWorker } from 'msw/browser';
import CampaignHandler from '@/mocks/api/handler/CampaignHandler.js';
import ProposalHandler from '@/mocks/api/handler/ProposalHandler.js';

export const worker = setupWorker(...CampaignHandler, ...ProposalHandler);
