import { httpStatusCode } from '@src/constants/httpStatusCode'
import { Message } from '@src/constants/message'
import { createRefreshToken } from '@src/services/refreshToken'
import { createUser } from '@src/services/user'
import { CustomRequestBody } from '@src/types/custom'
import { UserRequest } from '@src/types/user'
import { generateAccessToken, generateRefreshToken } from '@src/utils/token'
import { NextFunction, Response } from 'express'

export const registerController = async (req: CustomRequestBody<UserRequest>, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body)
    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken({
        userId: user._id,
        name: user.name,
        email: user.email,
        date_of_birth: user.date_of_birth,
        bio: user.bio,
        location: user.location,
        website: user.website,
        avatar: user.avatar,
        cover_photo: user.cover_photo
      }),
      generateRefreshToken({ name: user.name, email: user.email })
    ])
    await createRefreshToken({ refreshToken, userId: user._id })

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
