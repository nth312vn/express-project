import { AuthRoutes } from '@src/constants/routes'
import {
  logoutController,
  loginController,
  registerController,
  verifyEmailController
} from '@src/controllers/auth.controller'
import {
  emailValidationRequest,
  logOutValidationReq,
  loginBodyValidation,
  registerBodyValidation
} from '@src/helpers/authValidation'
import {
  logoutValidation,
  loginValidation,
  registerValidation,
  accessTokenValidation,
  emailValidation
} from '@src/middlewares/auth.middlewares'
import { Router } from 'express'

const authRoute = Router()
const loginMiddlewares = [loginBodyValidation(), loginValidation]
const registerMiddlewares = [registerBodyValidation(), registerValidation]
const logoutMiddlewares = [logOutValidationReq(), logoutValidation, accessTokenValidation]
const verifyEmailMiddlewares = [emailValidationRequest(), emailValidation]

authRoute.post(AuthRoutes.LOGIN, ...loginMiddlewares, loginController)
authRoute.post(AuthRoutes.REGISTER, ...registerMiddlewares, registerController)
authRoute.post(AuthRoutes.LOG_OUT, ...logoutMiddlewares, logoutController)
authRoute.post(AuthRoutes.VERIFY_EMAIL, ...verifyEmailMiddlewares, verifyEmailController)

export default authRoute
