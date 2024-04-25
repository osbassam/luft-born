<script setup>
import { ref } from 'vue';
import axios from '../api/axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errors = ref({});
const loading = ref(false);

const login = async () => {
  errors.value = {};
  loading.value = true;
  try {
    const response = await axios.post('api/login', {
      email: email.value,
      password: password.value 
    });
    
    authStore.setAuthData(response.data.token, response.data.user);
    router.push({ name: 'BlogIndex' });
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  } finally {
    loading.value = false; // Ensure loading is set to false after the request completes
  }
};
</script>

<template>
  <div class="min-h-screen max-w-7xl mx-auto flex items-center justify-center bg-gray-100">
    <div class="p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md">
      <h2 class="mb-6 text-xl font-bold text-center text-gray-900">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
          <input type="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@domain.com" required>
          <div v-if="errors.email && errors.email.length" class="mb-3 text-center text-sm text-red-500">
            {{ errors.email[0] }}
          </div>
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input type="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
        </div>
        <button type="submit" :disabled="loading" class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          <span v-if="loading" class="spinner border-t-2 border-r-2 border-white h-5 w-5 mr-3 rounded-full animate-spin"></span>
          <span v-if="loading">Processing...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped> 
.spinner {
  border-top-color: transparent;
  border-right-color: transparent;
}
</style>../api/axios
