<script setup>
import axiosClient from '../axios';
import GuestLayout from '../components/GuestLayout.vue';

const data = {
  username: '',
  email: '',
  password: '',
  confirm_password: ''
};

function submitForm() {
  axiosClient.post('/register', data)
    .then(response => {
      console.log('Rejestracja udana:', response.data);
    })
    .catch(error => {
      console.error('Błąd rejestracji:', error);
    });
  console.log('Form submitted:', data);
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
            name="username"
            id="username"
            required=""
            v-model="data.username"
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
            required=""
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
            required=""
            v-model="data.password"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <!-- Potwierdzenie hasła -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Potwierdź hasło</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            required=""
            v-model="data.confirm_password"
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
          {{ '' }}
          <RouterLink to="/login" class="text-blue-500 hover:text-blue-600">Masz już konto? Zaloguj się tutaj</RouterLink>     
      </div>
    </div>
  <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Rejestracja</h2>
  </GuestLayout>
</template>

    


<style scoped></style>