import { httpStatusCode } from '@src/constants/httpStatusCode'
import { message } from '@src/constants/message'
import { Request, Response } from 'express'

export const notFound = (req: Request, res: Response) => {
  res.status(httpStatusCode.NOTFOUND).json({
    message: message.NOTFOUND
  })
}
