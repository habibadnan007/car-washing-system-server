import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { TErrorMessages, TGenericErrorResponse } from '../interface/error'

const handleMongooseValidationErr = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST
  const message = 'Validation Error'
  const errorMessages: TErrorMessages = Object.keys(err.errors).map((key) => {
    return {
      path: key,
      message: err.errors[key]?.message,
    }
  })

  return {
    statusCode,
    message,
    errorMessages,
  }
}

const handleMongooseCastErr = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST
  const message = 'Cast Error'
  const errorMessages: TErrorMessages = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]

  return {
    statusCode,
    message,
    errorMessages,
  }
}

const handleMongooseDuplicateKeyErr = (err: any): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST
  const message = 'Duplicate Entry'
  const errorMessages: TErrorMessages = [
    {
      path: Object.keys(err.keyValue)?.[0],
      message: `${Object.values(err.keyValue)?.[0]} is already exist!`,
    },
  ]

  return {
    statusCode,
    message,
    errorMessages,
  }
}

export {
  handleMongooseValidationErr,
  handleMongooseCastErr,
  handleMongooseDuplicateKeyErr,
}
