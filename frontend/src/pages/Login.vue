<template>
  <div>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import api from "../api/axios";

let email = "";
let password = "";

const login = async () => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
};
</script>