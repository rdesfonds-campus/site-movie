<template>
  <div>
    <AppNavbar />
    <MovieCard
      title="Inception"
      :rating="8.8"
      posterUrl="https://picsum.photos/200/300"
    />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import MovieCard from '@/components/MovieCard.vue'
</script>