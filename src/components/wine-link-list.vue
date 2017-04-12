<template>
	<ul v-if="wines && wines.length">
		<li v-for="wine in wines">
			<router-link :to="`/wines/${wine.id}`">{{ wine.name }}</router-link>
		</li>
	</ul>
	<div v-else>There are no wines. Click "New Wine" to create one.</div>
</template>
<script>
	export default {
		name: 'WineLinkList',
		props: ['wines']
	}
</script>