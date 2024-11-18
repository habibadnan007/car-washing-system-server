import { NextFunction, Request, Response, Router } from 'express'
import { userControllers } from './user.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { userZodSchema } from './user.validate'
import { userServices } from './user.service'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'
import { upload } from '../../utils/uploadImgToCloudinary'

const router = Router()

router.post(
  '/signup',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(userZodSchema.createUserZodSchema),
  userControllers.createUser,
)
router.post(
  '/login',
  zodValidateHandler(userZodSchema.signinUserZodSchema),
  userControllers.signinUser,
)
router.post('/refresh-token', userServices.refreshToken)
router.get('/users', auth(USER_ROLE.admin), userControllers.getAllUser)

router.delete(
  '/users/:id',
  auth(USER_ROLE.admin),
  userControllers.deleteUserById,
)
router.patch(
  '/users/toggle-role/:id',
  auth(USER_ROLE.admin),
  userControllers.toggleUserRoleById,
)
router.patch(
  '/users/edit-profile/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(userZodSchema.editProfileZodSchema),
  userControllers.updateProfile,
)
router.patch(
  '/users/edit-password/:id',
  zodValidateHandler(userZodSchema.editPasswordZodSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  userControllers.changePassword,
)

export { router as userRouter }
