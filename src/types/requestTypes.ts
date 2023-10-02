import { User } from './user'

export interface LogoutRequest {
  refreshToken: string
}
export interface LoginRequest extends User {
  user: User
}
export interface VerifyEmailRequest {
  emailVerifyToken: string
  tokenDecoded: {
    id: string
  }
}
export interface ForgotPassword {
  email: string
  user: User
}
export interface ResetPassword {
  password: string
  token: string
  tokenDecoded: {
    id: string
  }
}
export interface UpdateMeRequest {
  name: string
  username: string
  date_of_birth: string
  cover_photo: string
  avatar: string
  bio: string
  location: string
  website: string
}
