import { UserVerifyStatus } from '@src/constants/user'
import { ObjectId } from 'mongoose'

export interface User {
  _id: ObjectId
  name: string
  username: string
  email: string
  date_of_birth: string
  password: string
  createdAt?: Date | null
  updatedAt?: Date | null
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  bio?: string
  location?: string
  website?: string
  avatar?: string
  cover_photo?: string
}
export type UserRequest = Omit<User, '_id' | 'createdAt' | 'updatedAt'>
export interface LoginInfo {
  email: string
  password: string
}
