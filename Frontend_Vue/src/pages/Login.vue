<script setup>
import GuestLayout from '../components/GuestLayout.vue';


</script>

<template>
  <GuestLayout>
    
    
    <div class="h-screen w-screen bg-gray-600 flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Logowanie</h2>
      
      <form method="post" action="#" class="space-y-4">
        <!-- Nazwa użytkownika -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nazwa użytkownika</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Wprowadź nazwę użytkownika"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <!-- Hasło -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
          <input
            type="password"
            name="password"
            id="password" 
            placeholder="Wprowadź hasło"
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