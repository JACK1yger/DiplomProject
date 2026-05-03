<template>
  <div>
    <input v-model="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    router.push("/admin");
  } catch {
    alert("Неверный логин");
  }
};
</script>