import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { createUser } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { UserRequest } from '@src/types/user'
import { generateAccessToken, generateRefreshToken } from '@src/utils/token'
import { NextFunction, Response } from 'express'

export const registerController = async (req: CustomRequestBody<UserRequest>, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body)
    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken({ user }),
      generateRefreshToken({ user })
    ])
    return res.status(httpStatusCode.OK).json({
      message: Message.REGISTER_SUCCESS,
      accessToken,
      refreshToken
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
}
