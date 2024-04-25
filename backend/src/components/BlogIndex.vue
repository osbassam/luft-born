<script setup>
import { useAuthStore } from '../stores/auth';
import axios from '../api/axios';
import { onMounted, ref, computed } from 'vue';
import NewPostModal from './PostModal.vue';

const authStore = useAuthStore();
const posts = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const selectedPost = ref(null);


onMounted(async () => {
    await getPosts();
});

const getPosts = async () => {  
    try {
        const response = await axios.get('api/posts');
        console.log(response.data);
        posts.value = response.data.data;
        showModal.value = false;
    } catch (error) {
        console.error('Failed to load posts:', error);
    }

}

const user = computed(() => authStore.user);

const deletePost = async (id) => {
    try{
        const response = await axios.delete(`api/posts/${id}`);
        getPosts();
    } catch(error) {
        console.error('Failed to delete post:', error);
    }
}

const openEditModal = (post) => {
  selectedPost.value = post;
    isEditing.value = true;
    showModal.value = true;
}



</script>

<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold mb-4">Blog Posts</h1>
        <button class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" @click="showModal = true">New Post</button>
      </div>
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Title</th>
            <th class="py-3 px-6 text-left">Author</th>
            <th class="py-3 px-6 text-center">Date</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" class="border-b border-gray-200 hover:bg-gray-100">
        
            <td class="py-3 px-6 text-left whitespace-nowrap">{{ post.title }}</td>
            <td class="py-3 px-6 text-left">{{ post.author.name }}</td>
            <td class="py-3 px-6 text-center">{{ post.created_at }}</td>
            <td class="py-3 px-6 text-center">
              <button v-if="user.id == post.author.id" @click="openEditModal(post)" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Edit</button>
              <button v-if="user.id === post.author.id" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600" @click="deletePost(post.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="posts.length === 0">
            <td colspan="4" class="text-center py-3 px-6">No posts available.</td>
          </tr>
        </tbody>
      </table>
      <NewPostModal v-if="showModal" :post="selectedPost" is-editing @success="getPosts" @close="showModal = false"></NewPostModal>
    </div>
  </template>