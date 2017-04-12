import Vue from 'vue'
import router from './router.js'
import store from './store.js'

import App from './components/app.vue'

export default new Vue({
	render: createElement => createElement(App),
	router,
	store
})