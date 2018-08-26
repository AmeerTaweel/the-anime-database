import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'
import Anime from './components/anime.vue'
import PageNotFound from './components/pageNotFound.vue'
import TopAnime from './components/topAnime.vue'
import Schedule from './components/schedule.vue'
import Search from './components/search.vue'

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
    path: `/top-anime/:page/:type`,
    component: TopAnime
  },
  {
    path: `/schedule/:day`,
    component: Schedule
  },
  {
    path: `/search/:query`,
    component: Search
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
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
