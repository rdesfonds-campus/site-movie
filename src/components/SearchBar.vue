<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher un film..."
      @input="$emit('update:modelValue', searchQuery)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: String,
})

defineEmits(['update:modelValue'])

const searchQuery = ref('')
</script>

<style scoped>
.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
</style>