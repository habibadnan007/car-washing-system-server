import Booking from '../booking/booking.model'
import Service from '../service/service.model'
import Slot from '../slot/slot.model'
import User from '../user/user.model'

const getAdminStats = async () => {
  const totalUsers = await User.countDocuments()
  const totalServices = await Service.countDocuments()
  const totalSlots = await Slot.countDocuments()
  // Fetch upcoming slots (slots with a date later than the current time)
  const upcomingSlots = await Slot.countDocuments({
    date: { $gte: new Date() },
  })

  // Fetch available slots (slots that are not booked)
  const availableSlots = await Slot.countDocuments({
    isBooked: 'available',
  })

  // Fetch the total number of bookings
  const totalBookings = await Booking.countDocuments()

  return {
    totalUsers,
    totalServices,
    totalSlots,
    availableSlots,
    upcomingSlots,
    totalBookings,
  }
}
const getUserStats = async (payload: Record<string, unknown>) => {
  const totalServices = await Service.countDocuments()
  // Fetch upcoming slots (slots with a date later than the current time)
  const upcomingSlots = await Slot.countDocuments({
    date: { $gte: new Date() },
  })
  const availableSlots = await Slot.find({
    isBooked: 'available',
  }).countDocuments()

  // Fetch the total number of bookings
  const totalBookings = await Booking.find({
    customer: payload?.customer,
  }).countDocuments()

  // Fetch the total number of upcoming bookings
  const upcomingBookings = await Booking.find({
    customer: payload?.customer,
    date: { $gte: new Date() },
  }).countDocuments()

  return {
    totalServices,
    availableSlots,
    upcomingSlots,
    totalBookings,
    upcomingBookings,
  }
}

export const statsService = {
  getAdminStats,
  getUserStats,
}
