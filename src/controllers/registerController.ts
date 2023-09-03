import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { addNewUser } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { UserRequest } from '@src/types/user'
import { NextFunction, Response } from 'express'
import { ObjectId } from 'mongodb'

export const registerController = async (req: CustomRequestBody<UserRequest>, res: Response, next: NextFunction) => {
  try {
    await addNewUser(req.body)
    return res.status(httpStatusCode.OK).json({
      message: Message.REGISTER_SUCCESS
    })
  } catch (e) {
    console.log(e)
    next(e)
  }
}
