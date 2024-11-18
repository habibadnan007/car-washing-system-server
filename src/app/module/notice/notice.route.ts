import { Router } from 'express'
import { noticeControllers } from './notice.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { noticeZodSchema } from './notice.validate'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  zodValidateHandler(noticeZodSchema.createNoticeZodSchema),
  noticeControllers.createNotice,
) // Only accessible by admin

router.get('/', noticeControllers.getAllNotices)
router.get('/:id', noticeControllers.getNoticeById)

router.delete('/:id', auth(USER_ROLE.admin), noticeControllers.deleteNoticeById) // Only accessible by admin

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  zodValidateHandler(noticeZodSchema.updateNoticeZodSchema),
  noticeControllers.updateNoticeById,
) // Only accessible by admin

export { router as noticeRouter }
