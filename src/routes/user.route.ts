import { UserRoutes } from '@src/constants/routes'
import { getMeController } from '@src/controllers/user.controller'
import { accessTokenValidation } from '@src/middlewares/auth.middlewares'
import { Router } from 'express'

const userRoute = Router()
const getMeMiddlewares = [accessTokenValidation]
userRoute.get(UserRoutes.ME, ...getMeMiddlewares, getMeController)
export default userRoute
