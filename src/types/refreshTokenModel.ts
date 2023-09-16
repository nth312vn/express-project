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
