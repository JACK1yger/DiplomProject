<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const files = ref([]);

const upload = async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);

  try {
    await api.post("/files/upload", formData);
  } catch (e) {
    console.log("Upload error", e);
  }
};

onMounted(async () => {
  try {
    const res = await api.get("/files");
    files.value = res.data;
  } catch (e) {
    console.log("Files load error:", e);
  }
});
</script>