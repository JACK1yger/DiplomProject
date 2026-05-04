<template>
  <div>
    <h2>Dashboard</h2>

    <!-- FILE UPLOAD -->
    <input type="file" @change="upload" />

    <h3>Files</h3>
    <div v-for="file in files" :key="file.id">
      <a :href="`http://localhost:5000/${file.path}`" target="_blank">
        {{ file.name }}
      </a>
    </div>

    <hr />

    <!-- POSTS -->
    <h3>Posts</h3>

    <input v-model="title" placeholder="title" />
    <input v-model="content" placeholder="content" />
    <button @click="createPost">Create</button>

    <hr />

    <div v-for="post in posts" :key="post.id" class="post">

      <!-- EDIT MODE -->
      <div v-if="editId === post.id">
        <input v-model="editTitle" />
        <textarea v-model="editContent"></textarea>

        <button @click="saveEdit(post.id)">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>

      <!-- VIEW MODE -->
      <div v-else>
        <b>{{ post.title }}</b>
        <p>{{ post.content }}</p>

        <!-- 🖼 IMAGE -->
        <img
          v-if="post.image"
          :src="`http://localhost:5000/${post.image}`"
          style="max-width: 200px; display:block; margin:10px 0;"
        />

        <button @click="startEdit(post)">Edit</button>
        <button @click="deletePost(post.id)">Delete</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const files = ref([]);
const posts = ref([]);

const title = ref("");
const content = ref("");

const editId = ref(null);
const editTitle = ref("");
const editContent = ref("");

// 🔥 УБРАЛ token — axios сам его подставляет
// (если interceptor у тебя настроен)

const loadData = async () => {
  const filesRes = await api.get("/files");
  const postsRes = await api.get("/posts");

  files.value = filesRes.data;
  posts.value = postsRes.data;
};

// CREATE
const createPost = async () => {
  await api.post("/posts", {
    title: title.value,
    content: content.value,
  });

  title.value = "";
  content.value = "";

  await loadData();
};

// DELETE
const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
  await loadData();
};

// EDIT
const startEdit = (post) => {
  editId.value = post.id;
  editTitle.value = post.title;
  editContent.value = post.content;
};

const cancelEdit = () => {
  editId.value = null;
  editTitle.value = "";
  editContent.value = "";
};

const saveEdit = async (id) => {
  await api.put(`/posts/${id}`, {
    title: editTitle.value,
    content: editContent.value,
  });

  cancelEdit();
  await loadData();
};

// FILE UPLOAD
const upload = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  await api.post("/files/upload", formData);

  await loadData();
};

onMounted(loadData);
</script>