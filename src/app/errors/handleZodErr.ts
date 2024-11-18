import { StatusCodes } from 'http-status-codes'
import { ZodError, ZodIssue } from 'zod'
import { TErrorMessages, TGenericErrorResponse } from '../interface/error'

const handleZodErr = (err: ZodError): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST
  const message = 'Validation error!'
  const errorMessages:TErrorMessages = err?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue.path?.[issue?.path?.length - 1] as string,
      message: issue?.message,
    }
  })
  return {
    statusCode,
    message,
    errorMessages,
  }
}

export default handleZodErr
