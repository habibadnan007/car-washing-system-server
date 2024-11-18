import { Router } from 'express'
import { slotsControllers } from './slot.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.get('/', slotsControllers.getAllSlots)
router.get('/:id', slotsControllers.getSlotById)
router.get('/availability', slotsControllers.getAvailableSlots)
router.patch(
  '/toggle-status/:id',
  auth(USER_ROLE.admin),
  slotsControllers.toggleSlotStatus,
)

export { router as slotRouter }
