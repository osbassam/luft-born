import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),
    actions: {
        setAuthData(token, user) {
            this.token = token;
            this.user = user;
            localStorage.setItem('authToken', token);
            localStorage.setItem('authUser', JSON.stringify(user));
        },
        clearAuthData() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
        },
        initializeStore() {
            this.token = localStorage.getItem('authToken') || null;
            this.user = JSON.parse(localStorage.getItem('authUser')) || null;
        }
    }
});
