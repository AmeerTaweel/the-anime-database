import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueLazyload from 'vue-lazyload'

Vue.use({
	install() {
		Vue.prototype.destroy = Vue.prototype.$destroy
	}
})

Vue.use(VueLazyload, {
	// error: 'dist/error.png',
	// loading: 'dist/loading.gif',
	lazyComponent: true,
	attempt: 1
})

new Vue({
		router,
		vuetify,
		render: h => h(App)
}).$mount('#app')
