import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload: any) => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY || '',
      {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME
      },
      (err, encode) => {
        if (err) {
          return rej(err)
        }
        return res(encode)
      }
    )
  })
}

export const generateRefreshToken = (payload: any) => {
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY || '',
      {
        algorithm: 'HS256',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME
      },
      (err, encode) => {
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
