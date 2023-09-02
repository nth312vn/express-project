import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { registerValidation } from '@src/middlewares/register'
import { addNewUser } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { UserRequest } from '@src/types/user'
import { Response } from 'express'
import { ObjectId } from 'mongodb'

export const registerController = async (req: CustomRequestBody<UserRequest>, res: Response) => {
  const userinfo = {
    ...req.body,
    _id: new ObjectId()
  }
  await addNewUser(userinfo)
  return res.json(httpStatusCode.OK).json({
    message: Message.REGISTERSUCCESS
  })
}
