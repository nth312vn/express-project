import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { UserVerifyStatus } from '@src/constants/user'
import { CustomError } from '@src/helpers/customError'
import { isStatusVerified } from '@src/helpers/verify'
import { createRefreshToken, deleteRefreshToken } from '@src/services/refreshToken'
import { createUser, getUserByConditions, updateUserByCondition } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { LoginRequest, LogoutRequest, VerifyEmailRequest } from '@src/types/requestTypes'
import { User, UserRequest } from '@src/types/user'
import { generateAccessToken, generateEmailVerifyToken, generateRefreshToken } from '@src/utils/token'
import { NextFunction, Response } from 'express'

export const loginController = async (req: CustomRequestBody<LoginRequest>, res: Response) => {
  const userInfo: User = req.body.user
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
    const user = await createUser({ ...req.body, generateEmailVerifyToken })
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

export const logoutController = async (req: CustomRequestBody<LogoutRequest>, res: Response) => {
  const isExists = await deleteRefreshToken({
    refreshToken: req.body.refreshToken,
    userId: res.locals.tokenDecoded.userId
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
export const verifyEmailController = async (req: CustomRequestBody<VerifyEmailRequest>, res: Response) => {
  const { tokenDecode, emailVerifyToken } = req.body
  const user = await getUserByConditions({ _id: tokenDecode.id, email_verify_token: emailVerifyToken })
  if (!user) {
    return res.status(httpStatusCode.NOTFOUND).json({
      message: Message.USER_IS_NOT_FOUND
    })
  }
  if (!user?.email_verify_token && isStatusVerified(user?.verify)) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      message: Message.EMAIL_IS_VERIFIED
    })
  }
  await updateUserByCondition(
    { _id: user._id },
    {
      email_verify_token: '',
      verify: UserVerifyStatus.VERIFIED
    }
  )
  return res.status(httpStatusCode.OK).json({
    message: Message.VERIFY_EMAIL_SUCCESS
  })
}
