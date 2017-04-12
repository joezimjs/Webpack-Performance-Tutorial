import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store.js'
import Home from './components/home.vue'
import Wine from './components/wine.vue'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/wines/new',
			component: Wine,
			props: { wine: {} }
		},
		{
			path: '/wines/:id',
			component: Wine,
			props: route => {
				return { wine: store.getters['wines/getById'](route.params.id) }
			}
		}
	]
})