<template>
  <div>
    <h1>Admin panel</h1>

    <button @click="loadData">Load data</button>
    <button @click="logout">Logout</button>

    <hr />

    <div v-if="data">
      <h3>Response from backend:</h3>
      <pre>{{ data }}</pre>
    </div>

    <div v-else>
      <p>No data yet</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";

// защита страницы
if (!localStorage.getItem("token")) {
  window.location.href = "/login";
}

// состояние данных
const data = ref(null);

// загрузка данных с backend
const loadData = async () => {
  try {
    const res = await api.get("/files"); // поменяй на свой endpoint если нужно
    data.value = res.data;
  } catch (err) {
    data.value = "Ошибка запроса к серверу";
  }
};

// выход из системы
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
</script>