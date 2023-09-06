import { APIRoutes } from '@src/constants/routes'
import { loginController } from '@src/controllers/loginController'
import { loginBodyValidation } from '@src/helpers/validation'
import { loginValidation } from '@src/middlewares/login'
import { Router } from 'express'

const loginRoute = Router()
const middlewares = [loginBodyValidation(), loginValidation]
loginRoute.post(APIRoutes.LOGIN, ...middlewares, loginController)
export default loginRoute
