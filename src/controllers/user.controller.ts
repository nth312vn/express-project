import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { getUserByConditions } from '@src/services/user'
import { TokenDecoded } from '@src/types/token'
import { Request, Response } from 'express'
import _ from 'lodash'

export const getMeController = async (req: Request, res: Response) => {
  const tokenDecoded = res.locals.tokenDecoded as TokenDecoded
  const user = await getUserByConditions({ _id: tokenDecoded.userId })
  if (!user) {
    return res.status(httpStatusCode.NOTFOUND).json({
      message: Message.NOTFOUND
    })
  }
  return res.status(httpStatusCode.OK).json({
    message: Message.GET_USER_SUCCESS,
    data: _.omit(user, ['password', 'createdAt', 'updatedAt', 'forgot_password_token', 'email_verify_token'])
  })
}
