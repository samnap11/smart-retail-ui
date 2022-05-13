import { createFetch } from '@vueuse/core'

const useCustomFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  fetchOptions: {
    mode: 'cors',
  },
})

export default useCustomFetch
