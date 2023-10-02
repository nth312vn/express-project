import { checkSchema } from 'express-validator'

export const validateUpdateMeRequest = () => {
  return checkSchema({
    name: {
      optional: true,
      isString: {
        errorMessage: 'name must be string'
      }
    },
    username: {
      optional: true,
      isString: {
        errorMessage: 'username must be string'
      }
    },
    date_of_birth: {
      optional: true,
      isString: {
        errorMessage: 'date of birth must be string'
      },
      isDate: {
        errorMessage: 'date of birth is invalid format'
      }
    },
    cover_photo: {
      optional: true,
      isString: {
        errorMessage: 'avatar must be string'
      }
    },
    avatar: {
      optional: true,
      isString: {
        errorMessage: 'avatar must be string'
      }
    },
    bio: {
      optional: true,
      isString: {
        errorMessage: 'bio must be string'
      }
    },
    location: {
      optional: true,
      isString: {
        errorMessage: 'tokens must be string'
      }
    },
    website: {
      optional: true,
      isString: {
        errorMessage: 'website must be string'
      }
    }
  })
}
