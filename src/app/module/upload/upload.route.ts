import { Router } from 'express'
import { uploadControllers } from './upload.controller'

const router = Router()

router.post(
  '/',
  uploadControllers.initUpload,
)

export { router as uploadRouter }
