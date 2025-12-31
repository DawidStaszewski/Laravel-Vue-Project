<script setup>
import { ref } from 'vue'
import axiosClient from '../axios'
import GuestLayout from '../components/GuestLayout.vue'
import router from "../router.js";

const data = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errorMessage = ref(
  {
    name: '',
    email: '',
    password: ''
  }
)

function submitForm() {
  axiosClient.get('sanctum/csrf-cookie').then( ()=>{
    axiosClient.post("/register",data.value)
    .then( response => {
      router.push({ name: 'Home' });
    })
    .catch(error => {
  if (error.response && error.response.data && error.response.data.errors) {
    errorMessage.value = error.response.data.errors
  } else {
    console.log(error)
  }
})
  });
}

</script>

<template>
  <GuestLayout>
    
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
            
            v-model="data.name"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <p v-if="errorMessage.name" class="text-red-500">{{ errorMessage.name[0] }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"  
            
            v-model="data.email"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <p v-if="errorMessage.email" class="text-red-500">{{ errorMessage.email[0] }}</p>
        </div>

        <!-- Hasło -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
          <input
            type="password"
            name="password"
            
            v-model="data.password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <p v-if="errorMessage.password" class="text-red-500">{{ errorMessage.password[0] }}</p>
        </div>

        <!-- Potwierdzenie hasła -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Potwierdź hasło</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            
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