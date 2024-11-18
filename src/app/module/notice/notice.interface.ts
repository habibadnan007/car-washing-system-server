export type TNotice = {
  name: string
  description: string
  status: 'active' | 'inactive'
  priority: 'medium' | 'high' | 'low'
}
