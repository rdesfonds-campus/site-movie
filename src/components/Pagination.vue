<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="$emit('prev')">
      ← Précédent
    </button>

    <span>PAGE {{ currentPage }} / {{ totalPages }}</span>

    <button :disabled="currentPage === totalPages" @click="$emit('next')">
      Suivant →
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
})

defineEmits(['prev', 'next'])
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
}

button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>