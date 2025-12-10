<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axiosClient from '../axios'
import GuestLayout from '../components/GuestLayout.vue'

const data = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

function submitForm() {
  console.log('Wysyłam:', data.value) // ← DODAJ
  
  axiosClient.get('/sanctum/csrf-cookie').then(() => {
    axiosClient.post('/api/register', data.value)
      .then(response => {
        console.log('Rejestracja udana:', response.data)
      })
      .catch(error => {
  console.error('PEŁNY BŁĄD:', error)
  console.error('RESPONSE:', error.response)
  console.error('DATA:', error.response?.data)
  console.error('ERRORS:', error.response?.data?.errors)
})
  })
}
</script>

<template>
  <GuestLayout>
    <pre>{{ data }}</pre>
    <div class="h-screen w-screen bg-gray-600 flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Rejestracja</h2>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Nazwa użytkownika -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nazwa użytkownika</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            v-model="data.name"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"  
            required
            v-model="data.email"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Hasło -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
          <input
            type="password"
            name="password"
            required
            v-model="data.password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Potwierdzenie hasła -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Potwierdź hasło</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            required
            v-model="data.password_confirmation"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Przycisk -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Zarejestruj się
        </button>
      </form>

      <!-- Logowanie -->
      <div class="mt-4 text-center">
        <RouterLink to="/login" class="text-blue-500 hover:text-blue-600">
          Masz już konto? Zaloguj się tutaj
        </RouterLink>     
      </div>
    </div>
  </GuestLayout>
</template>

<style scoped></style>