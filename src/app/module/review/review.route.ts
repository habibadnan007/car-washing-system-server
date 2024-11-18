import { Router } from 'express'
import { reviewControllers } from './review.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { reviewZodSchema } from './review.validate'

const router = Router()

router.post(
  '/',
  zodValidateHandler(reviewZodSchema.createReviewZodSchema),
  reviewControllers.createReview,
)
router.get('/', reviewControllers.getAllReview)
router.get('/average-rating', reviewControllers.getAverageRating)

export { router as reviewRouter }
