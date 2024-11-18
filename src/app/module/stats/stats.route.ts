import { Router } from 'express'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { statsControllers } from './stats.controller'

const router = Router()

router.get('/admin', auth(USER_ROLE.admin), statsControllers.getAdminStats)
router.get('/user', auth(USER_ROLE.user), statsControllers.getUserStats)

export { router as statsRouter }
