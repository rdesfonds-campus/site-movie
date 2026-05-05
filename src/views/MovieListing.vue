<template>
  <div>
    <AppNavbar />
    <SearchBar v-model="searchQuery" />
    <MovieGrid :movies="filteredMovies" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import SearchBar from '@/components/SearchBar.vue'
import MovieGrid from '@/components/MovieGrid.vue'

const searchQuery = ref('')

const movies = [
  { id: 1, title: 'Inception', vote_average: 8.8, poster_url: 'https://picsum.photos/seed/1/200/300' },
  { id: 2, title: 'Interstellar', vote_average: 8.6, poster_url: 'https://picsum.photos/seed/2/200/300' },
  { id: 3, title: 'The Dark Knight', vote_average: 9.0, poster_url: 'https://picsum.photos/seed/3/200/300' },
  { id: 4, title: 'Pulp Fiction', vote_average: 8.9, poster_url: 'https://picsum.photos/seed/4/200/300' },
  { id: 5, title: 'Fight Club', vote_average: 8.8, poster_url: 'https://picsum.photos/seed/5/200/300' },
  { id: 6, title: 'Forrest Gump', vote_average: 8.8, poster_url: 'https://picsum.photos/seed/6/200/300' },
  { id: 7, title: 'The Matrix', vote_average: 8.7, poster_url: 'https://picsum.photos/seed/7/200/300' },
  { id: 8, title: 'Goodfellas', vote_average: 8.7, poster_url: 'https://picsum.photos/seed/8/200/300' },
]

const filteredMovies = computed(() =>
  movies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
</script>