import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import { serviceServices } from './service.service'
import sendResponse from '../../utils/sendResponse'

const createService = catchAsync(async (req, res) => {
  const service = await serviceServices.createService(req.file, req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Service is created successfully!',
    data: service,
  })
})
const getAllService = catchAsync(async (req, res) => {
  const { data, total } = await serviceServices.getAllService(req.query)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Services retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})
const getServiceById = catchAsync(async (req, res) => {
  const service = await serviceServices.getServiceById(req.params?.id as string)
  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Service retrieved successfully!',
    data: service,
  })
})
const deleteServiceById = catchAsync(async (req, res) => {
  const service = await serviceServices.deleteServiceById(
    req.params?.id as string,
  )
  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Service is deleted successfully!',
    data: service,
  })
  return service
})

const updateServiceById = catchAsync(async (req, res) => {
  const service = await serviceServices.updateServiceById(
    req.params?.id,
    req.file, 
    req.body,
  )

  if (!service) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Service not found')
  }

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Service is updated successfully!',
    data: service,
  })
})

export const serviceControllers = {
  createService,
  getAllService,
  getServiceById,
  deleteServiceById,
  updateServiceById,
}
