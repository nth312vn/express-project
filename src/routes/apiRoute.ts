import { Router } from 'express'
import { APIRoutes } from '@src/constants/routes'
import { registerController } from '@src/controllers/registerController'
import { loginController } from '@src/controllers/loginController'

const apiRoute = Router()
apiRoute.post(APIRoutes.REGISTER, registerController)
apiRoute.post(APIRoutes.LOGIN, loginController)

export default apiRoute
