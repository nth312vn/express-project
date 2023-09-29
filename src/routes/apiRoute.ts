import { Router } from 'express'
import { Routes } from '@src/constants/routes'
import authRoute from './auth.routes'
import userRoute from './user.route'

const apiRoute = Router()
apiRoute.use(Routes.AUTH, authRoute, userRoute)

export default apiRoute
