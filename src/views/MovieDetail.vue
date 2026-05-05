<template>
  <div>
    <AppNavbar />
    <div v-if="movie" class="detail">
      <img :src="movie.poster" :alt="movie.title" class="poster" />
      <div class="info">
        <button class="back-btn" @click="$router.back()">← Retour</button>
        <h1>{{ movie.title }}</h1>
        <div class="badges">
          <span class="badge">📅 {{ movie.year }}</span>
          <span class="badge">⭐ {{ movie.imdb ? movie.imdb.rating : 'N/A' }} / 10</span>
          <span class="badge" v-for="genre in movie.genres" :key="genre">{{ genre }}</span>
        </div>
        <p class="plot">{{ movie.plot }}</p>
      </div>
    </div>
    <div v-else class="loading">Chargement...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppNavbar from '@/components/AppNavbar.vue'

const route = useRoute()
const movie = ref(null)

onMounted(async () => {
  const res = await axios.get(`http://localhost:8000/api/movies/${route.params.id}`)
  movie.value = res.data
})
</script>

<style scoped>
.detail {
  display: flex;
  gap: 48px;
  padding: 48px;
  max-width: 1000px;
  margin: 0 auto;
}

.poster {
  width: 280px;
  min-width: 280px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back-btn {
  width: fit-content;
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #e0e0e0;
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #444;
}

.plot {
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  max-width: 580px;
}

.loading {
  text-align: center;
  padding: 80px;
  color: #999;
}
</style>