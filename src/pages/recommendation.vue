<script setup lang="ts">
import type { Recommendation } from '~/interface/recommendation'

const { data: recommendation } = useFetch<Recommendation[]>(`${import.meta.env.VITE_RECOMMENDATION_API_URL}`).get().json()

</script>

<template>
  <div flex="~ col" w="full lg:128">
    <h1 font-bold text-3xl mb-4 text-center>
      Recommendation
    </h1>
    <div flex="~ col" space="y-4" rounded shadow w-full>
      <div v-for="r in recommendation" :key="r.itemsets.toString()" bg-gray-900 p-3 w-full>
        <div mb-2>
          <span text="5xl" font-bold>{{ Math.round(r.support * 100) }}%</span>
          <span ml-2>of customers buys</span>
        </div>
        <div flex="~" space-x-2 items-center text="xs" font-semibold>
          <div rounded-full p="y-1 x-2" bg-teal-600>
            {{ r.itemsets[0] }}
          </div>
          <template v-for="(item, i) in r.itemsets.slice(1)" :key="`item-${i}`">
            <span>with</span>
            <div rounded-full p="y-1 x-2" bg-teal-600>
              {{ item }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
