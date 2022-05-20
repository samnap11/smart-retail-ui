<script setup lang="ts">
import type { Recommendation } from '~/interface/recommendation'

const { data: recommendation } = useFetch<Recommendation[]>(`${import.meta.env.VITE_RECOMMENDATION_API_URL}`).get().json()

// recommendation filters
const threshold = ref(0)
const itemCount = ref(1)

const filtered = computed(() => {
  return (recommendation.value as Recommendation[])
    .sort((r1, r2) => {
      if (r1.support < r2.support)
        return 1
      if (r1.support > r2.support)
        return -1
      return 0
    })
    .map(r => ({ ...r, support: Math.round(r.support * 100) }))
    .filter(r => r.support >= threshold.value && r.itemsets.length >= itemCount.value)
})
</script>

<template>
  <div flex="~ col" items-center w="full lg:128">
    <!-- HEADER -->
    <header mb-4>
      <h1 font-bold text-3xl text-center>
        Recommendation
      </h1>
      <div font="italic" text="xs lg:sm center">
        Shows the probability something is bought and the probability of something is being bought together.
      </div>
    </header>
    <!-- SLIDERS -->
    <div mb-4>
      <div flex="~" items-center>
        <span text-sm mr-2>Threshold: {{ threshold }}%</span>
        <input v-model="threshold" type="range" min="0" max="100" step="1">
      </div>
      <div flex="~" items-center>
        <span text-sm mr-2>Item Count: {{ itemCount }}</span>
        <input v-model="itemCount" type="range" min="1" max="3" step="1">
      </div>
    </div>
    <div flex="~ col" space="y-4" rounded shadow w="full lg:max">
      <div v-for="r in filtered" :key="r.itemsets.toString()" bg-gray-900 p-3 w-full>
        <div mb-2>
          <span text="5xl" font-bold>{{ r.support }}%</span>
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
