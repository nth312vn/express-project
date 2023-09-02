import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { Request, Response } from 'express'

export const notFound = (req: Request, res: Response) => {
  res.status(httpStatusCode.NOTFOUND).json({
    message: Message.NOTFOUND
  })
}
