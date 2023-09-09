import { createRefreshToken } from '@src/services/refreshToken'
import { User } from '@src/types/user'
import { generateAccessToken, generateRefreshToken } from '@src/utils/token'
import { Request, Response } from 'express'

export const loginController = async (req: any, res: Response) => {
  const userInfo: User = req.user
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken({
      userId: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      date_of_birth: userInfo.date_of_birth,
      bio: userInfo.bio,
      location: userInfo.location,
      website: userInfo.website,
      avatar: userInfo.avatar,
      cover_photo: userInfo.cover_photo
    }),
    generateRefreshToken({ name: userInfo.name, email: userInfo.email })
  ])
  await createRefreshToken({ refreshToken, userId: userInfo._id })
  return res.status(200).json({
    accessToken,
    refreshToken
  })
}
