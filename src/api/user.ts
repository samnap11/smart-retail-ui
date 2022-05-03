import type { CreateUserRequest } from '~/interface/user'

const url = `${import.meta.env.VITE_API_URL}/user`

export const createUserApi = async(payload: CreateUserRequest) => {
  const { statusCode, isFinished, isFetching } = await useFetch(url).post(payload).json()
  return { statusCode, isFinished, isFetching }
}
