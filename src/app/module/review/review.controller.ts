import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { reviewServices } from './review.service'

const createReview = catchAsync(async (req, res) => {
  const review = await reviewServices.createReview(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Review created successfully',
    data: review,
  })
})

const getAllReview = catchAsync(async (req, res) => {
  const { data, total } = await reviewServices.getAllReview(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Reviews are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})
const getAverageRating = catchAsync(async (req, res) => {
  const data = await reviewServices.getAverageRating(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Average ratings are retrieved successfully!',
    data,
  })
})

export const reviewControllers = {
  createReview,
  getAllReview,
  getAverageRating,
}
