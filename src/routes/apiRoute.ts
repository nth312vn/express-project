import { Router } from 'express'
import { Routes } from '@src/constants/routes'
import authRoute from './auth.routes'

const apiRoute = Router()
apiRoute.use(Routes.AUTH, authRoute)
export default apiRoute
