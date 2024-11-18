import { z } from 'zod'

const createReviewZodSchema = z.object({
  user: z.string(),
  rating: z.number(),
  feedback: z.string(),
})

export const reviewZodSchema = {
  createReviewZodSchema,
}
