import { createFetch } from '@vueuse/core'
import type { Recommendation } from '~/interface/recommendation'

const useRecommendation = async() => {
  const fetch = createFetch({
    baseUrl: import.meta.env.VITE_RECOMMENDATION_API_URL,
    fetchOptions: {
      mode: 'cors',
    },
  })('recommendation')
  const { data } = await fetch.json<Recommendation[]>()
  return data
}

export default useRecommendation
