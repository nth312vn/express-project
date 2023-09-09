import { Router } from 'express'

import registerRoute from './registerRoute'
import loginRoute from './loginRoute'
import logOutRoute from './logout'

const apiRoute = Router()
apiRoute.use(registerRoute)
apiRoute.use(loginRoute)
apiRoute.use(logOutRoute)
export default apiRoute
