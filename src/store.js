import Vue from 'vue'
import Vuex from 'vuex'

import wines from './stores/wines.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: { wines }
})