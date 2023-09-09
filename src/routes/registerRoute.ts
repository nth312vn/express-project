import { AuthRoutes } from '@src/constants/routes'
import { registerController } from '@src/controllers/registerController'
import { registerBodyValidation } from '@src/helpers/validation'
import { registerValidation } from '@src/middlewares/register'
import { Router } from 'express'

const registerRoute = Router()
const middlewares = [registerBodyValidation(), registerValidation]
registerRoute.post(AuthRoutes.REGISTER, ...middlewares, registerController)
export default registerRoute
