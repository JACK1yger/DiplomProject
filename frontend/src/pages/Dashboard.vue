<template>
  <div>
    <input type="file" @change="upload" />
    <div v-for="file in files" :key="file.id">
      {{ file.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const files = ref([]);

const upload = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  await api.post("/files/upload", formData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

onMounted(async () => {
  const res = await api.get("/files", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  files.value = res.data;
});
</script>