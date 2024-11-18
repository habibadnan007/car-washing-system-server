/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    address: { type: String, required: true },
    img: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

userSchema.pre<TUser>('save', async function (next) {
  try {
    const hashedPass = await bcrypt.hash(
      this.password,
      Number(process.env.SALT_ROUNDS),
    )
    this.password = hashedPass

    next()
  } catch (e: any) {
    next(e)
  }
})

userSchema.post<TUser>('save', async function (doc, next) {
  doc.password = undefined as any
  next()
})

const User = model('User', userSchema)

export default User
