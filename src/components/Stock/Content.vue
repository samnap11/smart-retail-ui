<script setup lang="ts">
interface Item {
  section: string
  storefronts: string[]
}
interface Props {
  data: Item[]
}

const props = defineProps<Props>()

const emptyStorefrontIndex = ref(new Set<number>())

const addToIndexSet = (index: number) => {
  emptyStorefrontIndex.value.add(index)
}

const removeFromIndexSet = (index: number) => {
  emptyStorefrontIndex.value.delete(index)
}

const doesIndexExistInTheSet = (index: number) => emptyStorefrontIndex.value.has(index)

const { data, event } = useEventSource(import.meta.env.VITE_SSE_URL, ['empty', 'restocked'])

watch([data, event], ([newData, newEvent]) => {
  if (newData) {
    if (newEvent === 'empty')
      addToIndexSet(Number(newData))

    else
      removeFromIndexSet(Number(newData))
  }
})

const STOREFRONTS_AMOUNT_EACH_SECTION = props.data[0].storefronts.length
</script>
<template>
  <article v-for="(item, index) in props.data" :key="`section-${index}`">
    <h3 class="text-left mt-16 mb-6 text-lg font-lato font-semibold tracking-wide leading-4 text-indigo-300">
      {{ item.section }}
    </h3>
    <section class="grid grid-cols-4 gap-4">
      <Storefront
        v-for="(storefront, i) in item.storefronts"
        :key="`storefront-${index * STOREFRONTS_AMOUNT_EACH_SECTION + i + 1}`" :store-front-name="storefront"
        :empty="doesIndexExistInTheSet(index * STOREFRONTS_AMOUNT_EACH_SECTION + i + 1)"
      />
    </section>
  </article>
</template>
