import createApi from '../utils/rest-api.js'

let api = createApi('http://localhost:3000/')
let isLoaded = false
let loading = null

function setSource (wine) {
	try {
		wine.src = require(`../images/wines/${wine.picture}`)
	} catch (e) {
		console.error('Image source file does not exist. Setting without `require`.')
		wine.src = `/images/wines/${wine.picture}`
	}
}

export default {
	namespaced: true,
	state: [],
	getters: {
		getById (state) {
			return (id) => state.find(wine => wine.id === parseInt(id, 10))
		},
		isLoaded () {
			return isLoaded
		},
		loadingProgress () {
			return loading
		}
	},
	mutations: {
		update (state, wine) {
			setSource(wine)
			let oldWine = state.find(item => item.id === parseInt(wine.id, 10))

			if (oldWine)
				Object.assign(oldWine, wine)
			else
				state.push(wine)
		},
		del (state, id) {
			let index = state.findIndex(wine => wine.id === id)

			if (index >= 0)
				state.splice(index, 1)
			else
				console.error('Could not fine wine with id=', id)
		},
		setAll (state, wines) {
			wines.forEach(setSource)
			// Remove all current entries
			state.splice(0, state.length)
			// Add all the new entries
			state.push(...wines)
		}
	},
	actions: {
		save ({commit}, wine) {
			if (wine.id)
				return api.update(`wines/${wine.id}`, wine).then(serverWine => {
					commit('update', serverWine)
					return serverWine
				})
			else
				return api.create(`wines`, wine).then(serverWine => {
					commit('update', serverWine)
					return serverWine
				})
		},
		del ({commit}, id) {
			return api.del(`wines/${id}`).then(() => {
				commit('del', id)
			})
		},
		load ({commit}) {
			return api.read('wines/').then(wines => {
				commit('setAll', wines)
				isLoaded = true
				return wines
			})
		}
	}
}