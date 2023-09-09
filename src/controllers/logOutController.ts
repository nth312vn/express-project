import { deleteRefreshToken } from '@src/services/refreshToken'
import { NextFunction, Request, Response } from 'express'

export const logOutController = async (req: any, res: Response, next: NextFunction) => {
  const isExists = await deleteRefreshToken({
    refreshToken: req.body.refreshToken,
    userId: req.body.tokenDecoded.userId
  })
  if (!isExists) {
    throw new Error('refreshToken is not exists')
  }

  return res.status(200).json({
    message: 'loggout success'
  })
}
