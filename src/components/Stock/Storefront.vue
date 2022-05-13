<script setup lang="ts">
import type { StorefrontEntry } from '~/interface/storefront'
interface Props {
  data: StorefrontEntry
  empty: boolean
}

const props = defineProps<Props>()
</script>
<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg py-8 bg-amber-100 font-lato border-4"
    :class="{ 'border-green-500': !empty, 'border-red-500': empty }"
  >
    <span class="text-stone-600 font-semibold text-lg">{{ props.data.name }}</span>
    <span class="text-stone-600 text-sm">{{ props.data.item }}</span>
  </div>
</template>
