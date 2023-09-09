import { AuthRoutes } from '@src/constants/routes'
import { logOutController } from '@src/controllers/logOutController'
import { logOutValidationReq } from '@src/helpers/validation'
import { logOutValidation } from '@src/middlewares/logOut'
import { Router } from 'express'

const logOutRoute = Router()
const middleware = [logOutValidationReq(), logOutValidation]
logOutRoute.post(AuthRoutes.LOG_OUT, ...middleware, logOutController)
export default logOutRoute
