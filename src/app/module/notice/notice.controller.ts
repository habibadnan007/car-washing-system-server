import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import { noticeServices } from './notice.service'
import sendResponse from '../../utils/sendResponse'

const createNotice = catchAsync(async (req, res) => {
  const notice = await noticeServices.createNotice(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Notice is created successfully!',
    data: notice,
  })
})

const getAllNotices = catchAsync(async (req, res) => {
  const { data, total } = await noticeServices.getAllNotices(req.query)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Notices retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

const getNoticeById = catchAsync(async (req, res) => {
  const notice = await noticeServices.getNoticeById(req.params?.id as string)
  if (!notice) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Notice not found')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Notice retrieved successfully!',
    data: notice,
  })
})

const deleteNoticeById = catchAsync(async (req, res) => {
  const notice = await noticeServices.deleteNoticeById(req.params?.id as string)
  if (!notice) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Notice not found')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Notice is deleted successfully!',
    data: notice,
  })
  return notice
})

const updateNoticeById = catchAsync(async (req, res) => {
  const notice = await noticeServices.updateNoticeById(req.params?.id, req.body)
  if (!notice) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Notice not found')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Notice is updated successfully!',
    data: notice,
  })
})

export const noticeControllers = {
  createNotice,
  getAllNotices,
  getNoticeById,
  deleteNoticeById,
  updateNoticeById,
}
