import { UserVerifyStatus } from '@src/constants/user'

export const isStatusVerified = (status: UserVerifyStatus | null = UserVerifyStatus.UNVERIFIED) =>
  status === UserVerifyStatus.VERIFIED
