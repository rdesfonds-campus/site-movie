<template>
  <div class="grid">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :title="movie.title"
      :rating="movie.vote_average"
      :posterUrl="movie.poster_url"
    />
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'

defineProps({
  movies: Array,
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
}
</style>