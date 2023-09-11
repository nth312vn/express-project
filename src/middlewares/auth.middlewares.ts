import { httpStatusCode } from '@src/constants/httpStatusCode'
import { CustomError } from '@src/helpers/customError'
import { CustomRequestBody } from '@src/types/custom'
import { LoginInfo, UserRequest } from '@src/types/user'
import { getAccessToken, isBearerToken, verifyToken } from '@src/utils/token'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const loginValidation = (req: CustomRequestBody<LoginInfo>, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(errors.array()[0].msg.status ?? httpStatusCode.UNPROCESSABLE_ENTITY).json({
      message: errors.array()[0].msg
    })
  }
  next()
}
export const logoutValidation = (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(errors.array()[0].msg.status ?? httpStatusCode.UNPROCESSABLE_ENTITY).json({
      message: errors.array()[0].msg
    })
  }
  next()
}
export const registerValidation = (req: CustomRequestBody<UserRequest>, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(errors.array()[0].msg.status ?? httpStatusCode.UNPROCESSABLE_ENTITY).json({
      message: errors.array()[0].msg
    })
  }
  next()
}
export const accessTokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const value = req.headers.authorization || ''
    const isValid = isBearerToken(value)
    if (!isValid) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        message: 'token is invalid'
      })
    }
    res.locals.tokenDecoded = await verifyToken(getAccessToken(value)[1])
    next()
  } catch (e) {
    next(
      new CustomError({
        status: httpStatusCode.UNAUTHORIZED,
        message: 'token is invalid'
      })
    )
  }
}
