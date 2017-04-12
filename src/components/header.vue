<style module>
</style>
<template>
	<div><button :class="$style.new" @click="newWine">New Wine</button></div>
</template>
<script>
	export default {
		name: 'AppHeader',
		methods: {
			newWine () {
				this.$router.push('/wines/new')
			}
		}
	}
</script>