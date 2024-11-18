import { z } from 'zod'

const createUserZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.enum(['admin', 'user']).optional(),
  address: z.string(),
})
const editProfileZodSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})
const editPasswordZodSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})
const signinUserZodSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const userZodSchema = {
  createUserZodSchema,
  signinUserZodSchema,
  editProfileZodSchema,
  editPasswordZodSchema,
}
