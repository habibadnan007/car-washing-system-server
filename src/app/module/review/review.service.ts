import { TReview } from './review.interface'
import Review from './review.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createReview = async (payload: TReview) => {
  const result = await Review.create(payload)
  return result
}
const getAllReview = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(Review.find(), {
    ...query,
  })
    .searchQuery([])
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'user',
      },
    ])

  const result = await reviewQuery?.queryModel
  const total = await Review.countDocuments(reviewQuery.queryModel.getFilter())
  return { data: result, total }
}

const getAverageRating = async (query: Record<string, unknown>) => {
  const result = await Review.aggregate([
    { $match: query }, // Filter reviews based on the query
    { $group: { _id: null, averageRating: { $avg: '$rating' } } }, // Calculate the average rating
  ])

  return result[0]?.averageRating || 0
}

export const reviewServices = {
  createReview,
  getAllReview,
  getAverageRating,
}
