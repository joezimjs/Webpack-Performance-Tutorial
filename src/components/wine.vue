<template>
<form v-if="wine">
	<div class="form-left-col">
		<label v-if="wine.id">Id: {{ wine.id }}</label>

		<label>Name:</label>
		<input type="text" id="name" name="name" :value="wine.name" />

		<label>Grapes:</label>
		<input type="text" id="grapes" name="grapes" :value="wine.grapes" />

		<label>Country:</label>
		<input type="text" id="country" name="country" :value="wine.country" />

		<label>Region:</label>
		<input type="text" id="region" name="region" :value="wine.region" />

		<label>Year:</label>
		<input type="number" id="year" name="year" :value="wine.year" />

		<button class="save" @click.prevent="save">Save</button>
		<button v-if="wine.id" class="delete" @click.prevent="del">Delete</button>
		<button v-else class="cancel" @click.prevent="cancel">Cancel</button>
	</div>

	<div class="form-right-col">
		<img height="300" :src="wine.src" v-if="wine.src" />
		<label>Image File Name:</label>
		<input type="text" id="picture" name="picture" :value="wine.picture" />

		<label>Notes:</label>
		<textarea id="description" name="description">{{ wine.description }}</textarea>
	</div>
</form>
<div v-else>
	<h2>Oh Noes!!</h2>
	<p>The wine that you are trying to access does not exist. You may have come to this page by hitting back in the browser after deleting the wine. Or you may have copied and pasted a URL that no longer works. Oh well. Just keep looking around and hitting buttons.</p>
</div>
</template>
<script>
	import router from '../router.js'

	export default {
		name: 'Wine',
		props: ['wine'],
		methods: {
			del () {
				this.$store.dispatch('wines/del', this.wine.id).then(() => {
					router.push(`/`)
				})
			},
			save () {
				let wine = this.getFormValues()

				this.$store.dispatch('wines/save', wine).then(wine => {
					if (this.id !== wine.id)
						router.push(`/wines/${wine.id}`)
				})
			},
			cancel () {
				router.go(-1)
			},
			getFormValues () {
				let w = {id: this.wine.id}
				let el = this.$el
				let fields = ['name', 'grapes', 'country', 'region', 'year', 'picture', 'description']
				let numericFields = ['year']

				fields.forEach(field => {
					w[field] = el.querySelector(`#${field}`).value.trim()
				})

				numericFields.forEach(field => {
					w[field] = parseInt(w[field], 10)
				})

				return w
			}
		}
	}
</script>