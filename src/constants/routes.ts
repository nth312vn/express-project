export enum Routes {
  API = '/api',
  ALL = '*',
  AUTH = '/auth'
}

export enum AuthRoutes {
  REGISTER = '/register',
  LOGIN = '/login',
  LOG_OUT = '/logout',
  VERIFY_EMAIL = '/verify-email',
  RESEND_VERIFY_EMAIL = '/resend-verify-email',
  FORGOT_PASSWORD = '/forgot-password',
  VERIFY_FORGOT_PASSWORD_TOKEN = '/verify-forgot-password-token',
  RESET_PASSWORD = '/rest-password'
}
export enum UserRoutes {
  ME = '/me',
  UPDATE_ME = '/update-me'
}
