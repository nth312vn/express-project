import { APIRoutes } from '@src/constants/routes'
import { registerController } from '@src/controllers/registerController'
import { registerBodySchema } from '@src/helpers/validation'
import { registerValidation } from '@src/middlewares/register'
import { Router } from 'express'
import { checkSchema } from 'express-validator'

const registerRoute = Router()
const middlewares = [checkSchema(registerBodySchema()), registerValidation]
registerRoute.post(APIRoutes.REGISTER, ...middlewares, registerController)
export default registerRoute
