/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { TPasswordUpdate, TUser, TUserSignin } from './user.interface'
import User from './user.model'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'
import { userSearchableFields } from './user.constant'
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary'

const createUser = async (file: any, payload: TUser) => {
  const isExistUser = await User.findOne({ email: payload?.email })
  if (isExistUser) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This email is already exist!')
  }
  // file upload
  if (file?.path) {
    const cloudinaryRes = await uploadImgToCloudinary(
      `${payload.name}-${Date.now()}`,
      file.path,
    )
    if (cloudinaryRes?.secure_url) {
      payload.img = cloudinaryRes.secure_url
    }
  }
  const result = await User.create(payload)
  return result
}
const signinUser = async (payload: TUserSignin) => {
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found')
  }
  const decryptPass = await bcrypt.compare(payload.password, user.password)
  if (!decryptPass) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password is not match')
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    img: user.img,
    address: user.address,
  }

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    },
  )

  const refreshToken = jwt.sign(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
    },
  )

  return {
    accessToken,
    refreshToken,
    data: user,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid

  let decoded
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload
  } catch (e) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
  }

  const { email } = decoded

  // checking if the user is exist
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !')
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    img: user.role,
    address: user.address,
  }

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    },
  )

  return {
    accessToken,
  }
}

const getAllUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), {
    ...query,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(userSearchableFields)
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()

  const result = await userQuery.queryModel

  const total = await User.countDocuments(userQuery.queryModel.getFilter())
  return { data: result, total }
}

const toggleUserRoleById = async (id: string) => {
  const user = await User.findById({ _id: id })
  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is not found!')
  }

  user.role = user.role === 'admin' ? 'user' : 'admin'
  await user.save()

  return user
}

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return user
}

const updateProfile = async (id: string, file: any, payload: TUser) => {
  // file upload
  if (file?.path) {
    const cloudinaryRes = await uploadImgToCloudinary(
      `${payload.name}-${Date.now()}`,
      file.path,
    )
    if (cloudinaryRes?.secure_url) {
      payload.img = cloudinaryRes.secure_url
    }
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true })
  return result
}
const changePassword = async (id: string, payload: TPasswordUpdate) => {
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }

  const decryptPass = await bcrypt.compare(payload.oldPassword, user.password)
  if (!decryptPass) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password is not match')
  }

  const hashedPass = await bcrypt.hash(
    payload.newPassword,
    Number(process.env.SALT_ROUNDS),
  )

  const result = await User.findByIdAndUpdate(
    id,
    { password: hashedPass },
    { new: true },
  ).select('-password')
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update password.',
    )
  }
  return result
}

export const userServices = {
  createUser,
  signinUser,
  getAllUser,
  refreshToken,
  deleteUserById,
  toggleUserRoleById,
  updateProfile,
  changePassword,
}
