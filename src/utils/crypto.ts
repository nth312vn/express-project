import crypto from 'crypto'

export const hash = (value: string) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex')

    crypto.scrypt(value, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}
export const isValidHash = (value: string, valuesHashed: string) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = valuesHashed.split(':')
    crypto.scrypt(value, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(key == derivedKey.toString('hex'))
    })
  })
}
