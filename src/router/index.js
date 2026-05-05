import { createRouter, createWebHistory } from 'vue-router'
import MovieListing from '@/views/MovieListing.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MovieListing },
    { path: '/movie/:id', component: MovieDetail },
    { path: '/login', component: Login },
  ],
})

export default router