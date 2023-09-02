import userModel from '@src/models/users'
import { User } from '@src/types/user'

export const addNewUser = (params: User) => {
  const userDetail = new userModel({
    _id: params._id,
    name: params.name,
    email: params.email,
    date_of_birth: params.date_of_birth,
    password: params.password,
    createdAt: params.createdAt,
    updatedAt: params.updatedAt,
    email_verify_token: params.email_verify_token,
    forgot_password_token: params.forgot_password_token,
    verify: params.verify,
    bio: params.bio,
    location: params.location,
    website: params.website,
    username: params.username,
    avatar: params.avatar,
    cover_photo: params.cover_photo
  })
  return userDetail.save()
}
export const getUserByEmail = async (email: string) => {
  return await userModel.findOne({
    email
  })
}
