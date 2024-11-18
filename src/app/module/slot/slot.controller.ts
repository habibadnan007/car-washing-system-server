import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { slotServices } from './slot.service'
import AppError from '../../errors/AppError'

const createSlot = catchAsync(async (req, res) => {
  const service = await slotServices.createSlot(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Slots created successfully',
    data: service,
  })
})
const getAvailableSlots = catchAsync(async (req, res) => {
  const { data, total } = await slotServices.getAvailableSlots(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Available slots are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

const getAllSlots = catchAsync(async (req, res) => {
  const { data, total } = await slotServices.getAllSlots(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Available slots are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

const getSlotById = catchAsync(async (req, res) => {
  const slot = await slotServices.getSlotById(req.params?.id as string)
  if (!slot) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Slot not found')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Slot is retrieved successfully!',
    data: slot,
  })
})

const toggleSlotStatus = catchAsync(async (req, res) => {
  const slot = await slotServices.toggleSlotStatus(req.params.id)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Slot status updated successfully',
    data: slot,
  })
})

export const slotsControllers = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
  toggleSlotStatus,
  getSlotById,
}
