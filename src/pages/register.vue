<script setup lang="ts">
import { createUserApi } from '~/api/user'
import type { CreateUserRequest } from '~/interface/user'

const name = ref('')
const gender = ref<'L' | 'P'>('L')
const birthdate = ref('')
const cardId = ref('')
const isSuccess = ref(false)

async function sendForm() {
  const req: CreateUserRequest = {
    name: name.value,
    gender: gender.value,
    birthdate: birthdate.value,
    card_id: cardId.value,
  }
  const statusCode = await createUserApi(req)
  isSuccess.value = statusCode === 200
}
</script>
<template class="container">
  <h1 class="bold text-7xl m-10">
    Registration Form
  </h1>

  <div class="flex flex-col">
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
          <input id="L" v-model="gender" type="radio" required value="L"><label for="L"> Laki-Laki</label>
          <input id="P" v-model="gender" type="radio" required value="P" class="ml-5"><label for="P"> Perempuan</label>
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
      <button type="submit" class="bg-green-400 rounded px-4 py-2 text-xl text-slate-100 mt-12">
        Send Form
      </button>
      <div v-if="isSuccess">
        <p class="text-green">
          Congratulations! You have successfully registered your card!
        </p>
      </div>
    </form>
  </div>
</template>
