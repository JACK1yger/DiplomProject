<template>
  <div class="admin">

    <header class="topbar">
      <h1>CMS Admin Panel</h1>
      <button @click="logout">Logout</button>
    </header>

    <div class="grid">

      <!-- POSTS -->
      <section class="card">
        <h2>Posts</h2>

        <input v-model="title" placeholder="title" />
        <textarea v-model="content" placeholder="content"></textarea>

        <button @click="createPost">Create</button>

        <div v-for="post in posts" :key="post.id" class="item">
          <b>{{ post.title }}</b>
          <p>{{ post.content }}</p>

          <button @click="deletePost(post.id)">Delete</button>
        </div>
      </section>

      <!-- FILES -->
      <section class="card">
        <h2>Files</h2>

        <input type="file" @change="upload" />

        <div v-for="file in files" :key="file.id" class="item">
          {{ file.name }}
        </div>
      </section>

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

// 🔐 auth guard
onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push("/login");
  }
});

// 📦 загрузка данных
const load = async () => {
  const [postsRes, filesRes] = await Promise.all([
    api.get("/posts"),
    api.get("/files"),
  ]);

  posts.value = postsRes.data;
  files.value = filesRes.data;
};

// ➕ create post
const createPost = async () => {
  if (!title.value || !content.value) return;

  await api.post("/posts", {
    title: title.value,
    content: content.value,
  });

  title.value = "";
  content.value = "";

  await load();
};

// 🗑 delete post
const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
  await load();
};

// 📁 upload file
const upload = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  await api.post("/files/upload", formData);

  await load();
};

// 🚪 logout
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

// 🚀 init
onMounted(load);
</script>

<style>
.admin {
  padding: 20px;
  font-family: sans-serif;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
}

.item {
  margin-top: 10px;
  padding: 5px;
  border-bottom: 1px solid #eee;
}
</style>