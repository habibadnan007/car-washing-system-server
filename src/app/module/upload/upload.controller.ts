import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { uploadServices } from './upload.service'

const initUpload = catchAsync(async (req, res) => {
  const data = await uploadServices.initUpload(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'File upload successfully!',
    data: data,
  })
})

export const uploadControllers = {
  initUpload,
}
