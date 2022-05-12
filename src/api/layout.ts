import useCustomFetch from '~/composables/useCustomFetch'
import type { Layout } from '~/interface/storefront'

export const uploadLayout = async(payload: FormData) => {
  const { statusCode } = await useCustomFetch('layout').post(payload).json()
  return { statusCode }
}

export const getLayout = async() => {
  const { statusCode, data } = await useCustomFetch('layout').json<Layout>()
  return { statusCode, data }
}
