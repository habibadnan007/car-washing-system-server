import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.service'
import AppError from '../../errors/AppError'

const createUser = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.file, req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User registered successfully',
    data: user,
  })
})
const signinUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await userServices.signinUser(req.body)

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies || {}

  if (!refreshToken) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Refresh token is required')
  }

  const result = await userServices.refreshToken(refreshToken)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Access token is retrieved successfully',
    data: result,
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const { data, total } = await userServices.getAllUser(req.query)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Users are retrieved successfully!',
    data,
    meta: { query: req.query, total },
  })
})

const deleteUserById = catchAsync(async (req, res) => {
  const user = await userServices.deleteUserById(req.params.id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is deleted successfully!',
    data: user,
  })
})
const toggleUserRoleById = catchAsync(async (req, res) => {
  const user = await userServices.toggleUserRoleById(req.params.id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: `This user is now ${user.role}!`,
    data: user,
  })
})

const updateProfile = catchAsync(async (req, res) => {
  const user = await userServices.updateProfile(
    req.params?.id,
    req.file,
    req.body,
  )

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
  }

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is updated successfully!',
    data: user,
  })
})
const changePassword = catchAsync(async (req, res) => {
  const user = await userServices.changePassword(req.params?.id, req.body)

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
  }

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Password is updated successfully!',
    data: user,
  })
})

export const userControllers = {
  createUser,
  signinUser,
  getAllUser,
  refreshToken,
  deleteUserById,
  toggleUserRoleById,
  updateProfile,
  changePassword,
}
