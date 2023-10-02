import { User } from '@src/types/user'
import { pick } from 'lodash'

export const ignoreUserData = (userData: User) => {
  const filteredData = pick(userData, [
    'username',
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'cover_photo'
  ])
  return filteredData
}
