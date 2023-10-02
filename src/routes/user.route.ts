import { UserRoutes } from '@src/constants/routes'
import { getMeController } from '@src/controllers/user.controller'
import { validateUpdateMeRequest } from '@src/helpers/userValidation'
import { accessTokenValidation } from '@src/middlewares/auth.middlewares'
import { validationSchema } from '@src/middlewares/common.middlewares'
import { Router } from 'express'

const userRoute = Router()
const getMeMiddlewares = [accessTokenValidation]
const updateMeMiddlewares = [validateUpdateMeRequest(), validationSchema, accessTokenValidation]
userRoute.get(UserRoutes.ME, ...getMeMiddlewares, getMeController)
userRoute.patch(UserRoutes.UPDATE_ME, ...updateMeMiddlewares)
export default userRoute
