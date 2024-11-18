import { Response } from 'express'
import getMeta from './getMeta'

const sendResponse = (
  res: Response,
  statusCode: number,
  format: {
    success: boolean
    message: string
    data: any
    // meta?: { total: number; page: number; totalPage: number; limit: number }
    meta?: { query: Record<string, unknown>; total: number }
  },
) => {
  res.status(statusCode).send({
    success: format?.success,
    message: format?.message,
    data: format?.data || null,
    meta: getMeta(format.meta?.query, format.meta?.total),
  })
}

export default sendResponse
