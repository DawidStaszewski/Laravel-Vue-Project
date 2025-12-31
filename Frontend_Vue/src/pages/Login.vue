<script setup>
import { ref } from 'vue';
import axiosClient from '../axios';
import GuestLayout from '../components/GuestLayout.vue';
import router from '../router.js';

const data = ref({
  email: '',
  password: ''
});

const errorMessage = ref('');

function submitForm() {
  axiosClient.get('sanctum/csrf-cookie').then( ()=>{
    axiosClient.post("/login", data.value)
    .then( response => {
      router.push({ name: 'Home' });
    })
    .catch( error => {
        console.log(error.response)
        errorMessage.value=error.response.data.message;
      })
    });
  };


</script>

<template>
  <GuestLayout>
    <div v-if="errorMessage" class="py-2 px-3 rounded text-white bg-red-500">
      {{ errorMessage }}
    </div>

    <div class="h-screen w-screen bg-gray-600 flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Logowanie</h2>
      
      <form @submit.prevent="submitForm"  class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autocomplete="current-email"
            required=""
            placeholder="Wprowadź email"
            v-model="data.email"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <!-- Hasło -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
          <input
            type="password"
            name="password"
            id="password" 
            autocomplete="current-password"
            placeholder="Wprowadź hasło"
            required=""
            v-model="data.password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Zaloguj się
        </button>

        <div class="mt-4 text-center">
          {{ '' }}
          <RouterLink to="/signup" class="text-blue-500 hover:text-blue-600">Nie masz konta? Zarejestruj się tutaj</RouterLink>     
      </div>
      </form>
    </div>

  </GuestLayout>
</template>

<style scoped></style>