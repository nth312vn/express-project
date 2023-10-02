import { User } from '@src/types/user'
import _ from 'lodash'

export const ignoreUserData = (userData: User) => {
  return _.omit(userData, ['password', 'createdAt', 'updatedAt', 'forgot_password_token', 'email_verify_token'])
}
