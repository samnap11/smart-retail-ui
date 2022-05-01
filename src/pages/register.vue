<script lang="ts">
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

import mitt from 'mitt'

import '@vuepic/vue-datepicker/dist/main.css'

import { createUserApi } from '../api/user'
import type { CreateUserRequest } from '~/interface/user'

const emitter = mitt()

export default {
  name: 'RegisterForm',
  components: {
    VueCtkDateTimePicker,
  },
  data() {
    return {
      formData: {
        name: null,
        gender: null,
        birthdate: null,
        card_id: '',
      } as CreateUserRequest,
      isSuccess: false,
    }
  },
  created() {
    emitter.emit('register', (evt: any) => {
      this.formData.card_id = evt.eventContent
    })
  },
  mounted() {
    // emitter.on("toggle-sidebar", )
  },
  methods: {
    generate_card_id() {
      this.formData.card_id = String(parseInt(String(Math.random() * 1000000000)))
    },
    async sendForm(e: Event) {
      createUserApi(this.formData).then(() => this.isSuccess = true).then(() => this.clearForm())
    },
    clearForm() {
      this.formData.name = null
      this.formData.gender = null
      this.formData.birthdate = null
      this.formData.card_id = ''
    },
  },
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
          v-model="formData.name" placeholder="Nama Lengkap" required
          class="flex h-12 text-black justify-start w-full"
        >
      </div>
      <div class="ml-32 mr-32 mb-7  text-black">
        <p class="text-left text-white">
          Jenis Kelamin
        </p>
        <div class="flex text-white left items-center">
          <input id="L" v-model="formData.gender" type="radio" required value="L"> <label for="L">Laki-Laki</label>
          <input id="P" v-model="formData.gender" type="radio" required value="P" class="ml-5"><label
            for="P"
          >Perempuan</label>
        </div>
      </div>
      <div class="ml-32 mr-32 mb-7 text-black">
        <p class="text-left text-white">
          Tanggal Lahir (MM/DD/YYYY)
        </p>
        <VueCtkDateTimePicker
          v-model="formData.birthdate" required only-date formatted="L" no-label overlay
          class="flex h-12 text-black justify-start w-full"
        />
      </div>
      <div class="ml-32 mr-32 mb-7  text-black">
        <p class="text-left text-white">
          ID Kartu
        </p>
        <input
          v-model="formData.card_id" placeholder="ID Kartu" disabled
          class="flex h-12 text-black justify-start w-full"
        >
      </div>
      <button type="submit" class="text-xl mt-12">
        Send Form
      </button>
      <div v-if="isSuccess">
        <p class="text-green">
          Congratulations! You have successfully registered your card!
        </p>
      </div>
    </form>
  </div>

  <button class="text-xl mt-12" @click="generate_card_id()">
    Generate Button
  </button>
</template>
