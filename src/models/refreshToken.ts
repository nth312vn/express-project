import { DBModel } from '@src/constants/models'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
  {
    refreshToken: {
      type: String,
      require: true
    },
    userId: {
      type: Schema.ObjectId,
      require: true
    }
  },
  {
    timestamps: true
  }
)
const refreshTokenModel = mongoose.model(DBModel.REFRESH_TOKEN, schema)
export default refreshTokenModel
