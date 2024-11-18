import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import Service from '../service/service.model'
import { TSlot } from './slot.interface'
import Slot from './slot.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { slotSearchableFields } from './slot.constant'

const createSlot = async (payload: TSlot) => {
  const { service, startTime, endTime, date, ...restSlotProps } = payload || {}

  // Validate if the date is not in the past
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set the time to the beginning of today for accurate comparison

  const slotDate = new Date(date) // Parse the ISO 8601 date

  if (slotDate < today) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'The date cannot be in the past!',
    )
  }
  // Validation: Check if endTime is greater than startTime
  const startTimeToMin =
    Number(startTime?.split(':')[0]) * 60 + Number(startTime?.split(':')[1])
  const endTimeToMin =
    Number(endTime?.split(':')[0]) * 60 + Number(endTime?.split(':')[1])

  if (endTimeToMin <= startTimeToMin) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'End time must be later than start time!',
    )
  }

  const isExistService = await Service.findById(service)

  if (!isExistService) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service is not found!')
  }

  if (isExistService.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Service is deleted!')
  }

  const slots = []
  const serviceDuration = isExistService?.duration

  for (
    let time = startTimeToMin;
    time < endTimeToMin;
    time += serviceDuration
  ) {
    const slotStartTime = `${Math.floor(time / 60)
      .toString()
      .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
    const slotEndTime = `${Math.floor((time + serviceDuration) / 60)
      .toString()
      .padStart(
        2,
        '0',
      )}:${((time + serviceDuration) % 60).toString().padStart(2, '0')}`

    const slot = new Slot({
      startTime: slotStartTime,
      endTime: slotEndTime,
      service,
      date,
      ...restSlotProps,
    })
    slots.push(slot)
    await slot.save()
  }

  return slots
}
const getAllSlots = async (query: Record<string, unknown>) => {
  const isUpcoming = query.upcoming
  delete query.upcoming

  const slotsQuery = new QueryBuilder(Slot.find(), {
    ...query,
  })
    .searchQuery(slotSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'service',
      },
    ])

  if (isUpcoming) {
    const currentTimestamp = new Date().getTime() // Get current time as a timestamp
    slotsQuery.queryModel = slotsQuery.queryModel
      .where('date')
      .gte(currentTimestamp)
  }

  const result = await slotsQuery?.queryModel.exec()
  const total = await Slot.countDocuments(slotsQuery.queryModel.getFilter())
  return { data: result, total }
}

const getAvailableSlots = async (query: Record<string, unknown>) => {
  const isUpcoming = query.upcoming
  delete query.upcoming
  const slotsQuery = new QueryBuilder(Slot.find(), {
    ...query,
    isBooked: 'available',
  })
    .searchQuery([])
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'service',
      },
    ])

  if (isUpcoming) {
    const currentTimestamp = new Date().getTime() // Get current time as a timestamp
    slotsQuery.queryModel = slotsQuery.queryModel
      .where('date')
      .gte(currentTimestamp)
  }

  const result = await slotsQuery?.queryModel.exec()
  const total = await Slot.countDocuments(slotsQuery.queryModel.getFilter())
  return { data: result, total }
}

const toggleSlotStatus = async (id: string) => {
  const slot = await Slot.findById(id)

  if (!slot) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Slot is not found!')
  }
  if (slot.isBooked === 'booked') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Slot is already booked!')
  }

  slot.isBooked = slot.isBooked === 'available' ? 'canceled' : 'available'
  await slot.save()

  return slot
}

const getSlotById = async (id: string) => {
  const result = await Slot.findById(id).populate('service')
  return result
}

export const slotServices = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
  getSlotById,
  toggleSlotStatus,
}
