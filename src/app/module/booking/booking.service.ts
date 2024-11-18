import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Slot from '../slot/slot.model'
import { TBooking } from './booking.interface'
import Booking from './booking.model'
import mongoose, { Types } from 'mongoose'
import User from '../user/user.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { bookingSearchableFields } from './booking.constant'
import Service from '../service/service.model'

const createBooking = async (
  email: string,
  payload: Partial<TBooking> & {
    serviceId: Types.ObjectId
    slotId: Types.ObjectId
  },
) => {
  const { serviceId, slotId, ...restBookingProps } = payload || {}

  const isExistService = await Service.findById(serviceId)
  const isExistSlot = await Slot.findById(slotId)
  const isExistUser = await User.findOne({ email })

  if (!isExistUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!')
  }
  if (!isExistService || isExistService?.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service is not found!')
  }
  if (!isExistSlot) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Slot is not found!')
  }

  if (isExistSlot.isBooked == 'booked') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Slot is already booked!')
  }

  if (isExistSlot.service != serviceId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service is not found in slot!')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    isExistSlot.isBooked = 'booked'
    await isExistSlot.save({ session })

    const booking = await Booking.create(
      [
        {
          service: serviceId,
          slot: slotId,
          date: isExistSlot.date,
          customer: isExistUser?._id,
          ...restBookingProps,
        },
      ],
      { session },
    )

    if (!booking?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to booking!')
    }

    await session.commitTransaction()

    const result = await Booking.findById(booking[0]._id)
      .populate('customer')
      .populate('service')
      .populate('slot')
    return result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    await session.abortTransaction()
    throw new AppError(StatusCodes.BAD_REQUEST, e.message)
  } finally {
    await session.endSession()
  }
}

const getAllBookings = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(Booking.find(), {
    ...query,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(bookingSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'service',
      },
      {
        path: 'customer',
      },
      {
        path: 'slot',
      },
    ])

  const result = await bookingQuery?.queryModel
  const total = await Booking.countDocuments(
    bookingQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

const getMyBookings = async (query: Record<string, unknown>) => {
  const user = await User.findOne({ email: query.email })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!')
  }

  // Remove `email` from query as it's already used to find the user
  delete query.email
  const isUpcoming = query.upcoming
  delete query.upcoming

  const bookingQuery = new QueryBuilder(Booking.find(), {
    ...query,
    customer: user._id,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(bookingSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'service',
      },
      {
        path: 'customer',
      },
      {
        path: 'slot',
      },
    ])

  if (isUpcoming) {
    const currentTimestamp = new Date().getTime() // Get current time as a timestamp
    bookingQuery.queryModel = bookingQuery.queryModel
      .where('date')
      .gte(currentTimestamp)
  }

  const result = await bookingQuery?.queryModel.exec()
  const total = await Booking.countDocuments(
    bookingQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

export const BookingServices = {
  createBooking,
  getAllBookings,
  getMyBookings,
}
