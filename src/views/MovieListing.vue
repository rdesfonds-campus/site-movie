<template>
  <div>
    <AppNavbar />
    <SearchBar v-model="searchQuery" />
    <MovieGrid :movies="filteredMovies" />
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @prev="changePage(currentPage - 1)"
      @next="changePage(currentPage + 1)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AppNavbar from '@/components/AppNavbar.vue'
import SearchBar from '@/components/SearchBar.vue'
import MovieGrid from '@/components/MovieGrid.vue'
import Pagination from '@/components/Pagination.vue'

const movies = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)

const fetchMovies = async (page = 1) => {
  const res = await axios.get(`http://localhost:8000/api/movies?page=${page}`)
  movies.value = res.data['member']
  totalPages.value = Math.ceil(res.data['totalItems'] / 30)
}

const changePage = (page) => {
  currentPage.value = page
  fetchMovies(page)
}

onMounted(() => fetchMovies())

const filteredMovies = computed(() =>
  movies.value.filter(m =>
    m.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
</script>