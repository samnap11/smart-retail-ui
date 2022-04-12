<script setup lang="ts">
interface Item {
  section: string
  storefront: string
}
interface Props {
  stockData: Item[]
}

const props = defineProps<Props>()
const emptyStorefrontIndex = ref(new Set<number>([1, 2, 18, 20]))
const indexIncluded = (index: number) => emptyStorefrontIndex.value.has(index)

const addEmptyStorefrontIndex = (index: number) => {
  emptyStorefrontIndex.value.add(index)
}

const removeEmptyStorefrontIndex = (index: number) => {
  emptyStorefrontIndex.value.delete(index)
}
</script>
<template>
  <div class="flex flex-col">
    <div
      v-for="(item, index) in props.stockData" :key="index" class="flex flex-row mb-0.5 border-3 bg-amber-200"
      :class="{ 'border-green-500': !indexIncluded(index), 'border-red-500': indexIncluded(index) }"
    >
      <div
        class="w-1/2 h-8 text-center border-r-3 py-1.5 align-middle font-sans text-zinc-700"
        :class="{ 'border-green-500': !indexIncluded(index), 'border-red-500': indexIncluded(index) }"
      >
        {{ item.storefront }}
      </div>
      <div class="w-1/2 h-8 text-center py-1.5 align-middle font-semibold font-sans text-zinc-700">
        {{ item.section }}
      </div>
    </div>
    <button @click="addEmptyStorefrontIndex(10)">
      Add
    </button>
    <button @click="removeEmptyStorefrontIndex(10)">
      Remove
    </button>
  </div>
</template>
