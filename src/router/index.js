import { createRouter, createWebHistory } from 'vue-router'
import MovieListing from '../views/MovieListing.vue'
import MovieDetail from '../views/MovieDetail.vue'
import UserProfile from '../views/UserProfile.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MovieListing },
    { path: '/movies/:id', component: MovieDetail },
    { path: '/users/:id', component: UserProfile },
    { path: '/login', component: Login },
  ]
})

export default router