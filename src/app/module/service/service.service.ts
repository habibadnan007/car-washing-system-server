import QueryBuilder from '../../builder/QueryBuilder'
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary'
import { serviceSearchableFields } from './service.constant'
import { TService } from './service.interface'
import Service from './service.model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createService = async (file: any, payload: TService) => {
  // file upload
  if (file?.path) {
    const cloudinaryRes = await uploadImgToCloudinary(
      `${payload.name}-${Date.now()}`,
      file.path,
    )
    if (cloudinaryRes?.secure_url) {
      payload.img = cloudinaryRes.secure_url
    }
  }

  const result = await Service.create(payload)
  return result
}
const getAllService = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(Service.find(), {
    ...query,
    sort: `${query.sort} -createdAt`,
  })
    .searchQuery(serviceSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()

  const result = await serviceQuery?.queryModel
  const total = await Service.countDocuments(
    serviceQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}
const getServiceById = async (id: string) => {
  const result = await Service.findById(id)
  return result
}
const deleteServiceById = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateServiceById = async (id: string, file: any, payload: TService) => {
  // file upload
  if (file?.path) {
    const cloudinaryRes = await uploadImgToCloudinary(
      `${payload.name}-${Date.now()}`,
      file.path,
    )
    if (cloudinaryRes?.secure_url) {
      payload.img = cloudinaryRes.secure_url
    }
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const serviceServices = {
  createService,
  getAllService,
  getServiceById,
  deleteServiceById,
  updateServiceById,
}
