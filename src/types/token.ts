import { ObjectId } from 'mongoose'

export interface RefreshTokenModel {
  _id: ObjectId
  refreshToken: string
  userId: ObjectId
  createdAt?: Date | null
  updatedAt?: Date | null
}
export interface CreateRefreshTokenParams {
  refreshToken: string
  userId: string
}
export interface TokenDecoded {
  userId: string
  name: string
  email: string
  date_of_birth: string
  bio: string
  location: string
  website: string
  avatar: string
  cover_photo: string
}
