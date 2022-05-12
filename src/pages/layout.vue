<script setup lang="ts">
import { uploadLayout } from '~/api/layout'
const fileRef = ref<File>()
const isSuccess = ref(false)
const isSubmitting = ref(false)
const isValid = ref(false)
const isButtonDisabled = ref(true)
const isSubmitted = ref(false)

watch(fileRef, (newFileRef) => {
  if (newFileRef === undefined)
    isValid.value = false

  else
    isValid.value = true
})

watch([isSubmitting, isValid], ([newIsSubmitting, newIsValid]) => {
  isButtonDisabled.value = !newIsValid || newIsSubmitting
})

const changeFile = (fileList: FileList) => {
  fileRef.value = fileList[0]
}

const onDragOver = (event: DragEvent) => {
  event.dataTransfer!.dropEffect = 'copy'
}

const onDrop = (event: DragEvent) => {
  const fileList = event.dataTransfer!.files
  changeFile(fileList)
}

const submitForm = async() => {
  isSubmitted.value = true
  isSubmitting.value = true
  const formData = new FormData()
  if (fileRef.value) {
    formData.set('upload-layout', fileRef.value)
    const { statusCode } = await uploadLayout(formData)
    isSuccess.value = statusCode.value === 200
    isSubmitting.value = false
  }
}
</script>
<template>
  <main class="flex flex-col items-center justify-center gap-y-8">
    <div
      class="flex items-center justify-center border-dotted border-2 border-sky-300 h-88 w-full"
      @dragover.stop.prevent="onDragOver" @drop.stop.prevent="onDrop"
    >
      Drag and drop your file here
    </div>
    <span class="font-bold font-roboto text-2xl">OR</span>
    <input
      class="bg-white text-black rounded" type="file" name="upload-layout" accept=".json"
      @change="changeFile($event.target.files)"
    >
    <button
      :disabled="isButtonDisabled" class="px-4 py-2 max-w-32 rounded"
      :class="{ 'bg-gray': isButtonDisabled, 'bg-cyan-500': !isButtonDisabled }" type="submit"
      @click.prevent="submitForm"
    >
      Upload
    </button>
    <section v-show="isSubmitted">
      <span v-if="isSuccess" class="text-green-400 font-lato text-lg">Upload is successful!</span>
      <span v-else class="text-red-400 font-lato text-lg">Upload has failed! Please try again!</span>
    </section>
  </main>
</template>
