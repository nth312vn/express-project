import { generateAccessToken, generateRefreshToken } from '@src/utils/token'
import { Request, Response } from 'express'

export const loginController = async (req: Request, res: Response) => {
  const userInfo = res.locals.userInfo
  const [accessToken, refreshToken] = await Promise.all([generateAccessToken(userInfo), generateRefreshToken(userInfo)])
  return res.status(200).json({
    accessToken,
    refreshToken
  })
}
