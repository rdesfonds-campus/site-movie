<template>
  <div class="card" @click="goToDetail">
    <img :src="posterUrl" :alt="title" />
    <div class="card-info">
      <h3>{{ title }}</h3>
      <span>⭐ {{ rating }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
  title: String,
  rating: Number,
  posterUrl: String,
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/movie/${props.id}`)
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.03);
}
.card img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  background: #eee;
}
.card-info {
  padding: 8px;
}
</style>