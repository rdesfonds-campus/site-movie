<template>
  <div class="grid">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :id="movie.id"
      :title="movie.title"
      :rating="movie.imdb ? movie.imdb.rating : 0"
      :posterUrl="movie.poster"
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