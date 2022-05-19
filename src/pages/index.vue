<script setup lang="ts">
</script>

<template>
  <div w="full" min-h="screen" flex="~ col" justify-center items-center p="6">
    <div w="full md:64 lg:72">
      <div mb-4>
        <h1 font="sans bold" text="xl center">
          Smart Retail System
        </h1>
        <div italic text="xs md:sm center gray-600">
          Made for IF4051 IoT System Development
        </div>
      </div>
      <div flex="~ col" space="y-2" text="sm">
        <router-link to="/register" btn p-2 text-sm text-center>
          Register
        </router-link>
        <router-link to="/stock" btn p-2 text-sm text-center>
          View Stock
        </router-link>
        <router-link to="/layout" btn p-2 text-sm text-center>
          View Layout
        </router-link>
        <router-link to="/recommendation" btn p-2 text-sm text-center>
          View Recommendation
        </router-link>
      </div>
    </div>
  </div>
</template>
