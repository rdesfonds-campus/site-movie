<template>
  <div>
    <AppNavbar />
    <div v-if="user" class="profile-page">
      <div class="profile-card">
        <div class="avatar">{{ initials }}</div>
        <h1>{{ user.name }}</h1>
        <p class="email">{{ user.email }}</p>
        <button class="logout-btn" @click="handleLogout">Se déconnecter</button>
      </div>
    </div>
    <div v-else class="loading">Chargement...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AppNavbar from '@/components/AppNavbar.vue'

const user = ref(null)
const router = useRouter()

const initials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }
  try {
    const res = await axios.get('http://localhost:8000/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = res.data
  } catch (e) {
    router.push('/login')
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.profile-card {
  background: white;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #1a1a1a;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 1.6rem;
  font-weight: 700;
}

.email {
  color: #888;
  font-size: 0.95rem;
}

.logout-btn {
  margin-top: 8px;
  padding: 12px 32px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #c62828;
}
</style>