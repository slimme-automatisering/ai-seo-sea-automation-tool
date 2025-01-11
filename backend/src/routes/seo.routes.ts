import { Router } from 'express'
import { validateRequest } from '../middleware/validation'
import { authenticate } from '../middleware/auth'
import * as seoController from '../controllers/seo.controller'

const router = Router()

// SEO Analysis routes
router.post(
  '/analyze',
  authenticate,
  validateRequest({
    body: {
      url: { type: 'string', required: true },
    },
  }),
  seoController.analyzePage
)

// Keyword research routes
router.post(
  '/keywords',
  authenticate,
  validateRequest({
    body: {
      query: { type: 'string', required: true },
      language: { type: 'string', required: true },
    },
  }),
  seoController.researchKeywords
)

// Content optimization routes
router.post(
  '/optimize',
  authenticate,
  validateRequest({
    body: {
      content: { type: 'string', required: true },
      keywords: { type: 'array', required: true },
    },
  }),
  seoController.optimizeContent
)

export default router
