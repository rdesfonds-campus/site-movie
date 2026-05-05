<template>
  <div class="card">
    <img :src="posterUrl" :alt="title" />
    <div class="card-info">
      <h3>{{ title }}</h3>
      <span>⭐ {{ rating }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  rating: Number,
  posterUrl: String,
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
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