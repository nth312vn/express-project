import { AuthRoutes } from '@src/constants/routes'
import { logoutController, loginController, registerController } from '@src/controllers/auth.controller'
import { logOutValidationReq, loginBodyValidation, registerBodyValidation } from '@src/helpers/authValidation'
import { logoutValidation, loginValidation, registerValidation } from '@src/middlewares/auth.middlewares'
import { Router } from 'express'

const authRoute = Router()
const loginMiddlewares = [loginBodyValidation(), loginValidation]
const registerMiddlewares = [registerBodyValidation(), registerValidation]
const logoutMiddlewares = [logOutValidationReq(), logoutValidation]

authRoute.post(AuthRoutes.LOGIN, ...loginMiddlewares, loginController)
authRoute.post(AuthRoutes.REGISTER, ...registerMiddlewares, registerController)
authRoute.post(AuthRoutes.LOG_OUT, ...logoutMiddlewares, logoutController)

export default authRoute
