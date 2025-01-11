import { Router } from 'express'
import { validateRequest } from '../middleware/validation'
import { authenticate } from '../middleware/auth'
import * as seaController from '../controllers/sea.controller'

const router = Router()

// Campaign routes
router.get('/campaigns', authenticate, seaController.getCampaigns)
router.post(
  '/campaigns',
  authenticate,
  validateRequest({
    body: {
      name: { type: 'string', required: true },
      budget: { type: 'number', required: true },
      startDate: { type: 'string', required: true },
      endDate: { type: 'string', required: false },
    },
  }),
  seaController.createCampaign
)

// Campaign specific routes
router.get('/campaigns/:id', authenticate, seaController.getCampaign)
router.put(
  '/campaigns/:id',
  authenticate,
  validateRequest({
    body: {
      name: { type: 'string', required: false },
      budget: { type: 'number', required: false },
      status: { type: 'string', enum: ['ACTIVE', 'PAUSED', 'COMPLETED'], required: false },
      endDate: { type: 'string', required: false },
    },
  }),
  seaController.updateCampaign
)
router.delete('/campaigns/:id', authenticate, seaController.deleteCampaign)

// Keyword routes
router.get('/campaigns/:id/keywords', authenticate, seaController.getCampaignKeywords)
router.post(
  '/campaigns/:id/keywords',
  authenticate,
  validateRequest({
    body: {
      words: { type: 'array', required: true },
    },
  }),
  seaController.addKeywords
)

// Metrics routes
router.get('/campaigns/:id/metrics', authenticate, seaController.getCampaignMetrics)
router.post(
  '/campaigns/:id/metrics',
  authenticate,
  validateRequest({
    body: {
      type: { type: 'string', required: true },
      value: { type: 'number', required: true },
      date: { type: 'string', required: true },
    },
  }),
  seaController.addMetric
)

export default router
