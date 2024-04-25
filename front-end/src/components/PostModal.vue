<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from '../api/axios';

const emit = defineEmits(['close', 'success']);

const props = defineProps({
  post: Object | null,
  isEditing: Boolean
});

const authStore = useAuthStore();
const title = ref(props.post?.title);
const body = ref(props.post?.body);
const isLoading = ref(false);

const close = () => {
  emit('close');
}

const submit = async () => {
  // axios request to store a post


  if (props.isEditing) {
    const response = await axios.put('api/posts/' + props.post?.id, {
      title: title.value,
      body: body.value
    }).then((response) => {
      console.log(response.data);
      emit('success');
    }).catch((error) => {
      alert("An error occurred while trying to  create a post");
    });
  }
  else {
    const response = await axios.post('api/posts', {
      title: title.value,
      body: body.value
    }).then((response) => {
      console.log(response.data);
      emit('success');
    }).catch((error) => {
      alert("An error occurred while trying to  create a post");
    });
  }


}
</script>

<template>
  

  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" @click.self="close">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <h3 class="text-lg font-medium text-gray-900" v-if="!isEditing" >New Post</h3>
      <h3 class="text-lg font-medium text-gray-900" v-else >Update Post</h3>
      <form @submit.prevent="submit">
        <div class="mt-4">
          <label class="block">Title</label>
          <input type="text" v-model="title" class="w-full p-2 border rounded" placeholder="Enter post title" required>
        </div>
        <div class="mt-4">
          <label class="block">Body</label>
          <textarea v-model="body" rows="4" class="w-full p-2 border rounded" placeholder="Enter post body"
            required></textarea>
        </div>
        <div class="text-right mt-4">
          <button type="button" @click="close"
            class="mr-2 px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>