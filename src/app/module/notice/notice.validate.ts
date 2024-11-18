import { z } from 'zod'

const createNoticeZodSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(['active', 'inactive']),
  priority: z.enum(['medium', 'high', 'low']),
})

const updateNoticeZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  priority: z.enum(['medium', 'high', 'low']).optional(),
})

export const noticeZodSchema = {
  createNoticeZodSchema,
  updateNoticeZodSchema,
}
