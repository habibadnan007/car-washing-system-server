import { Router } from 'express'
import { serviceRouter } from '../module/service/service.route'
import { slotRouter } from '../module/slot/slot.route'
import { bookingRouter } from '../module/booking/booking.route'
import { userRouter } from '../module/user/user.route'
import { statsRouter } from '../module/stats/stats.route'
import { paymentRouter } from '../module/payment/payment.route'
import { uploadRouter } from '../module/upload/upload.route'
import { reviewRouter } from '../module/review/review.route'
import { noticeRouter } from '../module/notice/notice.route'

const router = Router()
const routes = [
  {
    path: '/services',
    route: serviceRouter,
  },
  {
    path: '/slots',
    route: slotRouter,
  },
  {
    path: '/bookings',
    route: bookingRouter,
  },
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/payment',
    route: paymentRouter,
  },
  {
    path: '/upload',
    route: uploadRouter,
  },
  {
    path: '/stats',
    route: statsRouter,
  },
  {
    path: '/review',
    route: reviewRouter,
  },
  {
    path: '/notice',
    route: noticeRouter,
  },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
