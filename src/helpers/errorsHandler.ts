import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { NextFunction, Request, Response } from 'express'

export const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || httpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: err.message || Message.INTERNAL_SERVER_ERROR
  })
}
