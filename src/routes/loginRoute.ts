import { APIRoutes } from '@src/constants/routes'
import { loginController } from '@src/controllers/loginController'
import { Router } from 'express'

const loginRoute = Router()

loginRoute.post(APIRoutes.LOGIN, loginController)
export default loginRoute
