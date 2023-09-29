export enum Message {
  NOTFOUND = 'Route does not exist',
  INTERNAL_SERVER_ERROR = 'Internal sever errors',
  REGISTER_SUCCESS = 'Register user is successfully',
  UNAUTHORIZED = 'Email or password is invalid',
  LOGIN_SUCCESS = 'Login success',
  LOGOUT_SUCCESS = 'Logout success',
  INVALID_TOKEN = 'Token is in valid',
  USER_IS_NOT_FOUND = 'User is not found',
  EMAIL_IS_VERIFIED = 'Email is verified',
  VERIFY_EMAIL_SUCCESS = 'Verify email success',
  RESEND_EMAIL_SUCCESS = 'Resend email success',
  PASSWORD_ALREADY_RESET = 'Password already reset',
  FORGOT_PASSWORD_TOKEN_IS_NOT_EXISTS = 'forgot password token is not exists',
  VERIFY_FORGOT_PASSWORD_SUCCESS = 'verify forgot password success'
}
