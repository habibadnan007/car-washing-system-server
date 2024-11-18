import { NextFunction, Request, Response, Router } from 'express'
import { serviceControllers } from './service.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { serviceZodSchema } from './service.validate'
import { slotZodSchema } from '../slot/slot.validate'
import { slotsControllers } from '../slot/slot.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { upload } from '../../utils/uploadImgToCloudinary'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(serviceZodSchema.createServiceZodSchema),
  serviceControllers.createService,
) //Only accessible by admin
router.post(
  '/slots',
  auth(USER_ROLE.admin),
  zodValidateHandler(slotZodSchema.createSlotZodSchema),
  slotsControllers.createSlot,
) //Only accessible by admin
router.get('/', serviceControllers.getAllService)
router.get('/:id', serviceControllers.getServiceById)
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  serviceControllers.deleteServiceById,
) //Only accessible by admin
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body?.data, 'req.body?.data')
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(serviceZodSchema.updateServiceZodSchema),
  serviceControllers.updateServiceById,
) //Only accessible by admin

export { router as serviceRouter }
