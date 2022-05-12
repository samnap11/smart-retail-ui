import useCustomFetch from '~/composables/useCustomFetch'
import type { CreateUserRequest } from '~/interface/user'

export const createUserApi = async(payload: CreateUserRequest) => {
  const { statusCode, isFinished, isFetching } = await useCustomFetch('user').post(payload).json()
  return { statusCode, isFinished, isFetching }
}
