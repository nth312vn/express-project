import { getUserByEmail } from '@src/services/user'

export const registerBodySchema = () => {
  return {
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
          const user = await getUserByEmail(email)
          console.log(user)
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
  }
}
