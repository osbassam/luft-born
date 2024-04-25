import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // if you are using Vue Router
import './style.css';
import { useAuthStore } from './stores/auth';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();
authStore.initializeStore();  // Restore state from localStorage

app.use(router);
app.mount('#app');
