import { createRouter, createWebHistory } from 'vue-router'
import MovieListing from '@/views/MovieListing.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import Login from '@/views/Login.vue'
import UserProfile from '@/views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MovieListing },
    { path: '/movie/:id', component: MovieDetail },
    { path: '/login', component: Login },
    { path: '/profile', component: UserProfile },
  ],
})

export default router