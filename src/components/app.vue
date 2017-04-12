<template>
	<div v-if="loaded">
		<AppHeader id="header" />
		<AppSidebar id="sidebar" />
		<router-view id="content" />
	</div>
	<div v-else>
		<AppHeader id="header" />
		<AppSidebar id="sidebar" :loading="true" />
		<div id="content">Loading...</div>
	</div>
</template>
<script>
	import AppHeader from './header.vue'
	import AppSidebar from './sidebar.vue'

	export default {
		name: 'App',
		components: { AppHeader, AppSidebar },
		data () {
			return {
				loaded: false
			}
		},
		created () {
			if (this.$store.getters['wines/isLoaded'])
				this.loaded = true
			else
				this.$store.dispatch('wines/load').then(() => {
					this.loaded = true
				}).catch(console.error)
		}
	}
</script>