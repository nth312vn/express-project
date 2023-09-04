import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { isValidPassword } from '@src/helpers/password'
import { getUserByEmail } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { LoginInfo } from '@src/types/user'
import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'

export const loginValidation = (req: CustomRequestBody<LoginInfo>, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
      message: errors.array()[0].msg
    })
  }
  next()
}
export const validatePassword = async (req: CustomRequestBody<LoginInfo>, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const userInfo = await getUserByEmail(email)
  const isValidPass = await isValidPassword(password, userInfo?.password || '')
  if (!isValidPass) {
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      message: Message.UNAUTHORIZED
    })
  }
  res.locals.userInfo = userInfo
  next()
}
