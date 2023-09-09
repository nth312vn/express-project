import { httpStatusCode } from '@src/constants/httpStatusCode'
import { CustomRequestBody } from '@src/types/custom'
import { LoginInfo, UserRequest } from '@src/types/user'
import { NextFunction, Response } from 'express'
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
  console.log(errors)
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
