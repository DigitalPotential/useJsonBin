import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeView2 from '../views/HomeView2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/with-pinia',
      name: 'home-with-pinia',
      component: HomeView2,
      meta: {
        title: 'Home (with Pinia)',
      },
    },
  ],
})

export default router
