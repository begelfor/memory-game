import { createRouter, createWebHistory } from 'vue-router'
import MemoryGame from './views/MemoryGame.vue'
import NewGame from './views/NewGame.vue'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory('/shush/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/memory',
      name: 'memory',
      component: MemoryGame
    },
    {
      path: '/newgame',
      name: 'newgame',
      component: NewGame
    }
  ]
})

export default router 