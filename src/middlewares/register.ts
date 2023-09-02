import { httpStatusCode } from '@src/constants/httpStatusCode'
import { registerBodyValidation } from '@src/helpers/validation'
import { CustomRequestBody } from '@src/types/custom'
import { UserRequest } from '@src/types/user'
import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'

export const registerValidation =
  (registerBodyValidation(),
  (req: CustomRequestBody<UserRequest>, res: Response, next: NextFunction) => {
    const errors = validationResult(req.body)
    if (errors.array().length) {
      return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({
        message: errors.array()[0].msg
      })
    }
    next()
  })
