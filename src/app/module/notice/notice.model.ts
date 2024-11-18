import { Schema, model } from 'mongoose'
import { TNotice } from './notice.interface'

const noticeSchema = new Schema<TNotice>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    priority: { type: String, enum: ['medium', 'high', 'low'], required: true },
  },
  { timestamps: true },
)

const Notice = model<TNotice>('Notice', noticeSchema)

export default Notice
