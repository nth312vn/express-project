import { UserVerifyStatus } from '@src/constants/user'
import { getUserByEmail } from '@src/services/user'
import { checkSchema } from 'express-validator'

export const registerBodyValidation = () => {
  return checkSchema({
    name: {
      isEmpty: {
        errorMessage: 'name is required'
      },
      isString: {
        errorMessage: 'name must be string'
      }
    },
    username: {
      isString: {
        errorMessage: 'username must be string'
      },
      isEmpty: {
        errorMessage: 'username is required'
      }
    },
    email: {
      isEmpty: {
        errorMessage: 'email is required'
      },
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email is invalid'
      },
      custom: {
        options: async (email) => {
          try {
            const user = await getUserByEmail(email)
            if (user) {
              throw new Error('Email is exists')
            }
          } catch (e) {
            throw new Error('Email is invalid')
          }
        }
      }
    },
    date_of_birth: {
      isEmpty: {
        errorMessage: 'date of birth is required'
      },
      isString: {
        errorMessage: 'date of birth must be string'
      },
      isDate: {
        errorMessage: 'date of birth is invalid format'
      }
    },
    password: {
      isEmpty: {
        errorMessage: 'password is required'
      },
      isString: {
        errorMessage: 'password must be string'
      },
      isStrongPassword: {
        errorMessage: 'password is not strong '
      }
    },

    email_verify_token: {
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email is invalid'
      }
    },
    forgot_password_token: {
      isString: {
        errorMessage: 'token must be string'
      }
    },
    verify: {
      isIn: {
        options: [[UserVerifyStatus.VERIFIED, UserVerifyStatus.UNVERIFIED, UserVerifyStatus.BANNED, '']]
      }
    },
    bio: {
      isString: {
        errorMessage: 'bio must be string'
      }
    },
    location: {
      isString: {
        errorMessage: 'tokens must be string'
      }
    },
    website: {
      isString: {
        errorMessage: 'website must be string'
      }
    },

    avatar: {
      isString: {
        errorMessage: 'avatar must be string'
      }
    },
    cover_photo: {
      isString: {
        errorMessage: 'avatar must be string'
      }
    }
  })
}
