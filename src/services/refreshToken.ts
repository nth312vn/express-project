import refreshTokenModel from '@src/models/refreshToken'
import { CreateRefreshTokenParams } from '@src/types/refreshTokenModel'

export const createRefreshToken = async (params: CreateRefreshTokenParams) => {
  const refreshTokenDetail = new refreshTokenModel(params)
  return await refreshTokenDetail.save()
}
