import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { CustomError } from '@src/helpers/customError'
import { createRefreshToken, deleteRefreshToken } from '@src/services/refreshToken'
import { createUser } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { User, UserRequest } from '@src/types/user'
import { generateAccessToken, generateRefreshToken } from '@src/utils/token'
import { NextFunction, Response } from 'express'

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
  return res.status(httpStatusCode.OK).json({
    message: Message.LOGIN_SUCCESS,
    data: {
      accessToken,
      refreshToken
    }
  })
}
export const registerController = async (req: CustomRequestBody<UserRequest>, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body)
    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken({
        userId: user._id,
        name: user.name,
        email: user.email,
        date_of_birth: user.date_of_birth,
        bio: user.bio,
        location: user.location,
        website: user.website,
        avatar: user.avatar,
        cover_photo: user.cover_photo
      }),
      generateRefreshToken({ name: user.name, email: user.email })
    ])
    await createRefreshToken({ refreshToken, userId: user._id })

    return res.status(httpStatusCode.OK).json({
      message: Message.REGISTER_SUCCESS,
      data: {
        accessToken,
        refreshToken
      }
    })
  } catch (e) {
    next(e)
  }
}

export const logoutController = async (req: any, res: Response) => {
  const isExists = await deleteRefreshToken({
    refreshToken: req.body.refreshToken,
    userId: req.body.tokenDecoded.userId
  })
  if (!isExists) {
    throw new CustomError({
      status: httpStatusCode.UNAUTHORIZED,
      message: 'token is not exists'
    })
  }
  return res.status(httpStatusCode.OK).json({
    message: Message.LOGOUT_SUCCESS
  })
}
