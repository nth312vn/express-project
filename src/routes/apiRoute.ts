import { Router } from 'express'

import registerRoute from './registerRoute'
import loginRoute from './loginRoute'

const apiRoute = Router()
apiRoute.use(registerRoute)
apiRoute.use(loginRoute)

export default apiRoute
