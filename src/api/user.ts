import type { CreateUserRequest } from '~/interface/user'

const url = `${import.meta.env.VITE_API_URL}/user`

export const createUserApi = async(payload: CreateUserRequest): Promise<any> => {
  const { statusCode } = await useFetch(url).post(payload).json()
  return statusCode
}
