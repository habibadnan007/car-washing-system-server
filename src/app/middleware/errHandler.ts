import { ErrorRequestHandler, RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose, { MongooseError } from 'mongoose'
import { ZodError } from 'zod'
import handleZodErr from '../errors/handleZodErr'
import {
  handleMongooseCastErr,
  handleMongooseDuplicateKeyErr,
  handleMongooseValidationErr,
} from '../errors/handleMongooseErr'

const notFoundErrHandler: RequestHandler = (req, res, next) => {
  // const error = new Error(`Not Found - ${req.originalUrl}`)
  const statusCode = StatusCodes.NOT_FOUND
  res
    .status(statusCode)
    .send({ success: false, statusCode, message: 'Not Found' })
}

const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  let message = err.message || 'Internal Server Error'
  let errorMessages = [
    {
      path: '',
      message: 'Internal Server Error',
    },
  ]

  // zod err
  if (err instanceof ZodError) {
    const myErr = handleZodErr(err)
    statusCode = myErr.statusCode
    message = myErr.message
    errorMessages = myErr.errorMessages
  }

  // Cast err
  if (err instanceof mongoose.Error.CastError) {
    const myErr = handleMongooseCastErr(err)
    statusCode = myErr.statusCode
    message = myErr.message
    errorMessages = myErr.errorMessages
  }
  // validation err
  if (err instanceof mongoose.Error.ValidationError) {
    const myErr = handleMongooseValidationErr(err)
    statusCode = myErr.statusCode
    message = myErr.message
    errorMessages = myErr.errorMessages
  }
  // Cast err
  if (err?.code === 11000) {
    const myErr = handleMongooseDuplicateKeyErr(err)
    statusCode = myErr.statusCode
    message = myErr.message
    errorMessages = myErr.errorMessages
  }

  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err?.stack,
    // err,
  })
}

export { notFoundErrHandler, globalErrHandler }
