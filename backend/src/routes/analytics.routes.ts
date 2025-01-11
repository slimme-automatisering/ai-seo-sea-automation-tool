import { Router } from 'express'
import { validateRequest } from '../middleware/validation'
import { authenticate } from '../middleware/auth'
import * as analyticsController from '../controllers/analytics.controller'

const router = Router()

// Analytics data routes
router.get(
  '/',
  authenticate,
  validateRequest({
    query: {
      period: { type: 'string', required: true },
    },
  }),
  analyticsController.getAnalytics
)

// Export routes
router.get(
  '/export',
  authenticate,
  validateRequest({
    query: {
      period: { type: 'string', required: true },
      format: { type: 'string', enum: ['csv', 'pdf'], required: true },
    },
  }),
  analyticsController.exportAnalytics
)

// Campaign performance routes
router.get(
  '/campaigns/:id',
  authenticate,
  validateRequest({
    query: {
      startDate: { type: 'string', required: true },
      endDate: { type: 'string', required: true },
    },
  }),
  analyticsController.getCampaignPerformance
)

export default router
