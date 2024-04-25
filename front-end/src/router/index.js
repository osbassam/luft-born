import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import BlogIndex from '../components/BlogIndex.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
    { path: '/' , name: 'Login', component: Login },
    { path: '/blog-posts', name: 'BlogIndex', component: BlogIndex, meta: { requiresAuth: true } }
    //   { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.token) { // Ensure it checks something that accurately reflects auth status
      next({ name: 'Login' });
    } else {
      next();
    }
  });

export default router;
