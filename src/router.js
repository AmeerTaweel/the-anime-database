import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: `history`,
	routes: [
		{
			path: `/`,
			name: `home`,
			component: Home
		},
		{
			path: `/anime/:id`,
			name: `anime`,
			// route level code-splitting
			// this generates a separate chunk (anime.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "anime" */ './views/Anime.vue'),
			props: true
		},
		{
			path: `/top/:type/:page`,
			name: `top`,
			component: () => import(/* webpackChunkName: "top" */ './views/Top.vue'),
			props: true
		},
		{
			path: `/schedule/:day`,
			name: `schedule`,
			component: () => import(/* webpackChunkName: "schedule" */ './views/Schedule.vue'),
			props: true
		},
		{
			path: `/search/:pQuery`,
			name: `searchQ`,
			component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
			props: true
		},
		{
			path: `/search`,
			name: `search`,
			component: () => import(/* webpackChunkName: "search" */ './views/Search.vue')
		},
		{
			path: `*`,
			redirect: `/`
		}
	]
})
