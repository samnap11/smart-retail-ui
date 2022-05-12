<script setup lang="ts">
import { getLayout } from '~/api/layout'

const isFetchError = ref(false)

const { statusCode, data: stockData } = await getLayout()
watch(statusCode, (newStatusCode) => {
  if (newStatusCode === 200)
    isFetchError.value = false

  else
    isFetchError.value = true
})

const emptyStorefrontIndex = ref(new Set<number>())

const addToIndexSet = (index: number) => {
  emptyStorefrontIndex.value.add(index)
}

const removeFromIndexSet = (index: number) => {
  emptyStorefrontIndex.value.delete(index)
}

const doesIndexExistInTheSet = (index: number) => emptyStorefrontIndex.value.has(index)

const url = `${import.meta.env.VITE_API_URL}/sse`

const { data, event } = useEventSource(url, ['empty', 'restocked'])

watch([data, event], ([newData, newEvent]) => {
  if (newData) {
    if (newEvent === 'empty')
      addToIndexSet(Number(newData))

    else
      removeFromIndexSet(Number(newData))
  }
})

const STOREFRONTS_AMOUNT_EACH_SECTION = stockData.value?.data[0].storefronts.length ?? 0
</script>
<template>
  <template v-if="!isFetchError">
    <article v-for="(item, index) in stockData?.data" :key="`section-${index}`">
      <h3 class="text-left mt-16 mb-6 text-lg font-lato font-semibold tracking-wide leading-4 text-indigo-300">
        {{ item.section }}
      </h3>
      <section class="grid grid-cols-4 gap-4">
        <Storefront
          v-for="(storefront, i) in item.storefronts"
          :key="`storefront-${index * STOREFRONTS_AMOUNT_EACH_SECTION + i + 1}`" :data="storefront"
          :empty="doesIndexExistInTheSet(index * STOREFRONTS_AMOUNT_EACH_SECTION + i + 1)"
        />
      </section>
    </article>
  </template>
  <template v-else>
    <h3 class="mt-16 mb-6 text-lg font-lato font-semibold tracking-wide leading-4 text-indigo-300">
      There is an error in fetching the stock!
    </h3>
  </template>
</template>
