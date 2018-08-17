import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'
import Anime from './components/anime.vue'
import PageNotFound from './components/pageNotFound.vue'
import TopAnime from './components/topAnime.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: `/home`,
    component: Home
  },
  {
    path: `/anime/:id`,
    component: Anime
  },
  {
    path: `/top-anime/:type`,
    component: TopAnime
  },
  {
    path: `/404/page-not-found`,
    component: PageNotFound
  },
  {
    path: `*`,
    component: PageNotFound
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
