import useCustomFetch from '~/composables/useCustomFetch'
import type { Recommendation } from '~/interface/recommendation'

export const getRecommendation = async() => {
  const { data } = await useCustomFetch('recommendation').json<Recommendation[]>()
  return { data }
}
