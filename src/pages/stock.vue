<script setup lang="ts">
import stock from '~/mock/stock.json'

const stockData = stock.data
</script>
<template>
  <main class="mx-auto w-8/12 mt-4">
    <Header />
    <Rows :stock-data="stockData" />
  </main>
</template>
