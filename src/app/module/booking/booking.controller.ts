import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'
import { Request, Response } from 'express'

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await BookingServices.createBooking(req.user?.email, req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Booking successful',
    data: booking,
  })
})
const getAllBookings = catchAsync(async (req, res) => {
  const { data, total } = await BookingServices.getAllBookings(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'All bookings are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const { data, total } = await BookingServices.getMyBookings({
    email: req.user?.email,
    ...req.query,
  })

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User bookings are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings,
}
