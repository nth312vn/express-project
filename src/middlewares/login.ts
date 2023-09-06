import { httpStatusCode } from '@src/constants/httpStatusCode'
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
