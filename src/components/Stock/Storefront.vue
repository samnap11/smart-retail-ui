<script setup lang="ts">
interface Props {
  storeFrontName: string
  empty: boolean
}

const props = defineProps<Props>()
</script>
<template>
  <div
    class="rounded-lg py-8 text-center bg-amber-100 text-stone-600 font-lato font-semibold text-lg border-4"
    :class="{ 'border-green-500': empty, 'border-red-500': !empty }"
  >
    {{ props.storeFrontName }}
  </div>
</template>
