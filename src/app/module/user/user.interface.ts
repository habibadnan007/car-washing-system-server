import { USER_ROLE } from './user.constant'

export type TUserRole = keyof typeof USER_ROLE
export type TUser = {
  name: string
  email: string
  password: string
  phone: string
  role: TUserRole
  address: string
  img: string
  isDeleted: boolean
}
export type TPasswordUpdate = {
  oldPassword: string
  newPassword: string
}

export type TUserSignin = {
  email: string
  password: string
}
