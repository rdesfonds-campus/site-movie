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
          <span class="badge" v-for="genre in movie.genres" :key="genre.id">{{ genre.label }}</span>
        </div>
        <p class="plot">{{ movie.plot }}</p>

        <!-- BLOC NOTATION -->
        <div class="rating-block">
          <p class="rating-title">Ma note :</p>
          <div class="stars">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ active: star <= userRating, hover: star <= hoverRating }"
              @click="submitRating(star)"
              @mouseenter="hoverRating = star"
              @mouseleave="hoverRating = 0"
            >★</span>
          </div>
          <p v-if="ratingMessage" class="rating-message">{{ ratingMessage }}</p>
        </div>

      </div>
    </div>
    <div v-else class="loading">Chargement...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios.js'
import AppNavbar from '@/components/AppNavbar.vue'

const route = useRoute()
const router = useRouter()
const movie = ref(null)
const userRating = ref(0)
const hoverRating = ref(0)
const ratingMessage = ref('')

onMounted(async () => {
  const res = await api.get(`/api/movies/${route.params.id}`)
  movie.value = res.data
})

const submitRating = async (star) => {
  const token = localStorage.getItem('token')
  if (!token) { router.push('/login'); return }

  try {
    // Récupère l'email depuis le JWT
    const payload = JSON.parse(atob(token.split('.')[1]))
    
    // Récupère l'id user via l'API
    const userRes = await api.get(`/api/users?email=${payload.email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const userId = userRes.data['member'][0].id

    await api.post('/api/ratings', {
      movie: `/api/movies/${route.params.id}`,
      user: `/api/users/${userId}`,
      note: star,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    userRating.value = star
    ratingMessage.value = `Note de ${star}/5 enregistrée ! 🎉`
  } catch (e) {
    console.log('Erreur :', e.response?.data)
    ratingMessage.value = 'Erreur lors de la notation.'
  }
}

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
.back-btn:hover { background: #e0e0e0; }
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

/* NOTATION */
.rating-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}
.rating-title {
  font-weight: 600;
  font-size: 1rem;
}
.stars {
  display: flex;
  gap: 8px;
}
.star {
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
}
.star.active {
  color: #f5a623;
}
.star.hover {
  color: #f5a623;
  transform: scale(1.2);
}
.rating-message {
  font-size: 0.9rem;
  color: #4caf50;
  font-weight: 500;
}
</style>