import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { UserVerifyStatus } from '@src/constants/user'
import { CustomError } from '@src/helpers/customError'
import { hashPassword } from '@src/helpers/password'
import { isStatusVerified } from '@src/helpers/verify'
import { createRefreshToken, deleteRefreshToken } from '@src/services/refreshToken'
import { createUser, getUserByConditions, updateUserByCondition } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { ForgotPassword, LoginRequest, LogoutRequest, ResetPassword, VerifyEmailRequest } from '@src/types/requestTypes'
import { TokenDecoded } from '@src/types/token'
import { User, UserRequest } from '@src/types/user'
import {
  generateAccessToken,
  generateEmailVerifyToken,
  generateForgotPasswordToken,
  generateRefreshToken
} from '@src/utils/token'
import { NextFunction, Request, Response } from 'express'

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
  if (!user.email_verify_token && isStatusVerified(user?.verify)) {
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
export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const tokenDecoded = res.locals.tokenDecoded as TokenDecoded
  const user = await getUserByConditions({ _id: tokenDecoded.userId })
  if (!user) {
    return res.status(httpStatusCode.NOTFOUND).json({
      message: Message.USER_IS_NOT_FOUND
    })
  }
  if (!user.email_verify_token && isStatusVerified(user.verify)) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      message: Message.EMAIL_IS_VERIFIED
    })
  }
  const newEmailVerifyToken = await generateEmailVerifyToken({ id: user._id })
  await updateUserByCondition(
    { _id: user._id },
    {
      email_verify_token: newEmailVerifyToken
    }
  )
  return res.status(httpStatusCode.OK).json({
    message: Message.RESEND_EMAIL_SUCCESS
  })
}
export const forgotPasswordController = async (
  req: CustomRequestBody<ForgotPassword>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user
    const forgotPasswordToken = await generateForgotPasswordToken({ id: user._id })
    await updateUserByCondition(
      { _id: user._id },
      {
        forgot_password_token: forgotPasswordToken
      }
    )
    return res.status(httpStatusCode.OK).json({
      message: Message.PASSWORD_ALREADY_RESET
    })
  } catch (e) {
    next(e)
  }
}
export const verifyForgotPasswordTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenDecoded = req.body.tokenDecoded
    const user = await getUserByConditions({ _id: tokenDecoded.id })
    if (!user) {
      return res.status(httpStatusCode.NOTFOUND).json({
        message: Message.USER_IS_NOT_FOUND
      })
    }
    if (!user.forgot_password_token) {
      return res.status(httpStatusCode.NOTFOUND).json({
        message: Message.FORGOT_PASSWORD_TOKEN_IS_NOT_EXISTS
      })
    }
    return res.status(httpStatusCode.OK).json({
      message: Message.VERIFY_FORGOT_PASSWORD_SUCCESS
    })
  } catch (e) {
    next(e)
  }
}
export const resetPasswordController = async (
  req: CustomRequestBody<ResetPassword>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenDecoded = req.body.tokenDecoded
    const user = await getUserByConditions({ _id: tokenDecoded.id })
    if (!user) {
      return res.status(httpStatusCode.NOTFOUND).json({
        message: Message.USER_IS_NOT_FOUND
      })
    }
    if (!user.forgot_password_token) {
      return res.status(httpStatusCode.NOTFOUND).json({
        message: Message.FORGOT_PASSWORD_TOKEN_IS_NOT_EXISTS
      })
    }
    const newPassword = await hashPassword(req.body.password)
    await updateUserByCondition(
      { _id: user._id },
      {
        password: newPassword,
        forgot_password_token: ''
      }
    )
    return res.status(httpStatusCode.OK).json({
      message: Message.RESET_PASSWORD_SUCCESS
    })
  } catch (e) {
    next(e)
  }
}
