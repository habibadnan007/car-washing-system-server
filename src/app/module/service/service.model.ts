import { Schema, model } from 'mongoose'
import { TService } from './service.interface'

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Service = model('Service', serviceSchema)

export default Service
