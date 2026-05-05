<template>
  <div class="login-page">
    <div class="login-card">
      <h1>🎬 Connexion</h1>
      <p class="subtitle">Accède à ton espace film</p>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="exemple@mail.com"
            required
          />
        </div>
        <div class="field">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit" class="submit-btn">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios.js'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    const res = await api.post('/api/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (e) {
    errorMessage.value = 'Email ou mot de passe incorrect.'
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.login-card {
  background: white;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 420px;
}
h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; }
.subtitle { color: #888; margin-bottom: 32px; }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
label { font-size: 0.9rem; font-weight: 600; color: #333; }
input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}
input:focus { outline: none; border-color: #333; }
.error { color: #e53935; font-size: 0.9rem; margin-bottom: 12px; }
.submit-btn {
  width: 100%;
  padding: 14px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover { background: #333; }
</style>