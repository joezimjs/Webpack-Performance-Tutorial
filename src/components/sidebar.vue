<template>
	<div>
		<WineLinkList v-if="!loading" :wines="$store.state.wines" />
		<div v-else>Loading..</div>
	</div>
</template>
<script>
	import WineLinkList from './wine-link-list.vue'

	export default {
		name: 'AppSidebar',
		components: { WineLinkList },
		props: {
			loading: {
				default: false,
				type: Boolean
			}
		}
	}
</script>