import QueryBuilder from '../../builder/QueryBuilder'
import { noticeSearchableFields } from './notice.constant'
import { TNotice } from './notice.interface'
import Notice from './notice.model'

const createNotice = async (payload: TNotice) => {
  const result = await Notice.create(payload)
  return result
}

const getAllNotices = async (query: Record<string, unknown>) => {
  const noticeQuery = new QueryBuilder(Notice.find(), {
    ...query,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(noticeSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()

  const result = await noticeQuery?.queryModel
  const total = await Notice.countDocuments(noticeQuery.queryModel.getFilter())
  return { data: result, total }
}

const getNoticeById = async (id: string) => {
  const result = await Notice.findById(id)
  return result
}

const deleteNoticeById = async (id: string) => {
  const result = await Notice.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const updateNoticeById = async (id: string, payload: TNotice) => {
  const result = await Notice.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const noticeServices = {
  createNotice,
  getAllNotices,
  getNoticeById,
  deleteNoticeById,
  updateNoticeById,
}
