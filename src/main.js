import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'
import Anime from './components/anime.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/home`,
    component: Home
  },
  {
    path: `/anime/:id`,
    component: Anime
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
