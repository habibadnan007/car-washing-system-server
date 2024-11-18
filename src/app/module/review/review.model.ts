import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
  },
  { timestamps: true },
)

const Review = model('Review', reviewSchema)

export default Review
