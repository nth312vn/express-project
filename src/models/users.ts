import { DBModel } from '@src/constants/models'
import { UserVerifyStatus } from '@src/constants/user'
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    date_of_birth: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    email_verify_token: {
      type: String
    },
    forgot_password_token: {
      type: String
    },
    verify: {
      type: String,
      enum: [UserVerifyStatus.UNVERIFIED, UserVerifyStatus.VERIFIED, UserVerifyStatus.BANNED],
      default: UserVerifyStatus.UNVERIFIED
    },
    bio: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },

    avatar: {
      type: String,
      default: ''
    },
    cover_photo: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)
const userModel = mongoose.model(DBModel.USERS, schema)
export default userModel
