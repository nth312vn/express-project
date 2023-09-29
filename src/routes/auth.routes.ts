import { AuthRoutes } from '@src/constants/routes'
import {
  logoutController,
  loginController,
  registerController,
  verifyEmailController,
  resendVerifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordTokenController
} from '@src/controllers/auth.controller'
import {
  emailValidationRequest,
  logOutValidationReq,
  loginBodyValidation,
  registerBodyValidation,
  validateForgotPasswordRequest,
  validateForgotPasswordTokenRequest
} from '@src/helpers/authValidation'
import {
  logoutValidation,
  loginValidation,
  registerValidation,
  accessTokenValidation,
  emailValidation,
  forgotPasswordValidation,
  validationSchema
} from '@src/middlewares/auth.middlewares'
import { Router } from 'express'

const authRoute = Router()
const loginMiddlewares = [loginBodyValidation(), loginValidation]
const registerMiddlewares = [registerBodyValidation(), registerValidation]
const logoutMiddlewares = [logOutValidationReq(), logoutValidation, accessTokenValidation]
const verifyEmailMiddlewares = [emailValidationRequest(), emailValidation]
const resendVerifyEmailMiddlewares = [accessTokenValidation]
const forgotPasswordMiddlewares = [validateForgotPasswordRequest(), forgotPasswordValidation]
const verifyForgotPasswordToken = [validateForgotPasswordTokenRequest(), validationSchema]

authRoute.post(AuthRoutes.LOGIN, ...loginMiddlewares, loginController)
authRoute.post(AuthRoutes.REGISTER, ...registerMiddlewares, registerController)
authRoute.post(AuthRoutes.LOG_OUT, ...logoutMiddlewares, logoutController)
authRoute.post(AuthRoutes.VERIFY_EMAIL, ...verifyEmailMiddlewares, verifyEmailController)
authRoute.post(AuthRoutes.RESEND_VERIFY_EMAIL, ...resendVerifyEmailMiddlewares, resendVerifyEmailController)
authRoute.post(AuthRoutes.FORGOT_PASSWORD, ...forgotPasswordMiddlewares, forgotPasswordController)
authRoute.post(
  AuthRoutes.VERIFY_FORGOT_PASSWORD_TOKEN,
  ...verifyForgotPasswordToken,
  verifyForgotPasswordTokenController
)
authRoute.post(AuthRoutes.RESET_PASSWORD)

export default authRoute
