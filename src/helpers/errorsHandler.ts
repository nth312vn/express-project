import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { NextFunction, Request, Response } from 'express'

export const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || httpStatusCode.INTERNALSERVERERROR).json({
    message: err.message || Message.INTERNALSERVERERROR
  })
}
