import { z } from 'zod'


const createBookingZodSchema = z.object({
  serviceId: z.string(),
  slotId: z.string(),
  vehicleType: z.enum([
    'car',
    'truck',
    'SUV',
    'van',
    'motorcycle',
    'bus',
    'electricVehicle',
    'hybridVehicle',
    'bicycle',
    'tractor',
  ]),
  vehicleBrand: z.string(),
  vehicleModel: z.string(),
  manufacturingYear: z.number(),
  registrationPlate: z.string(),
})

export const bookingZodSchema = {
  createBookingZodSchema,
}