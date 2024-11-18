import { Router } from 'express'
import { bookingControllers } from './booking.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { bookingZodSchema } from './booking.validate'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.user),
  zodValidateHandler(bookingZodSchema.createBookingZodSchema),
  bookingControllers.createBooking,
) //TODO: only accessible by user
router.get('/', auth(USER_ROLE.admin), bookingControllers.getAllBookings) //TODO: only accessible by admin
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  bookingControllers.getMyBookings,
) //TODO: only accessible by user

export { router as bookingRouter }
