const getMeta = (
  query: Record<string, unknown> | undefined,
  total: number | undefined,
) => {
  const page = query?.page ? Number(query.page) : 1
  const limit = query?.limit ? Number(query.limit) : 10
  const totalPage = Math.ceil((total as number) / limit)


  return { total, page, totalPage, limit }
}

export default getMeta
