<template>
  <div>
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="login">Login</button>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  error.value = "";

  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);

    // 👉 ВАЖНО: переход в админку
    window.location.href = "/admin";
  } catch (e) {
    error.value = "Неверный логин или пароль";
  }
};
</script>