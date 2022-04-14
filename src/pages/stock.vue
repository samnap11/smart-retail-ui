<script setup lang="ts">
// TODO: Read actual event from websocket
import stock from '~/mock/stock.json'

const stockData = stock.data
</script>
<template>
  <main class="mx-auto w-10/12 mt-4">
    <Header />
    <Content :data="stockData" />
  </main>
</template>
