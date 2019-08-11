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
			path: `*`,
			redirect: `/`
		}
	]
})
