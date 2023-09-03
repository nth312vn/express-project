import userModel from '@src/models/users'
import { UserRequest } from '@src/types/user'

export const addNewUser = async (params: UserRequest) => {
  const userDetail = new userModel({
    name: params.name,
    email: params.email,
    date_of_birth: params.date_of_birth,
    password: params.password,
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
  return await userDetail.save()
}
export const getUserByEmail = async (email: string) => {
  return await userModel.findOne({
    email
  })
}
