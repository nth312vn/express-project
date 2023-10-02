import { httpStatusCode } from '@src/constants/httpStatusCode'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validationSchema = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(errors.array()[0].msg.status ?? httpStatusCode.UNPROCESSABLE_ENTITY).json({
      message: errors.array()[0].msg
    })
  }
  next()
}
