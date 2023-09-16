import { User } from './user'

export interface LogoutRequest {
  refreshToken: string
}
export interface LoginRequest extends User {
  user: User
}
export interface VerifyEmailRequest {
  emailVerifyToken: string
  tokenDecode: {
    id: string
  }
}
