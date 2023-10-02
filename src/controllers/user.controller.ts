import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { ignoreUserData } from '@src/helpers/ignoreData'
import { getUserByConditions, updateUserByCondition } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { UpdateMeRequest } from '@src/types/requestTypes'
import { TokenDecoded } from '@src/types/token'
import { NextFunction, Request, Response } from 'express'
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
    data: ignoreUserData(user)
  })
}
export const updateMeController = async (
  req: CustomRequestBody<UpdateMeRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, date_of_birth, cover_photo, avatar, bio, location, website } = req.body
    const user = res.locals.tokenDecoded as TokenDecoded
    const data = await updateUserByCondition(
      { _id: user.userId },
      {
        name,
        username,
        date_of_birth,
        cover_photo,
        avatar,
        bio,
        location,
        website
      }
    )
    if (!data) {
      return res.status(httpStatusCode.FORBIDDEN).json({
        message: Message.FORBIDDEN
      })
    }
    return res.status(httpStatusCode.OK).json({
      message: Message.UPDATE_SUCCESS,
      data: ignoreUserData(data)
    })
  } catch (e) {
    next(e)
  }
}
