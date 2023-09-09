import { Bearer } from '@src/constants/user'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload: any): Promise<string> => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY || '',
      {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME
      },
      (err, encode = '') => {
        if (err) {
          return rej(err)
        }
        return res(encode)
      }
    )
  })
}

export const generateRefreshToken = (payload: any): Promise<string> => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY || '',
      {
        algorithm: 'HS256',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME
      },
      (err, encode = '') => {
        if (err) {
          return rej(err)
        }
        return res(encode)
      }
    )
  })
}
export const verifyToken = (token: string) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.SECRET_KEY || '', (err, decode) => {
      if (err) {
        return rej(err)
      }
      return res(decode)
    })
  })
}

export const isBearerToken = (token: string) => {
  const [bearer] = getAccessToken(token)
  if (!isBearer(bearer)) {
    return false
  }
  return true
}
export const getAccessToken = (token: string) => {
  return token.split(' ')
}
export const isBearer = (bearer: string) => {
  return bearer === Bearer
}
