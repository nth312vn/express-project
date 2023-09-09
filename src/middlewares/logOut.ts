import { httpStatusCode } from '@src/constants/httpStatusCode'
import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'

export const logOutValidation = (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
      message: errors.array()[0].msg
    })
  }
  next()
}
