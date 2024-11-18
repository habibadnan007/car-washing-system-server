import { z } from 'zod'

const createSlotZodSchema = z.object({
  service: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
})

export const slotZodSchema = {
  createSlotZodSchema,
}
