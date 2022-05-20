<script setup lang="ts">
import { createFetch } from '@vueuse/core'
import type { User } from '~/interface/user'
import type { Item } from '~/interface/item'
import type { CreateTransactionRequest } from '~/interface/transaction'

const { data: users } = useFetch(`${import.meta.env.VITE_API_URL}/users`).get().json<User[]>()
const { data: items } = useFetch(`${import.meta.env.VITE_API_URL}/items`).get().json<Item[]>()

const basket = ref<string[]>([])

const formData = reactive({
  user_id: '',
  item_ids: basket.value,
})

const selectedItem = ref<string>('')

const sendForm = async() => {
  const req: CreateTransactionRequest = formData
  await createFetch({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchOptions: {
      mode: 'cors',
    },
  })(`${import.meta.env.VITE_API_URL}/transactions`).post(req).json()
}

</script>

<template>
  <div flex="~ col" items-center w="full lg:128">
    <!-- HEADER -->
    <header mb-4>
      <h1 font-bold text-3xl text-center>
        Make Transaction
      </h1>
      <div font="italic" text="xs lg:sm center">
        Links transaction into user
      </div>
    </header>
    <!-- SLIDERS -->
    <form flex="~ col" space-y-2 mb-4 @submit.prevent="sendForm">
      <select v-model="formData.user_id" text-input>
        <template v-for="u in users" :key="u.id">
          <option :value="u.id">
            {{ u.name }}
          </option>
        </template>
      </select>
      <select v-model="selectedItem" text-input>
        <template v-for="i in items" :key="i.id">
          <option :value="i.id">
            {{ i.name }}
          </option>
        </template>
      </select>
      <button btn @click="(e) => {e.preventDefault(); basket.push(selectedItem);}">
        Add Item
      </button>
      <div flex="~" space-x-2>
        <div v-for="b in basket" :key="b" text-sm rounded-full p="x-2 y-1" bg-teal-600>
          {{ items?.find((i) => i.id == b)?.name }}
        </div>
      </div>
      <pre text-xs rounded-lg bg-gray-900 p-3 mb-4>{{ formData }}</pre>
      <button type="submit" btn>
        Submit
      </button>
    </form>
  </div>
</template>
