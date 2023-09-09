import { getUserByConditions } from '@src/services/user'
import { checkSchema } from 'express-validator'
import { isValidPassword } from './password'
import { getAccessToken, isBearerToken, verifyToken } from '@src/utils/token'

export const registerBodyValidation = () => {
  return checkSchema({
    name: {
      notEmpty: {
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
      notEmpty: {
        errorMessage: 'username is required'
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'email is required'
      },
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email is invalid'
      },
      custom: {
        options: async (email: string) => {
          const user = await getUserByConditions({ email })
          if (user) {
            throw new Error('Email is must unique')
          }
        }
      }
    },
    date_of_birth: {
      notEmpty: {
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
      notEmpty: {
        errorMessage: 'password is required'
      },
      isString: {
        errorMessage: 'password must be string'
      },
      isStrongPassword: {
        errorMessage: 'password is not strong '
      }
    }

    // email_verify_token: {
    //   isString: {
    //     errorMessage: 'email must be string'
    //   },
    //   isEmail: {
    //     errorMessage: 'email is invalid'
    //   }
    // },
    // forgot_password_token: {
    //   isString: {
    //     errorMessage: 'token must be string'
    //   }
    // },
    // verify: {
    //   isIn: {
    //     options: [[UserVerifyStatus.VERIFIED, UserVerifyStatus.UNVERIFIED, UserVerifyStatus.BANNED, '']]
    //   }
    // },
    // bio: {
    //   isString: {
    //     errorMessage: 'bio must be string'
    //   }
    // },
    // location: {
    //   isString: {
    //     errorMessage: 'tokens must be string'
    //   }
    // },
    // website: {
    //   isString: {
    //     errorMessage: 'website must be string'
    //   }
    // },

    // avatar: {
    //   isString: {
    //     errorMessage: 'avatar must be string'
    //   }
    // },
    // cover_photo: {
    //   isString: {
    //     errorMessage: 'avatar must be string'
    //   }
    // }
  })
}
export const loginBodyValidation = () => {
  return checkSchema({
    email: {
      notEmpty: {
        errorMessage: 'email is required'
      },
      isString: {
        errorMessage: 'email must be string'
      },
      isEmail: {
        errorMessage: 'email is invalid'
      },
      custom: {
        options: async (email: string, { req }) => {
          const user = await getUserByConditions({ email })
          if (!user) {
            throw new Error('User is not exists')
          }
          const isValidPass = await isValidPassword(req.body.password, user.password)
          if (!isValidPass) {
            throw new Error('Email or password is invalid')
          }
          req.user = user
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: 'password is required'
      },
      isString: {
        errorMessage: 'password must be string'
      },
      isLength: {
        options: {
          min: 8
        },
        errorMessage: 'password is in valid'
      }
    }
  })
}
export const logOutValidationReq = () => {
  return checkSchema({
    authorization: {
      notEmpty: {
        errorMessage: 'token is required'
      },
      isString: {
        errorMessage: 'token must be string'
      },
      custom: {
        options: async (value: string, { req }) => {
          const isValid = isBearerToken(value)
          if (!isValid) {
            throw new Error('Token is invalid1')
          }
          req.body.tokenDecoded = await verifyToken(getAccessToken(value)[1])
        }
      }
    },
    refreshToken: {
      notEmpty: {
        errorMessage: 'token is required'
      },
      isString: {
        errorMessage: 'token must be string'
      },
      custom: {
        options: async (value) => {
          await verifyToken(value)
        }
      }
    }
  })
}
