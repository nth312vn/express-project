import { AuthRoutes } from '@src/constants/routes'
import {
  logoutController,
  loginController,
  registerController,
  verifyEmailController,
  resendVerifyEmailController
} from '@src/controllers/auth.controller'
import {
  emailValidationRequest,
  logOutValidationReq,
  loginBodyValidation,
  registerBodyValidation,
  validateForgotPasswordRequest
} from '@src/helpers/authValidation'
import {
  logoutValidation,
  loginValidation,
  registerValidation,
  accessTokenValidation,
  emailValidation,
  forgotPasswordValidation
} from '@src/middlewares/auth.middlewares'
import { Router } from 'express'

const authRoute = Router()
const loginMiddlewares = [loginBodyValidation(), loginValidation]
const registerMiddlewares = [registerBodyValidation(), registerValidation]
const logoutMiddlewares = [logOutValidationReq(), logoutValidation, accessTokenValidation]
const verifyEmailMiddlewares = [emailValidationRequest(), emailValidation]
const resendVerifyEmailMiddlewares = [accessTokenValidation]
const forgotPasswordMiddlewares = [validateForgotPasswordRequest(), forgotPasswordValidation]

authRoute.post(AuthRoutes.LOGIN, ...loginMiddlewares, loginController)
authRoute.post(AuthRoutes.REGISTER, ...registerMiddlewares, registerController)
authRoute.post(AuthRoutes.LOG_OUT, ...logoutMiddlewares, logoutController)
authRoute.post(AuthRoutes.VERIFY_EMAIL, ...verifyEmailMiddlewares, verifyEmailController)
authRoute.post(AuthRoutes.RESEND_VERIFY_EMAIL, ...resendVerifyEmailMiddlewares, resendVerifyEmailController)
authRoute.post(AuthRoutes.FORGOT_PASSWORD, ...forgotPasswordMiddlewares)

export default authRoute
