<script setup lang="ts">
import { createUserApi } from '~/api/user'
import type { CreateUserRequest } from '~/interface/user'

const initialUserData = {
  name: '',
  gender: 'L',
  birthdate: '',
  cardId: '',
}

const isSuccess = ref(false)

const userData = reactive({ ...initialUserData })

const isModalOpened = ref(false)
const isSubmitting = ref(false)

const sendForm = async() => {
  const req: CreateUserRequest = {
    name: userData.name,
    gender: userData.gender as 'L' | 'P',
    birthdate: userData.birthdate,
    card_id: userData.cardId,
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

const resetForm = () => {
  Object.assign(userData, { ...initialUserData })
}

const modalButtonOnClick = () => {
  isModalOpened.value = false
  if (isSuccess.value)
    resetForm()
}

const url = `${import.meta.env.VITE_API_URL}/sse`

const { data } = useEventSource(url, ['register'])
watch(data, (newData) => {
  if (newData)
    userData.cardId = newData
})
</script>

<template>
  <div flex="~ col" w-full lg:w-128>
    <h1 font-bold text-4xl mb-4 underline="~ dotted">
      Registration Form
    </h1>
    <form @submit.prevent="sendForm">
      <div m="b-4">
        <div text-sm mb-1>
          Nama Lengkap
        </div>
        <input
          v-model="userData.name"
          placeholder="Nama Lengkap"
          required
          text-input
        >
      </div>
      <div m="b-4">
        <div text-sm mb-1>
          Jenis Kelamin
        </div>
        <div class="flex text-white mt-2 left items-center">
          <input id="L" v-model="userData.gender" type="radio" required value="L" class="mr-1"><label for="L">Laki-Laki</label>
          <input id="P" v-model="userData.gender" type="radio" required value="P" class="ml-5 mr-1"><label
            for="P"
          >Perempuan</label>
        </div>
      </div>
      <div m="b-4">
        <div text-sm mb-1>
          Tanggal Lahir
        </div>
        <input
          v-model="userData.birthdate" type="date" max="2009-12-31" required
          text-input
        >
      </div>
      <div m="b-4">
        <div text-sm mb-1>
          ID Kartu
        </div>
        <input
          v-model="userData.cardId" placeholder="ID Kartu" disabled
          text-input
        >
      </div>
      <pre rounded bg-gray-800 p-2 mb-7 text-sm>{{ userData }}</pre>
      <button
        btn
        w-full
        p-2
        mb-4
        @click="(e) => {e.preventDefault(); resetForm()}"
      >
        Reset Form
      </button>
      <button
        btn
        w-full
        p-2
        :disabled="isSubmitting"
        type="submit"
        :class="{ 'bg-teal-700/70 text-gray-500': isSubmitting }"
      >
        <template v-if="!isSubmitting">
          Submit
        </template>
        <template v-else>
          Submitting...
        </template>
      </button>
    </form>
  </div>
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
      <button btn @click="modalButtonOnClick">
        Got it!
      </button>
    </div>
  </aside>
</template>
