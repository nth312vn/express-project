import refreshTokenModel from '@src/models/refreshToken'
import { CreateRefreshTokenParams, RefreshTokenModel } from '@src/types/token'

export const createRefreshToken = async (params: CreateRefreshTokenParams) => {
  const refreshTokenDetail = new refreshTokenModel(params)
  return await refreshTokenDetail.save()
}
export const getRefreshTokenByCondition = async (params: Partial<RefreshTokenModel>) => {
  return await refreshTokenModel.findOne({
    ...params
  })
}
export const deleteRefreshToken = async (condition: Partial<RefreshTokenModel>) => {
  return await refreshTokenModel.findOneAndDelete({
    ...condition
  })
}
