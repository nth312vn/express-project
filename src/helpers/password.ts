import { hash, isValidHash } from '@src/utils/crypto'

export const hashPassword = (password: string) => {
  return hash(password)
}
export const isValidPassword = (password: string, passwordHashed: string) => {
  return isValidHash(password, passwordHashed)
}
