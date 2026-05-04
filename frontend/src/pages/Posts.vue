<template>
  <div>
    <h2>Posts</h2>

    <div v-for="post in posts" :key="post.id">
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>

    <img
        v-if="post.image"
        :src="`http://localhost:5000/${post.image}`"
        style="max-width: 300px;"
    />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const posts = ref([]);

onMounted(async () => {
  const res = await api.get("/posts"); 
  posts.value = res.data;
});
</script>