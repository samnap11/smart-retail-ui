<script setup lang="ts">
import { createUserApi } from '~/api/user'
import type { CreateUserRequest } from '~/interface/user'

const name = ref('')
const gender = ref<'L' | 'P'>('L')
const birthdate = ref('')
const cardId = ref('')
const isSuccess = ref(false)

const isModalOpened = ref(false)
const isSubmitting = ref(false)

const sendForm = async() => {
  const req: CreateUserRequest = {
    name: name.value,
    gender: gender.value,
    birthdate: birthdate.value,
    card_id: cardId.value,
  }
  const { statusCode, isFinished, isFetching } = await createUserApi(req)
  watch([isFetching, isFinished], ([newIsFetching, newIsFinished]) => {
    if (newIsFetching && !newIsFinished) { isSubmitting.value = true }

    else if (!newIsFetching && newIsFinished) {
      isSubmitting.value = false
      isSuccess.value = statusCode.value === 200
      isModalOpened.value = true
    }
  })
}

const clearForm = () => {
  name.value = ''
  gender.value = 'L'
  birthdate.value = ''
  cardId.value = ''
  isSuccess.value = false
}

const modalButtonOnClick = () => {
  isModalOpened.value = false
  if (isSuccess.value)
    clearForm()
}

const url = `${import.meta.env.VITE_API_URL}/sse`

const { data } = useEventSource(url, ['register'])
watch(data, (newData) => {
  if (newData)
    cardId.value = newData
})
</script>
<template>
  <h1 class="bold text-7xl m-10">
    Registration Form
  </h1>

  <main class="flex flex-col">
    <form @submit.prevent="sendForm()">
      <div class="ml-32 mr-32  mb-7  text-black">
        <p class="text-left text-white">
          Nama Lengkap
        </p>
        <input
          v-model="name" placeholder="Nama Lengkap" required
          class="flex px-2 mt-2 h-12 text-black justify-start w-full"
        >
      </div>
      <div class="ml-32 mr-32 mb-7 text-black">
        <p class="text-left text-white">
          Jenis Kelamin
        </p>
        <div class="flex text-white mt-2 left items-center">
          <input id="L" v-model="gender" type="radio" required value="L" class="mr-1"><label for="L">Laki-Laki</label>
          <input id="P" v-model="gender" type="radio" required value="P" class="ml-5 mr-1"><label
            for="P"
          >Perempuan</label>
        </div>
      </div>
      <div class="ml-32 mr-32 mb-7 text-black">
        <p class="text-left text-white">
          Tanggal Lahir
        </p>
        <input
          v-model="birthdate" type="date" max="2009-12-31" required
          class="flex px-2 mt-2 h-12 text-black justify-start w-full"
        >
      </div>
      <div class="ml-32 mr-32 mb-7  text-black">
        <p class="text-left text-white">
          ID Kartu
        </p>
        <input
          v-model="cardId" placeholder="ID Kartu" disabled
          class="flex px-2 mt-2 h-12 text-black justify-start w-full"
        >
      </div>
      <button
        :disabled="isSubmitting" type="submit" class="rounded px-4 py-2 text-xl mt-12"
        :class="{ 'bg-green-700/70 text-gray-500': isSubmitting, 'bg-green-700 text-slate-100': !isSubmitting }"
      >
        <p v-if="!isSubmitting">
          Submit
        </p>
        <p v-else>
          Submitting...
        </p>
      </button>
    </form>
  </main>
  <aside
    v-show="isModalOpened"
    class="flex items-center justify-center p-1 fixed top-0 left-0 right-0 bottom-0 bg-black/50"
  >
    <div
      class="flex flex-col p-6 gap-y-2 bg-amber-200 text-black rounded-lg items-center justify-center border-3"
      :class="{ 'border-red-500': !isSuccess, 'border-green-500': isSuccess }"
    >
      <p v-if="isSuccess">
        User has been successfully registered!
      </p>
      <p v-else>
        There is an error when registering the user. Please try again!
      </p>
      <button class="bg-cyan-500 px-4 py-2 max-w-32 rounded" @click="modalButtonOnClick">
        Got it!
      </button>
    </div>
  </aside>
</template>
