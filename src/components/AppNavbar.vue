<template>
  <nav class="navbar">
    <RouterLink to="/" class="brand">🎬 MovieFresh</RouterLink>
    <div class="links">
      <RouterLink to="/" class="link">Films</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login" class="link">Connexion</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/profile" class="link">Mon profil</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const isLoggedIn = computed(() => !!localStorage.getItem('token'))
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #1a1a1a;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.links {
  display: flex;
  gap: 24px;
}

.link {
  color: #ccc;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.link:hover,
.link.router-link-active {
  color: white;
}
</style>