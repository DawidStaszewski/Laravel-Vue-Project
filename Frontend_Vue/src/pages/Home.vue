<script setup>
import { PhotoIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted,computed } from "vue";
import axiosClient from "../axios.js";
import router from "../router.js";
import { useRoute } from 'vue-router'

const route = useRoute()

const data = ref({
  image: null,
  label: "",
});

const imageId = computed(() => {
  return router.currentRoute.value.params.id
});

const isEdit = computed(() => !!imageId.value);

onMounted(() => {
  if (isEdit.value) {
    axiosClient.get(`/api/images/${route.params.id}`).then((res) => {
      data.value.label = res.data.label ?? "";
    });
  }
});

function submitForm() {
  if (isEdit.value) {
    axiosClient
      .put(`/api/images/${imageId.value}`, {
        label: data.value.label,
      })
      .then(() => {
        router.push({ name: "MyImages" });
      });
  } else {
    const formData = new FormData();
    formData.append("image", data.value.image);
    formData.append("label", data.value.label);
    axiosClient.post("/api/images", formData).then(() => {
      router.push({ name: "MyImages" });
    });
  }
}
</script>

<template>
  <header
    class="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10"
  >
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-white">Upload</h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="label" class="block text-sm font-medium text-gray-700"
            >Label</label
          >
          <input
            type="text"
            name="label"
            id="label"
            v-model="data.label"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <input
        v-if="!isEdit"
        type="file"
        @change="data.image=$event.target.files[0]"/>
        <button type="submit"> {{ isEdit ? 'Save changes' : 'Upload' }}</button>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
