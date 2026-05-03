<template>
  <div>
    <h1>Admin Panel</h1>

    <button @click="logout">Logout</button>

    <hr />

    <!-- POSTS -->
    <h2>Posts</h2>

    <input v-model="title" placeholder="title" />
    <textarea v-model="content" placeholder="content"></textarea>
    <button @click="createPost">Create post</button>

    <div v-for="post in posts" :key="post.id">
      <b>{{ post.title }}</b>
      <p>{{ post.content }}</p>
      <button @click="deletePost(post.id)">Delete</button>
    </div>

    <hr />

    <!-- FILES -->
    <h2>Files</h2>

    <input type="file" @change="upload" />

    <div v-for="file in files" :key="file.id">
      {{ file.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";

const router = useRouter();

const posts = ref([]);
const files = ref([]);

const title = ref("");
const content = ref("");

// AUTH GUARD
onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
});

// LOAD DATA
const loadPosts = async () => {
  const res = await api.get("/posts");
  posts.value = res.data;
};

const loadFiles = async () => {
  const res = await api.get("/files");
  files.value = res.data;
};

// POSTS
const createPost = async () => {
  await api.post("/posts", {
    title: title.value,
    content: content.value,
  });

  title.value = "";
  content.value = "";

  loadPosts();
};

const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
  loadPosts();
};

// FILES
const upload = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  await api.post("/files/upload", formData);

  loadFiles();
};

// LOGOUT
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(() => {
  loadPosts();
  loadFiles();
});
</script>